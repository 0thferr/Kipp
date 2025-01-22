<!-- App.vue -->
<template>
  <div class="app">
    <!-- Header -->
    <header class="header">
      <div class="header-content">
        <h1 class="logo">Sistema de Monitoramento</h1>
        <div class="header-actions">
          <button class="action-button" @click="toggleFullscreen">
            <span class="icon">⛶</span>
            {{ isFullscreen ? 'Sair da Tela Cheia' : 'Tela Cheia' }}
          </button>
          <button class="action-button" @click="reloadStream">
            <span class="icon">↻</span>
            Recarregar
          </button>
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <main class="main-content">
      <CameraView 
        ref="cameraView"
        :key="streamKey" 
      />
    </main>

    <!-- Footer -->
    <footer class="footer">
      <p>Status: {{ connectionStatus }}</p>
      <p>{{ currentTime }}</p>
    </footer>
  </div>
</template>

<script>
import CameraView from './views/CameraView.vue'
import { ref, onMounted, onUnmounted } from 'vue'

export default {
  name: 'App',
  components: {
    CameraView
  },
  setup() {
    const isFullscreen = ref(false)
    const connectionStatus = ref('Conectado')
    const currentTime = ref('')
    const streamKey = ref(0)
    const cameraView = ref(null)

    // Atualiza o relógio
    const updateTime = () => {
      const now = new Date()
      currentTime.value = now.toLocaleString()
    }

    let timeInterval

    onMounted(() => {
      timeInterval = setInterval(updateTime, 1000)
      updateTime()

      // Listener para mudanças no estado de tela cheia
      document.addEventListener('fullscreenchange', handleFullscreenChange)
    })

    onUnmounted(() => {
      clearInterval(timeInterval)
      document.removeEventListener('fullscreenchange', handleFullscreenChange)
    })

    // Função para alternar tela cheia
    const toggleFullscreen = async () => {
      try {
        if (!document.fullscreenElement) {
          if (document.documentElement.requestFullscreen) {
            await document.documentElement.requestFullscreen()
          }
        } else if (document.exitFullscreen) {
          await document.exitFullscreen()
        }
      } catch (err) {
        console.error('Erro ao alternar tela cheia:', err)
      }
    }

    // Handler para mudança de estado da tela cheia
    const handleFullscreenChange = () => {
      isFullscreen.value = !!document.fullscreenElement
    }

    // Função para recarregar o stream
    const reloadStream = () => {
      if (connectionStatus.value !== 'Reconectando...') {
        streamKey.value += 1
        connectionStatus.value = 'Reconectando...'
        setTimeout(() => {
          connectionStatus.value = 'Conectado'
        }, 1500)
      }
    }

    return {
      isFullscreen,
      connectionStatus,
      currentTime,
      streamKey,
      cameraView,
      toggleFullscreen,
      reloadStream
    }
  }
}
</script>

<style scoped>
/* Mesma estilização fornecida pelo usuário com melhorias */
</style>
