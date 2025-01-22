// services/cameraService.js
import { ref } from 'vue'

export const useCameraService = () => {
  const loading = ref(false)
  const error = ref(null)

  const getStreams = async () => {
    loading.value = true
    try {
      const streamUrl = import.meta.env.VITE_HLS_STREAM_URL
      return [{
        id: '1',
        name: 'Câmera 1',
        streamUrl
      }]
    } catch (err) {
      error.value = err.message
      return []
    } finally {
      loading.value = false
    }
  }

  return {
    loading,
    error,
    getStreams
  }
}