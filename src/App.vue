<template>
  <NavbarView />

  <div class="container-app">
    <RouterView />
  </div>
</template>

<script setup>
import { RouterLink, RouterView } from "vue-router";
import NavbarView from "./components/NavbarView.vue";
import HomeView from "./pages/HomeView.vue";
</script>

<style>
/* .container-app {
  height: 100%;
} */

@media screen and (min-width: 768px) and (max-width: 1024px) {
  .container {
    width: var(--width-md);
    font-size: 1.5rem;
    /* background: green; */
  }
}

@media screen and (max-width: 767px) {
  .container {
    width: var(--width-sm);
    font-size: 1.5rem;
    /* background: yellow; */
  }
}
</style>
