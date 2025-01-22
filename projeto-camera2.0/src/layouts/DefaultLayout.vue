<template>
  <div class="layout">
    <header class="header">
      <h1>Sistema de Câmeras</h1>
    </header>
    <main class="main">
      <slot></slot>
    </main>
  </div>
</template>

<script>
export default {
  name: 'DefaultLayout'
}
</script>

<style scoped>
.layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}
.header {
  background: #1a1a1a;
  color: white;
  padding: 1rem;
}
.main {
  flex: 1;
  padding: 1rem;
}
</style>