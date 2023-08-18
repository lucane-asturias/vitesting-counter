<script setup>
  import { ref, onBeforeUnmount, onMounted } from 'vue'

  const counter = ref(0)

  const handleKeyPress = (event) => {
    if (event.key === '+') counter.value++
    if (event.key === '-') counter.value--
  }

  onMounted(() => {
    document.addEventListener('keyup', handleKeyPress)
  })

  onBeforeUnmount(() => {
    document.removeEventListener('keyup', handleKeyPress)
  })

</script>

<template>
  <div id="app">
    
    <button @click="counter++">+</button>
    {{ counter }}
    <button @click="counter--">-</button>

    <button data-test="reset" v-if="counter < 0" @click="counter = 0">
      Reset
    </button>
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
