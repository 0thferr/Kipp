<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useHlsPlayer } from '@/composables/useHlsPlayer'

const props = defineProps({
  streamUrl: {
    type: String,
    required: true
  }
})

const videoRef = ref(null)
const { initPlayer, destroyPlayer } = useHlsPlayer()

onMounted(() => {
  if (videoRef.value) {
    initPlayer(videoRef.value, props.streamUrl)
  }
})

onUnmounted(() => {
  destroyPlayer()
})
</script>

<template>
  <div class="camera-player">
    <video ref="videoRef" controls autoplay></video>
  </div>
</template>

<style>
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
</style>