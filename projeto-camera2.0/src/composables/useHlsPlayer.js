import { ref, watch } from 'vue'
import Hls from 'hls.js'
import { streamConfig } from '../config/streams'

const HLS_MIME_TYPE = 'application/vnd.apple.mpegurl'

export function useHlsPlayer(getStreamUrl) {
  const videoRef = ref(null)
  const isLoading = ref(true)
  const error = ref(null)

  watch([videoRef, getStreamUrl], ([video, streamUrl], _, onCleanup) => {
    if (!video) return

    error.value = null
    isLoading.value = Boolean(streamUrl)

    if (!streamUrl) {
      error.value = 'Configure a URL da transmissão da câmera.'
      return
    }

    let hls
    let usingNativeHls = false
    let disposed = false

    function markReady() {
      isLoading.value = false
    }

    function releasePlayer() {
      if (disposed) return

      disposed = true
      video.removeEventListener('canplay', markReady)
      video.removeEventListener('error', handleNativeError)
      hls?.destroy()

      if (usingNativeHls) {
        video.removeAttribute('src')
        video.load()
      }
    }

    function fail(message) {
      error.value = message
      isLoading.value = false
      releasePlayer()
    }

    function handleNativeError() {
      fail('Não foi possível carregar a transmissão.')
    }

    video.addEventListener('canplay', markReady)
    onCleanup(releasePlayer)

    if (Hls.isSupported()) {
      hls = new Hls(streamConfig.hlsConfig)
      let retriedNetwork = false
      let recoveredMedia = false

      hls.on(Hls.Events.ERROR, (_, data) => {
        if (disposed || !data.fatal) return

        if (data.type === Hls.ErrorTypes.NETWORK_ERROR && !retriedNetwork) {
          retriedNetwork = true
          hls.startLoad()
          return
        }

        if (data.type === Hls.ErrorTypes.MEDIA_ERROR && !recoveredMedia) {
          recoveredMedia = true
          hls.recoverMediaError()
          return
        }

        fail('Não foi possível carregar a transmissão.')
      })

      hls.loadSource(streamUrl)
      if (!disposed) hls.attachMedia(video)
      return
    }

    if (video.canPlayType(HLS_MIME_TYPE)) {
      usingNativeHls = true
      video.addEventListener('error', handleNativeError)
      video.src = streamUrl
      return
    }

    fail('Este navegador não oferece suporte a transmissões HLS.')
  }, { flush: 'post' })

  return { videoRef, isLoading, error }
}
