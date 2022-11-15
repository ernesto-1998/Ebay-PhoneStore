<template>
  <div class="order-container">
    <div class="order-title">
      <span>Ordenar por: </span>
    </div>
    <div class="order-content visibility">
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
    <div class="order-content-movil visibility2">
      <select name="filtros" id="filter" v-model="model">
        <!-- <option value="" disabled>Filtros</option> -->
        <optgroup label="Precio">
          <option value="ascPrecio">Ascendente</option>
          <option value="desPrecio">Descendente</option>
        </optgroup>
        <optgroup label="Fecha">
          <option value="ascFecha">Ascendente</option>
          <option value="desFecha">Descendente</option>
        </optgroup>
      </select>
    </div>
  </div>
</template>

<script setup>
import { ref, onUpdated, watch } from "vue";
import { useInputStore } from "../../../stores/input";

let precio = ref(true);
let fecha = ref(true);
let input = useInputStore();
let model = ref(null);

watch(model, () => {
  console.log(model.value);
  switch (model.value) {
    case "ascPrecio":
      input.asignarPrecio(true);
      break;
    case "desPrecio":
      input.asignarPrecio(false);
      break;
    case "ascFecha":
      input.asignarFecha(true);
      break;
    case "desFecha":
      input.asignarFecha(false);
      break;
  }
});

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
  display: flex;
  background: var(--main-color);
  justify-content: center;
  gap: 0.7rem;
  flex-wrap: wrap;
  height: 100%;
  padding: 8px 10px;
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
  gap: 1rem;
}

i {
  margin-right: 5px;
  font-size: 1rem;
}

.visibility2 {
  display: none;
}

@media (max-width: 767px) {
  .visibility {
    display: none;
  }

  .visibility2 {
    display: flex;
  }

  .order-content-movil {
    color: #000;
  }
}
</style>