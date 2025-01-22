<template>
  <button 
    class="base-button"
    :class="variant"
    v-bind="$attrs"
  >
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: 'BaseButton',
  props: {
    variant: {
      type: String,
      default: 'primary'
    }
  }
}
</script>

<style scoped>
.base-button {
  padding: 0.5rem 1rem;
  border-radius: 4px;
  border: none;
  cursor: pointer;
}
.primary {
  background: #4CAF50;
  color: white;
}
</style>