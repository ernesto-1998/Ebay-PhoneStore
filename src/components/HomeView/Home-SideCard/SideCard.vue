<template>
  <div class="sidecard-container">
    <div class="cardA-container">
      <div class="sidecard-switch">
        <span>Nuevo</span>
        <q-toggle v-model="estado" color="warning" />
      </div>
      <hr />
      <div class="cardA">
        <div class="cardA-title">
          <span>Marca</span>
        </div>
        <hr />
        <div class="cardA-body">
          <div class="cardA-item">
            <input
              type="checkbox"
              v-model="marcas"
              value="samsung"
              name="samsung"
              id=""
            />
            <span>Samsung</span>
            <div class="cardA-item_number">
              <span>{{ props.cantidades.samsung }}</span>
            </div>
          </div>
          <div class="cardA-item">
            <input
              type="checkbox"
              v-model="marcas"
              value="huawei"
              name="huawei"
              id=""
            />
            <span>Huawei</span>
            <div class="cardA-item_number">
              <span>{{ props.cantidades.huawei }}</span>
            </div>
          </div>
          <div class="cardA-item">
            <input
              type="checkbox"
              v-model="marcas"
              value="nokia"
              name="nokia"
              id=""
            />
            <span>Nokia</span>
            <div class="cardA-item_number">
              <span>{{ props.cantidades.nokia }}</span>
            </div>
          </div>
          <div class="cardA-item">
            <input
              type="checkbox"
              v-model="marcas"
              value="iphone"
              name="iphone"
              id=""
            />
            <span>Iphone</span>
            <div class="cardA-item_number">
              <span>{{ props.cantidades.iphone }}</span>
            </div>
          </div>
          <div class="cardA-item">
            <input
              type="checkbox"
              v-model="marcas"
              value="xiaomi"
              name="xiaomi"
              id=""
            />
            <span>Xiaomi</span>
            <div class="cardA-item_number">
              <span>{{ props.cantidades.xiaomi }}</span>
            </div>
          </div>
        </div>
      </div>
      <div class="cardA">
        <div class="cardA-title">
          <span>Sistema Operativo</span>
        </div>
        <hr />
        <div class="cardA-body">
          <div class="cardA-item">
            <input
              type="checkbox"
              v-model="sistemas"
              value="android"
              name="android"
              id=""
            />
            <span>Android</span>
            <div class="cardA-item_number">
              <span>{{ props.cantidades.android }}</span>
            </div>
          </div>
          <div class="cardA-item">
            <input
              type="checkbox"
              v-model="sistemas"
              value="windows"
              name="windows"
              id=""
            />
            <span>Windows</span>
            <div class="cardA-item_number">
              <span>{{ props.cantidades.windows }}</span>
            </div>
          </div>
          <div class="cardA-item">
            <input
              type="checkbox"
              v-model="sistemas"
              value="ios"
              name="ios"
              id=""
            />
            <span>Ios</span>
            <div class="cardA-item_number">
              <span>{{ props.cantidades.ios }}</span>
            </div>
          </div>
        </div>
      </div>
      <div class="cardA">
        <div class="cardA-title">
          <span>Pantalla</span>
        </div>
        <hr />
        <div class="cardA-body">
          <div class="cardA-item">
            <input
              type="checkbox"
              v-model="pantallas"
              value="6.0"
              name="6.0"
              id=""
            />
            <span>6.0</span>
          </div>
          <div class="cardA-item">
            <input
              type="checkbox"
              v-model="pantallas"
              value="5.5"
              name="5.5"
              id=""
            />
            <span>5.5</span>
          </div>
          <div class="cardA-item">
            <input
              type="checkbox"
              v-model="pantallas"
              value="5.0"
              name="5.0"
              id=""
            />
            <span>5</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onUpdated, watch } from "vue";
import { useInputStore } from "../../../stores/input";

let marcas = ref([]);
let sistemas = ref([]);
let pantallas = ref([]);
let estado = ref(false);
const input = useInputStore();

const props = defineProps({
  cantidades: Object,
});

onUpdated(() => {
  input.asignarMarcas(marcas.value);
  input.asignarSistemas(sistemas.value);
  input.asignarPantallas(pantallas.value);
});

watch(estado, () => {
  input.asignarEstado(estado.value);
});

// const asignarEstado = () => {
//   estado.value = !estado.value;
//   input.asignarEstado(estado);
// };
</script>

<style scoped>
.sidecard-container {
  height: 100%;
}

.cardA-container {
  background: var(--main-color);
  padding-top: 20px;
}

.sidecard-switch {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 10px;
  gap: 1rem;
}

.sidecard-switch span {
  color: var(--text-color);
  font-size: 1.2rem;
}

.sidecard-switch input {
  margin-left: 10px;
}

.cardA {
  padding: 8px 40px 15px;
  background-color: var(--main-color);
}

.cardA-title {
  display: flex;
  justify-content: center;
  margin-bottom: 10px;
  color: var(--text-color);
  font-size: 1.2rem;
}

.cardA-body {
  margin-top: 10px;
}

.cardA:last-child .cardA-body {
  margin-bottom: 10px;
}

.cardA-item {
  display: flex;
  align-items: center;
  justify-content: start;
  margin: 0.5rem 0;
  color: var(--text-color);
}

.cardA-item span {
  margin-left: 10px;
}

.cardA-item_number {
  position: relative;
}

.cardA-item_number span {
  position: absolute;
  top: -17px;
  right: -15px;
  font-size: 1rem;
}
</style>