<template>
  <div class="home">
    <Menu />
    <section class="main-container">
      <div class="loginsuccess-container">
        <h1 class="heading">
          Organizador de Contatos
        </h1>
        <h2 class="subtitle">
          Verifica email dos contatos, e agrupa por domínios
        </h2>
      </div>
    </section>
  </div>
</template>

<script>
import Menu from "@/components/Menu.vue";
export default {
  name: "Home",
  components: {
    Menu
  }
};
</script>

<style scoped>
.home {
  height: auto;
}

.main-container {
  margin-top: 15%;
  height: auto;
}

.loginsuccess-container {
  padding: 20px;
  margin: 15em auto;
  width: 80%;
  border: 1px solid #ccc;
  border-radius: 5px;
  background: #fff;
  word-break: break-all;
  color: darkgreen;
}
.heading {
  text-align: center;
  font-weight: 300;
  color: #444;
  margin: 0 auto 45px;
  font-size: 35px;
  line-height: 38px;
  text-transform: none;
  letter-spacing: 0;
}
.subtitle {
  font-size: 30px;
  text-align: center;
}
</style>
