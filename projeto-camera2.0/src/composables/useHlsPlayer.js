import { ref, onMounted, onUnmounted } from 'vue';
import Hls from 'hls.js';
import { streamConfig } from '../config/streams';

export function useHlsPlayer() {
  const videoRef = ref(null);
  const hls = ref(null);
  const isLoading = ref(true);
  const error = ref(null);

  const initPlayer = (streamUrl) => {
    if (!videoRef.value) return;

    if (Hls.isSupported()) {
      hls.value = new Hls(streamConfig.hlsConfig);
      hls.value.loadSource(streamUrl);
      hls.value.attachMedia(videoRef.value);

      hls.value.on(Hls.Events.MANIFEST_PARSED, () => {
        isLoading.value = false;
        videoRef.value.play().catch(e => {
          error.value = 'Autoplay failed: ' + e.message;
        });
      });

      hls.value.on(Hls.Events.ERROR, (event, data) => {
        if (data.fatal) {
          error.value = `Stream error: ${data.type}`;
          switch (data.type) {
            case Hls.ErrorTypes.NETWORK_ERROR:
              hls.value.startLoad();
              break;
            case Hls.ErrorTypes.MEDIA_ERROR:
              hls.value.recoverMediaError();
              break;
            default:
              destroyPlayer();
              break;
          }
        }
      });
    } else if (videoRef.value.canPlayType('application/vnd.apple.mpegurl')) {
      // For Safari
      videoRef.value.src = streamUrl;
      videoRef.value.addEventListener('loadedmetadata', () => {
        isLoading.value = false;
        videoRef.value.play().catch(e => {
          error.value = 'Autoplay failed: ' + e.message;
        });
      });
    }
  };

  const destroyPlayer = () => {
    if (hls.value) {
      hls.value.destroy();
      hls.value = null;
    }
    if (videoRef.value) {
      videoRef.value.removeAttribute('src');
      videoRef.value.load();
    }
  };

  onUnmounted(() => {
    destroyPlayer();
  });

  return {
    videoRef,
    isLoading,
    error,
    initPlayer,
    destroyPlayer
  };
}