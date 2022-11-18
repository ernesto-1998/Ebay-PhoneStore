<template>
  <div class="info-container">
    <div class="info-descripcion">
      <span> {{ object.descripcion }} </span>
    </div>
    <div class="info-precio">
      <span> $ {{ object.precio }}</span>
    </div>
    <div class="info-button_comprar visibilidad">
      <button
        class="btnA btnGeneralA"
        @click="comprarPhone(props.anuncio1, props.anuncio2)"
      >
        Comprar
      </button>
    </div>
    <div class="info-vendedor-telefono">
      <span>Vendedor: {{ object.nombre }}</span>
      <span>Teléfono: {{ object.telefonoContacto }}</span>
    </div>
  </div>
</template>

<script setup>
import router from "../../router/index.js";
import { alertas } from "../../utils/sweetAlerts2.js";
const props = defineProps({
  object: Object,
  anuncio1: String,
  anuncio2: String,
});

const comprarPhone = (anuncio1, anuncio2) => {
  alertas.alertaPositiva2(
    "Felicidades!!!",
    `Haz comprado el ${anuncio1} ${anuncio2}`
  );
  setTimeout(() => {
    router.push({ name: "home" });
  }, 2500);
};
</script>

<style scoped>
.info-container {
  padding: 2rem;
}

.info-descripcion {
  font-size: 1.1rem;
}

.info-precio {
  font-size: 2.5rem;
  margin: 0.8rem 0;
}

.info-vendedor-telefono {
  display: grid;
  grid-template-columns: 1fr 1fr;
  justify-content: start;
  /* display: flex;
  justify-content: space-between; */
  flex-wrap: wrap;
  margin: 1.5rem 0;
  padding: 0.7rem 1.5rem;
  border: 0.2rem solid var(--main-color);
}

@media (min-width: 768px) and (max-width: 1024px) {
}

@media (max-width: 767px) {
  .visibilidad {
    display: none;
  }
}
</style>