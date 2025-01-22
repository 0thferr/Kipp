# Camera Stream Player

Um player de streaming HLS simples e eficiente construído com Vue.js. Perfeito para visualização de câmeras IP e streams ao vivo.

## 🚀 Características

- Player HLS para streaming de vídeo
- Suporte a múltiplos navegadores
- Design responsivo
- Fácil integração
- Mínimo de dependências

## 📋 Pré-requisitos

- Node.js (versão 14 ou superior)
- NPM ou Yarn

## 🛠️ Instalação

1. Clone o repositório:
```bash
git clone 
cd projeto-camera
```

2. Instale as dependências:
```bash
npm install
```

3. Execute o projeto:
```bash
npm run dev
```

O aplicativo estará disponível em `http://localhost:5173`

## 📁 Estrutura do Projeto

```
📦 projeto-camera
 ┣ 📂 src
 ┃ ┣ 📂 components
 ┃ ┃ ┗ 📜 CameraPlayer.vue    # Componente do player
 ┃ ┣ 📂 views
 ┃ ┃ ┗ 📜 CameraView.vue      # Página de visualização
 ┃ ┣ 📜 App.vue               # Componente raiz
 ┃ ┗ 📜 main.js              # Arquivo principal
 ┣ 📜 index.html             # HTML template
 ┣ 📜 package.json           # Dependências
 ┗ 📜 vite.config.js         # Configuração do Vite
```

## 💻 Como Usar

### Componente CameraPlayer

O componente pode ser importado e usado em qualquer parte do seu aplicativo:

```vue
<template>
  <CameraPlayer 
    :stream-url="'https://sua-url-de-stream.m3u8'"
  />
</template>

<script>
import CameraPlayer from '@/components/CameraPlayer.vue'

export default {
  components: {
    CameraPlayer
  }
}
</script>
```

### Propriedades

| Prop | Tipo | Obrigatório | Descrição |
|------|------|-------------|-----------|
| streamUrl | String | Sim | URL do stream HLS |

## 🔧 Configuração

### Vite Config

O projeto usa Vite para desenvolvimento e build. Configuração básica em `vite.config.js`:

```javascript
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()]
})
```

## 📦 Scripts Disponíveis

- `npm run dev`: Inicia o servidor de desenvolvimento
- `npm run build`: Cria a build de produção
- `npm run preview`: Preview da build de produção

## ⚠️ Considerações Importantes

- Certifique-se de que a URL do stream está acessível
- O stream deve estar no formato HLS (.m3u8)
- Para streams seguros (HTTPS), a página também deve ser servida via HTTPS

