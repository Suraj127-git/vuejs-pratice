<script setup lang="ts">
import TodoBody from './components/TodoBody.vue'
</script>

<template>
  <main>
    <TodoBody />
  </main>
</template>

<style scoped>
main {
    display: flex;
    justify-content: center;
    align-items:flex-start;
    flex-wrap: wrap;
    padding-top: 60px;
}
</style>
