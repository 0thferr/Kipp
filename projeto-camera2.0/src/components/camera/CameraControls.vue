<template>
  <div class="camera-controls">
    <RouterLink :to="{ name: 'single-camera', params: { id: cameraId } }">
      Abrir câmera
    </RouterLink>
  </div>
</template>

<script setup>
import { RouterLink } from 'vue-router'

defineProps({
  cameraId: { type: [Number, String], required: true }
})
</script>

<style scoped>
.camera-controls {
  display: flex;
  gap: 1rem;
  padding: 0.5rem;
}
</style>
