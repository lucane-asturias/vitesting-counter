<script setup>
  import { ref, onBeforeUnmount, onMounted, watch } from 'vue'
  import CounterInput from './components/CounterInput.vue'

  const counter = ref(0)
  const counter2 = ref(0)

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

  const props = defineProps({
    initialValue: {
      type: Number,
      default: 0
    }
  })

  watch(() => props.initialValue, (newValue) => {
    counter.value = newValue
    counter2.value = 0
  }, { immediate: true })

</script>

<template>
  <div id="app">
    <CounterInput v-model="counter">
      Current value of counter2 is {{ counter2 }}
      <template #warning>
        STILL BETA
      </template>
    </CounterInput>
    <hr />

    <button @click="counter++">+</button>
    {{ counter }} / {{ counter2 }}
    <button @click="counter--">-</button>

    <button data-test="reset" v-if="counter < 0" @click="counter = 0">
      Reset
    </button>

    <hr />

    <button @click="counter2++">inc2</button>
    <button @click="counter2--">dec2</button>
      
  </div>
</template>