<template>
  <div class="order-container">
    <div class="order-title">
      <span>Ordenar anuncios por: </span>
    </div>
    <div class="order-content">
      <a class="btn btnGeneral a-link" @click="ordenarPrecio"><ion-icon v-if="precio === false" name="arrow-down-circle-outline"></ion-icon><ion-icon v-if="precio === true" name="arrow-up-circle-outline"></ion-icon>Precio</a>
      <a class="btn btnGeneral2">Fecha</a>
    </div>
  </div>
</template>

<script setup>

import { ref, onUpdated } from 'vue';
import { useInputStore } from '../../../stores/input';

let precio = ref(false);
let input = useInputStore();

const ordenarPrecio = () => {
    precio.value = !precio.value;
    input.asignarPrecio(precio.value); 
}

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

ion-icon {
    margin-right: 5px;
    font-size: 1.5rem;
}


</style>