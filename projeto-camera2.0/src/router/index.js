// router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import CamerasPage from '@/pages/CamerasPage.vue'
import SingleCameraPage from '@/pages/SingleCameraPage.vue'

const routes = [
  {
    path: '/',
    name: 'cameras',
    component: CamerasPage
  },
  {
    path: '/camera/:id',
    name: 'single-camera',
    component: SingleCameraPage
  }
]

export default createRouter({
  history: createWebHistory(),
  routes
})