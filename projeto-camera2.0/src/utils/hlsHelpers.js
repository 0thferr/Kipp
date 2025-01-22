// utils/hlsHelpers.js
import Hls from 'hls.js'

export const initHls = (video, streamUrl) => {
  if (Hls.isSupported()) {
    const hls = new Hls()
    hls.loadSource(streamUrl)
    hls.attachMedia(video)
    return hls
  } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
    video.src = streamUrl
  }
  return null
}

export const destroyHls = (hls) => {
  if (hls) {
    hls.destroy()
  }
}