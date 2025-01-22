// CameraControls.vue
<template>
  <div class="camera-controls">
    <BaseButton @click="$emit('fullscreen')" class="control-btn">
      <span class="icon">⤢</span>
    </BaseButton>
    <BaseButton @click="$emit('snapshot')" class="control-btn">
      <span class="icon">📸</span>
    </BaseButton>
  </div>
</template>

<script>
export default {
  name: 'CameraControls',
  emits: ['fullscreen', 'snapshot']
}
</script>

<style scoped>
.camera-controls {
  display: flex;
  gap: 1rem;
  padding: 0.5rem;
}
.control-btn {
  background: rgba(0,0,0,0.5);
  border: none;
  padding: 0.5rem;
  cursor: pointer;
}
.icon {
  color: white;
  font-size: 1.2rem;
}
</style>