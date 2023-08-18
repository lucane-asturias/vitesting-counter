<script setup>
defineProps(['modelValue'])
defineEmits(['update:modelValue'])
</script>

<template>
  <div>
    <p>Enter new value:</p>
    <input 
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)" />
    <hr />
    <slot />
    <hr />    
    <slot name="warning" />

  </div>
</template>