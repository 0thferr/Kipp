# Documentação do Componente de Stream de Câmera

## Visão Geral
O componente CameraPlayer é uma implementação de um player de vídeo para streams HLS (HTTP Live Streaming) usando Vue.js e a biblioteca hls.js. Este componente foi projetado para ser reutilizável e fácil de integrar em qualquer aplicação Vue.js que necessite reproduzir streams de câmera.

## Dependências
- Vue.js 3.x
- hls.js: ^1.4.0 ou superior

## Instalação
1. Primeiro, instale a dependência hls.js:
```bash
npm install hls.js
```

2. Copie o arquivo `CameraPlayer.vue` para seu projeto (sugestão: coloque em `src/components/CameraPlayer.vue`)

## Uso
Para usar o componente em suas páginas:

1. Importe o componente:
```javascript
import CameraPlayer from '@/components/CameraPlayer.vue'
```

2. Registre o componente:
```javascript
export default {
  components: {
    CameraPlayer
  }
}
```

3. Use o componente no template:
```html
<CameraPlayer 
  :stream-url="sua_url_de_stream"
/>
```

## Recursos
- Reprodução automática do stream
- Suporte a HLS nativo para Safari
- Tratamento de erros e reconexão automática
- Interface responsiva
- Controles de vídeo nativos

## Tratamento de Erros
O componente inclui tratamento para os seguintes tipos de erro:
- Erros de rede: tenta reconectar automaticamente
- Erros de mídia: tenta recuperar automaticamente
- Erros fatais: destroi o player e loga o erro

## Exemplos

### Uso básico:
```vue
<template>
  <CameraPlayer 
    stream-url="https://seu-stream-url.m3u8"
  />
</template>
```

### Uso em grid de câmeras:
```vue
<template>
  <div class="camera-grid">
    <CameraPlayer 
      v-for="camera in cameras"
      :key="camera.id"
      :stream-url="camera.url"
    />
  </div>
</template>
```

## Considerações de Performance
- O componente utiliza `beforeUnmount` para limpar recursos quando removido
- Implementa lazy loading para o stream
- Utiliza worker threads quando disponível

## Troubleshooting
1. Stream não inicia:
   - Verifique se a URL do stream está acessível
   - Verifique se o formato do stream é HLS (.m3u8)
   - Verifique os logs do console para erros específicos

2. Problemas de performance:
   - Considere reduzir a qualidade do stream
   - Verifique a conexão de rede
   - Monitore o uso de memória do navegador
