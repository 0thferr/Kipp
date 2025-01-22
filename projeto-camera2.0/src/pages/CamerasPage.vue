<template>
  <DefaultLayout>
    <CameraGrid />
  </DefaultLayout>
</template>

<script>
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import CameraGrid from '@/components/camera/CameraGrid.vue'

export default {
  name: 'CamerasPage',
  components: {
    DefaultLayout,
    CameraGrid
  }
}
</script>