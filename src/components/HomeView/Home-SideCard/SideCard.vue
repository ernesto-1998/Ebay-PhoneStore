<template>
  <div class="sidecard-container">
    <div class="card-container">
      <div class="sidecard-switch">
        <span>Nuevo</span> <input @click="asignarEstado" type="checkbox" value="true">
      </div>
      <hr />
      <div class="card">
        <div class="card-title">
          <span>Marca</span>
        </div>
        <hr />
        <div class="card-body">
          <div class="card-item">
            <input type="checkbox" v-model="marcas" value="samsung" name="samsung" id="" />
            <span>Samsung</span>
          </div>
          <div class="card-item">
            <input type="checkbox" v-model="marcas" value="iphone" name="iphone" id="" />
            <span>Iphone</span>
          </div>
          <div class="card-item">
            <input type="checkbox" v-model="marcas" value="huawei" name="huawei" id="" />
            <span>Huawei</span>
          </div>
          <div class="card-item">
            <input type="checkbox" v-model="marcas" value="motorola" name="motorola" id="" />
            <span>Motorola</span>
          </div>
        </div>
      </div>
      <div class="card">
        <div class="card-title">
          <span>Sistema Operativo</span>
        </div>
        <hr />
        <div class="card-body">
          <div class="card-item">
            <input type="checkbox" v-model="sistemas" value="android" name="android" id="" /> <span>Android</span>
          </div>
          <div class="card-item">
            <input type="checkbox" v-model="sistemas" value="ios" name="ios" id="" /> <span>IOS</span>
          </div>
          <div class="card-item">
            <input type="checkbox" v-model="sistemas" value="harmony" name="harmony" id="" />
            <span>Harmony OS</span>
          </div>
          <div class="card-item">
            <input type="checkbox" v-model="sistemas" value="windows" name="windows" id="" />
            <span>Windows Phone</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>

import { ref, onUpdated } from 'vue';
import { useInputStore } from '../../../stores/input';

let marcas = ref([]);
let sistemas = ref([]);
let estado = false;
const input = useInputStore();

onUpdated(()=>{
  input.asignarMarcas(marcas.value);
  input.asignarSistemas(sistemas.value);
})

const asignarEstado = () => {
  estado = !estado;
  input.asignarEstado(estado);
}

</script>

<style scoped>
.sidecard-container {
  height: 100%;
}

.card-container {
  background: var(--main-color);
  padding-top: 20px;
}

.sidecard-switch {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 10px;
}

.sidecard-switch span {
  color: var(--text-color);
  font-size: 1.2rem;
}

.sidecard-switch input {
  margin-left: 10px;
  
}

.card {
  padding: 8px 40px 15px;
}

.card-title {
  display: flex;
  justify-content: center;
  margin-bottom: 10px;
  color: var(--text-color);
  font-size: 1.2rem;
}

.card-body {
  margin-top: 10px;
}

.card:last-child .card-body {
      margin-bottom: 10px;
}

.card-item {
  display: flex;
  align-items: center;
  justify-content: start;
  color: var(--text-color);
}

.card-item span {
  margin-left: 10px;
}
</style>