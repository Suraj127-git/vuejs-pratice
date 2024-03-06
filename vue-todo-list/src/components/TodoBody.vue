<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useInfiniteScroll, useDark, useToggle  } from '@vueuse/core';


const isDark = useDark({
  selector: 'body',
  attribute: 'color-scheme',
  valueDark: 'dark',
  valueLight: 'light',
})

const toggleDark = useToggle(isDark)
console.log(toggleDark)
const localStorageKey = 'todos';

const initialTodos = JSON.parse(localStorage.getItem(localStorageKey)) || [
  { text: 'Learn Laravel', done: true },
  { text: 'Learn the basics of Vue js', done: false }
];

const staticTodos = ref(initialTodos);
const el = ref<HTMLElement | null>(null);

const newTodo = ref({
  text: '',
  done: false
});

const addTodo = () => {
  if (newTodo.value.text.trim()) {
    staticTodos.value.push({ ...newTodo.value });
    newTodo.value = {
      text: '',
      done: false
    };
    saveTodos();
  } else {
    alert('Please enter a value');
  }
};

const clearAll = () => {
  staticTodos.value.splice(0, staticTodos.value.length);
  saveTodos();
};

const toggleTodo = (index) => {
  staticTodos.value[index].done = !staticTodos.value[index].done;
  saveTodos();
};

const saveTodos = () => {
  localStorage.setItem(localStorageKey, JSON.stringify(staticTodos.value));
};

function onLoadMore() {
  if (!/^\d+$/.test(newTodo.value.text.trim())) {
    const length = staticTodos.value.length + 1;
    staticTodos.value.push(...Array.from({ length: 5 }, (_, i) => length + i));
  }
}


onMounted(() => {
  staticTodos.value = JSON.parse(localStorage.getItem(localStorageKey)) || [];
});

useInfiniteScroll(el, onLoadMore, { distance: 5 });

const startDrag = (event, todo, index) => {
  // console.log(todo)
  // console.log(index)
  event.dataTransfer.dropEffect = 'move';
  event.dataTransfer.effectAllowed = 'move';
  event.dataTransfer.setData('itemIndex', index.toString());
};

const onDrop = (event, targetTodo, targetIndex) => {
  if (targetIndex) {
    const draggedIndex = parseInt(event.dataTransfer.getData('itemIndex'), 10);
    const draggedTodo = staticTodos.value[draggedIndex];
    
    // console.log(draggedTodo)
    if (draggedTodo) {
      // Swap todos at draggedIndex and targetIndex
      [staticTodos.value[draggedIndex], staticTodos.value[targetIndex]] = [
        staticTodos.value[targetIndex],
        staticTodos.value[draggedIndex]
      ];

      saveTodos();
    }
  }
};

const onDragEnd = (event) => {
  event.preventDefault();
};
</script>

<template>
  <section class="todo-list" :class="{ dark: isDark, light: !isDark }">
    <h3>To-do List</h3>

    <input type="checkbox" id="toggle_checkbox" @click="toggleDark()">
    <label for="toggle_checkbox">
      <div id="star">
        <div class="star" id="star-1">★</div>
        <div class="star" id="star-2">★</div>
      </div>
      <div id="moon"></div>
    </label>

    <input type="text" placeholder="Add Items" @keyup.enter="addTodo" v-model="newTodo.text" />
    <button class="add" @click="addTodo()">Add</button>

    <button class="clear" @click="clearAll()" v-if="staticTodos.length">Clear All</button>


    <div @dragend="onDragEnd" @dragenter.prevent @dragover.prevent ref="el" class="all-todos" style="overflow-y: auto; max-height: 400px;">
      <div
        v-for="(todo, index) in staticTodos"
        class="single-todo"
        :class="{ done: todo.done }"
        draggable="true"
        @dragstart="startDrag($event, todo, index)"
        @drop="onDrop($event, todo, index)"
        @click="toggleTodo(index)"
      >
        <p>{{ todo.text }}</p>
      </div>
    </div>
  </section>
</template>


<style scoped>
main {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex-wrap: wrap;
  padding-top: 60px;
}

main .todo-list input {
  box-sizing: border-box;
  height: 28px;
  border-radius: 0.25rem;
  width: 80%;
  border: 1px solid lightgrey;
  margin-top: 32px;
}

main button {
  background-color: transparent;
  cursor: pointer;
  box-sizing: border-box;
  height: 28px;
  border-radius: 0.25rem;
  color: #fff;
}

main button:hover {
  opacity: 0.8;
}

main button.add {
  background-color: #007bff;
  border: 1px solid #007bff;
  margin-left: 2px;
}

main button.clear {
  background-color: #dc3545;
  border: 1px solid #dc3545;
  display: block;
  margin: auto;
}

main button:focus {
  outline: 0;
}

main > section.todo-list h3 {
  text-align: left;
  margin-top: 24px;
  margin-left: 20px;
  width: 100%;
}

main > section.todo-list {
  flex-wrap: wrap;
  border: 1px solid lightgrey;
  background-color: rgb(248, 248, 248);
  padding: 20px;
  max-width: 600px;
  min-width: 500px;
  text-align: center;
  border-radius: 0.30rem;
}

main .all-todos .single-todo {
  display: flex;
  align-items: center;
  justify-content: center;
}

main .all-todos .single-todo p {
  margin: 12px 0;
  cursor: pointer;
}

main .all-todos .single-todo.done p {
  text-decoration: line-through;
}

main .all-todos .single-todo button.remove {
  width: 12px;
  height: 12px;
  border: none;
  background: transparent url('img/remove.png') no-repeat center;
  background-size: contain;
  cursor: pointer;
  margin-left: 8px;
}

main > section.todo-list button.clear {
  margin-top: 24px;
}


.single-todo {
  cursor: move;
  margin: 8px 0;
  border: 1px solid #ccc;
  padding: 8px;
  display: flex;
  align-items: center;
}

.drag-handle {
  cursor: grab;
  margin-right: 8px;
}

.single-todo.done {
  text-decoration: line-through;
}

#toggle_checkbox
{
    display: none;
}

label
{
    display: block;
    position: absolute;
    top: 18%;
    right: 0;
    left: 350px;
    width: 116px;
    height: 50px;
    margin: 0 auto;
    background-color: #fff;
    border-radius: 56px;
    transform: translateY(-70%);
    cursor: pointer;
    transition: 0.8s ease background-color;
    overflow: hidden;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.1); 
}

#star
{
    position: absolute;
    top: 10px;
    left: 13px;
    width: 30px;
    height: 30px;
    background-color: #fafd0f;
    transform: scale(1);
    border-radius: 50%;
    transition: 0.3s ease top, 0.3s ease left, 0.3s ease transform, 0.3s ease background-color;
    z-index: 1;
}

#star-1
{
    position: relative;
}

#star-2
{
    position: absolute;
    transform: rotateZ(36deg);
}

.star
{
    top: 0;
    left: -7px;
    font-size: 54px;
    line-height: 28px;
    color: #fafd0f;
    transition: 0.3s ease color;
}

#moon
{
    position: absolute;
    bottom: -52px;
    right: 8px;
    width: 40px;
    height: 40px;
    background-color: #fff;
    border-radius: 50%;
    transition: 0.3s ease bottom;
}

#moon:before
{
    content: "";
    position: absolute;
    top: -12px;
    left: -17px;
    width: 40px;
    height: 40px;
    background-color:#03a9f4;
    border-radius: 50%;
    transition: 0.3s ease background-color;
}

#toggle_checkbox:checked + label
{
    background-color: #35374B;
}

#toggle_checkbox:checked + label #star
{
    top: 3px;
    left: 64px;
    transform: scale(0.3);
    background-color: yellow;
}

#toggle_checkbox:checked + label .star
{
    color: yellow;
}

#toggle_checkbox:checked + label #moon
{
    bottom: 8px;
}

#toggle_checkbox:checked + label #moon:before
{
    background-color: #35374B;
}

.todo-list.dark {
  background-color: #35374B;
  color: white;
}

.todo-list.light {
  background-color: white;
  color: 35374B;
}
</style>