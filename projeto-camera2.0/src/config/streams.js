// config/streams.js
import { streamConfig } from "../config/streams";
export const streamConfig = {
    defaultStream: 'https://stream-akamai.castr.com/5b9352dbda7b8c769937e459/live_2361c920455111ea85db6911fe397b9e/index.fmp4.m3u8',
    hlsConfig: {
      enableWorker: true,
      lowLatencyMode: true,
      backBufferLength: 90
    }
  };
  
  export const cameras = [
    {
      id: 1,
      name: 'Camera 1',
      streamUrl: streamConfig.defaultStream,
      location: 'Main Entrance'
    }
    // Adiconar mais câmeras caso precisar
  ];