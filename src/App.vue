<template>
  <div id="app">
    <Menu />
    <router-view />
    <Footer />
  </div>
</template>

<script>
import Menu from '@/components/Menu'
import Footer from '@/components/Footer'
export default {
  name: 'App',
  components: {
    Menu,
    Footer
  }
}
</script>

<style>
html,
body {
  height: auto;
  margin: 0;
}
#app {
  font-family: Arial, Helvetica, sans-serif;
  font-size: 15px;
  background: #80e27e;
  margin: 0 0.2em;
}
</style>
