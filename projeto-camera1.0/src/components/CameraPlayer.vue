<template>
  <div class="camera-player">
    <video ref="videoPlayer" controls muted autoplay></video>
  </div>
</template>

<script>
import Hls from 'hls.js'

export default {
  name: 'CameraPlayer',
  props: {
    streamUrl: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      hls: null
    }
  },
  mounted() {
    this.initPlayer()
  },
  beforeUnmount() {
    if (this.hls) {
      this.hls.destroy()
    }
  },
  methods: {
    initPlayer() {
      const video = this.$refs.videoPlayer
      
      if (Hls.isSupported()) {
        this.hls = new Hls()
        this.hls.loadSource(this.streamUrl)
        this.hls.attachMedia(video)
      }
      else if (video.canPlayType('application/vnd.apple.mpegurl')) {
        video.src = this.streamUrl
      }
    }
  }
}
</script>

<style scoped>
.camera-player {
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
}

video {
  width: 100%;
  background: #000;
}
</style>