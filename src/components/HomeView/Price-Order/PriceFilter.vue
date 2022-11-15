<template>
  <div class="price-container">
    <div class="price-content">
      <span>Desde:</span>
      <div class="input-container">
        <i class="bi bi-currency-dollar"></i>
        <i class="bi bi-x" v-if="desde !== ''" @click="limpiarDesde"></i>
        <input
          oninput="this.value = this.value.replace(/[^0-9]/g, '').replace(/(\..*)\./g, '$1');"
          type="number"
          v-model="desde"
        />
      </div>
    </div>
    <div class="price-content">
      <span>Hasta:</span>
      <div class="input-container">
        <i class="bi bi-currency-dollar"></i>
        <i class="bi bi-x" v-if="hasta !== ''" @click="limpiarHasta"></i>
        <input
          oninput="this.value = this.value.replace(/[^0-9]/g, '').replace(/(\..*)\./g, '$1');"
          type="number"
          v-model="hasta"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onUpdated } from "vue";
import { useInputStore } from "../../../stores/input";

let desde = ref("");
let hasta = ref("");
const input = useInputStore();

const limpiarDesde = () => (desde.value = "");
const limpiarHasta = () => (hasta.value = "");

onUpdated(() => {
  asignarD();
  asignarH();
});

const asignarD = () => {
  input.asignarDesde(desde.value);
};

const asignarH = () => {
  input.asignarHasta(hasta.value);
};
</script>

<style scoped>
.price-container {
  display: flex;
  justify-content: center;
  height: 100%;
  gap: 20px;
  padding: 15px 25px;
  background: var(--main-color);
}

.price-content {
  display: flex;
  /* flex-direction: column; */
  align-items: center;
  justify-content: center;
  gap: 1rem;
}

.input-container {
  position: relative;
}

.input-container i:nth-child(1) {
  position: absolute;
  font-size: 1.5rem;
  color: var(--text-color);
  top: 20%;
  left: 0;
}

.input-container i:nth-child(2) {
  position: absolute;
  font-size: 1.5rem;
  color: var(--text-color);
  top: 30%;
  right: 0;
}

.price-content input {
  margin-top: 10px;
  width: 100px;
  padding: 0 25px 0px 25px;
  border: none;
  outline: none;
  background: none;
  color: var(--text-color);
  font-size: 1.3rem;
  border-bottom: 2px solid var(--text-color);
  transition: all 0.4s ease;
}

.price-content input:focus {
  width: 120px;
  background: var(--second-color);
}

.price-content span {
  font-size: 1.5rem;
  color: var(--text-color);
}
</style>