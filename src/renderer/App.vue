<template>
  <div id="app">
    <layout2 class="layout" />
  </div>
</template>

<script>
import layout2 from '@/components/layout2.vue'
export default {
  name: 'admin',
  components: { layout2 },
}
</script>

<style>
/* CSS */
html,
body {
  height: 100%;
}
#app {
  height: 100%;
}

.layout {
  height: 100%;
}
</style>
