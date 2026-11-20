export const streamConfig = {
  hlsConfig: {
    enableWorker: true,
    lowLatencyMode: true,
    backBufferLength: 90
  }
}

export const cameras = [
  {
    id: 1,
    name: 'Câmera 1',
    streamUrl: import.meta.env.VITE_HLS_STREAM_URL?.trim() ?? '',
    location: 'Main Entrance'
  }
]
