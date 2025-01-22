<template>
  <div class="camera-view">
    <h1>Câmera ao Vivo</h1>
    <CameraPlayer :stream-url="streamUrl" />
  </div>
</template>

<script>
import CameraPlayer from '../components/CameraPlayer.vue'

export default {
  name: 'CameraView',
  components: {
    CameraPlayer
  },
  data() {
    return {
      streamUrl: 'https://stream-akamai.castr.com/5b9352dbda7b8c769937e459/live_2361c920455111ea85db6911fe397b9e/index.fmp4.m3u8'
    }
  }
}
</script>

<style scoped>
.camera-view {
  padding: 20px;
}
</style>