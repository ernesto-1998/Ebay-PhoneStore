<template>
  <div class="cardA-container">
    <div class="cardA-img">
      <img :src="props.object.foto" alt="" />
    </div>
    <div class="cardA-body">
      <div class="cardA-title">
        <span>
          <strong>$ {{ props.object.precio }}</strong></span
        >
      </div>
      <div class="cardA-descripcion">
        <span
          >{{ props.object.telefono.marca }} {{ props.object.telefono.modelo }},
          pantalla de {{ props.object.telefono.pantalla }},
          {{ props.object.telefono.rom }} GB, {{ props.object.telefono.ram }} GB
          de RAM, sistema operativo {{ props.object.telefono.sistema }}</span
        >
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({ object: Object });
</script>

<style scoped>
.cardA-container {
  transition: 200ms ease-in-out;
  box-shadow: 0px 10px 13px -7px #000000;
  height: 100%;
  cursor: pointer;
}

.cardA-container:hover {
  transform: translateY(-10px);
  box-shadow: 5px 5px 15px 5px #000000;
}

.cardA-img {
  height: 250px;
}

.cardA-body {
  padding: 0.3rem 0.9rem;
  height: 10rem;
  overflow: hidden;
}

.cardA-title {
  padding: 0 7px;
  font-size: 1.35rem;
  color: #000;
  text-align: center;
}

.cardA-descripcion {
  display: flex;
  justify-content: space-between;
  font-size: 1rem;
  color: #000;
  overflow: hidden;
  padding: 0.3rem 0.2rem;
}
/* .card-price-estado span:nth-child(1) {
  font-size: 1.5rem;
}

.card-price-estado span:nth-child(2) {
  font-weight: bold;
} */
</style>