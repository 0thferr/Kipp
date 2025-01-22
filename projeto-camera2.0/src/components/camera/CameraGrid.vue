// CameraGrid.vue
<template>
  <div class="camera-grid">
    <BaseCard v-for="camera in cameras" :key="camera.id">
      <CameraPlayer :stream-url="camera.streamUrl" />
      <CameraControls
        @fullscreen="handleFullscreen(camera)"
        @snapshot="handleSnapshot(camera)"
      />
    </BaseCard>
  </div>
</template>

<script>
import { useStore } from 'vuex'
import CameraPlayer from './CameraPlayer.vue'
import CameraControls from './CameraControls.vue'

export default {
  name: 'CameraGrid',
  components: {
    CameraPlayer,
    CameraControls
  },
  setup() {
    const store = useStore()
    const cameras = computed(() => store.state.cameras.list)

    const handleFullscreen = (camera) => {
      router.push(`/camera/${camera.id}`)
    }

    const handleSnapshot = (camera) => {
      // Implementar função de snapshot
    }

    return {
      cameras,
      handleFullscreen,
      handleSnapshot
    }
  }
}
</script>

<style scoped>
.camera-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1rem;
  padding: 1rem;
}
</style>