<template>
  <div id="app">
    <router-view />
    <p class="footer"> Projeto desenvolvido por Marcos Nolasco, como parte do processo seletivo da Conecta Nuvem. </p>
  </div>
</template>

<script>
  export default {
    name: 'App'
  }
</script>

<style>
  html, body {
    height: 100%;
    margin: 0;
  }
  #app {
    font-family: Arial, Helvetica, sans-serif;
    font-size: 15px;
    background: #80e27e;
    margin: 0 0.2em;
    height: 100%;
  }
  .footer {
    text-align: center; 
    background:#087f23;
    color: #fff;
    padding: 0.5em;
  }
</style>