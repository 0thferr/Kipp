<template>
  <DefaultLayout>
    <RouterLink :to="{ name: 'cameras' }">Voltar às câmeras</RouterLink>
    <div v-if="camera" class="single-camera">
      <h2>{{ camera.name }}</h2>
      <CameraPlayer :stream-url="camera.streamUrl" />
    </div>
    <p v-else role="status">Câmera não encontrada.</p>
  </DefaultLayout>
</template>

<script setup>
import { computed } from 'vue'
import { useStore } from 'vuex'
import { RouterLink, useRoute } from 'vue-router'
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import CameraPlayer from '@/components/camera/CameraPlayer.vue'

const store = useStore()
const route = useRoute()
const camera = computed(() => store.getters['cameras/getCameraById'](route.params.id))
</script>
