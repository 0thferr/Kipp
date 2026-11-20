<template>
  <div class="camera-grid">
    <BaseCard v-for="camera in cameras" :key="camera.id">
      <h2>{{ camera.name }}</h2>
      <CameraPlayer :stream-url="camera.streamUrl" />
      <CameraControls :camera-id="camera.id" />
    </BaseCard>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useStore } from 'vuex'
import BaseCard from '@/components/ui/BaseCard.vue'
import CameraPlayer from './CameraPlayer.vue'
import CameraControls from './CameraControls.vue'

const store = useStore()
const cameras = computed(() => store.state.cameras.list)
</script>

<style scoped>
.camera-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 300px), 1fr));
  gap: 1rem;
  padding: 1rem;
}

.camera-grid h2 {
  color: #1a1a1a;
}
</style>
