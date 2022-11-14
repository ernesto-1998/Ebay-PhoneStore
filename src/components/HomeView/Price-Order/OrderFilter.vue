<template>
  <div class="order-container">
    <div class="order-title">
      <span>Ordenar por: </span>
    </div>
    <div class="order-content">
      <a class="btnA btnGeneralA a-link" @click="ordenarPrecio()"
        ><i class="bi bi-arrow-down" v-if="precio === false"></i>
        <i class="bi bi-arrow-up" v-if="precio === true"></i>
        Precio</a
      >
      <a class="btnA btnGeneralA2" @click="ordenarFecha()">
        <i class="bi bi-arrow-down" v-if="fecha === false"></i>
        <i class="bi bi-arrow-up" v-if="fecha === true"></i>
        Fecha</a
      >
    </div>
  </div>
</template>

<script setup>
import { ref, onUpdated } from "vue";
import { useInputStore } from "../../../stores/input";

let precio = ref(true);
let fecha = ref(true);
let input = useInputStore();

const ordenarPrecio = () => {
  precio.value = !precio.value;
  input.asignarPrecio(precio.value);
};

const ordenarFecha = () => {
  fecha.value = !fecha.value;
  input.asignarFecha(fecha.value);
};
</script>

<style scoped>
.a-link {
  display: flex;
  align-items: center;
}

.order-container {
  background: var(--main-color);
  height: 100%;
  padding: 8px 0;
}

.order-title {
  display: flex;
  justify-content: center;
  color: var(--text-color);
  font-size: 1.5rem;
  margin: 10px 0;
}

.order-content {
  display: flex;
  align-items: center;
  justify-content: space-evenly;
}

i {
  margin-right: 5px;
  font-size: 1rem;
}
</style>