<script setup>
import { useHlsPlayer } from '@/composables/useHlsPlayer'

const props = defineProps({
  streamUrl: {
    type: String,
    required: true
  }
})

const { videoRef, isLoading, error } = useHlsPlayer(() => props.streamUrl)
</script>

<template>
  <div class="camera-player">
    <video ref="videoRef" controls autoplay muted playsinline></video>
    <p v-if="error" role="alert">{{ error }}</p>
    <p v-else-if="isLoading" role="status">Carregando transmissão…</p>
  </div>
</template>

<style scoped>
.camera-player {
  width: 100%;
  height: 100%;
  background: #f5f5f5;
}

.camera-player video {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.camera-player p {
  margin: 0;
  padding: 0.5rem;
  color: #1a1a1a;
}
</style>
