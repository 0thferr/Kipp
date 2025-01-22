<template>
  <DefaultLayout>
    <div class="single-camera">
      <CameraPlayer :stream-url="camera.streamUrl" />
      <CameraControls
        @fullscreen="toggleFullscreen"
        @snapshot="takeSnapshot"
      />
    </div>
  </DefaultLayout>
</template>

<script>
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import CameraPlayer from '@/components/camera/CameraPlayer.vue'
import CameraControls from '@/components/camera/CameraControls.vue'

export default {
  name: 'SingleCameraPage',
  components: {
    DefaultLayout,
    CameraPlayer,
    CameraControls
  },
  setup() {
    const store = useStore()
    const route = useRoute()
    const camera = computed(() => 
      store.state.cameras.list.find(c => c.id === route.params.id)
    )

    return {
      camera
    }
  }
}
</script>