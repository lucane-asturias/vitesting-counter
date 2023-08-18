<script setup>
  import { ref } from 'vue'
  const counter = ref(0)
</script>

<template>
  <div id="app">
    {{ counter }}
    <button @click="counter += 1">+</button>
    <button @click="counter -= 1">-</button>
  </div>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
