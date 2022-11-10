<template>
  <div class="card-container">
    <div class="card-img">
      <img :src="props.object.foto" alt="" />
    </div>
    <div class="card-body">
      <div class="card-title">
        <span>
          <strong>$ {{ props.object.precio }}</strong></span
        >
      </div>
      <div class="card-descripcion">
        <span>${{ props.object.descripcion }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({ object: Object });
</script>

<style scoped>
.card-container {
  transition: 200ms ease-in-out;
  box-shadow: 0px 10px 13px -7px #000000;
  height: 100%;
  cursor: pointer;
}

.card-container:hover {
  transform: translateY(-10px);
  box-shadow: 5px 5px 15px 5px #000000;
}

.card-img {
  height: 250px;
}

.card-body {
  padding: 0.3rem 0.9rem;
  height: 10rem;
  overflow: hidden;
}

.card-title {
  padding: 0 7px;
  font-size: 1.35rem;
  color: #000;
  text-align: center;
}

.card-descripcion {
  display: flex;
  justify-content: space-between;
  font-size: 1rem;
  color: #000;
}
/* .card-price-estado span:nth-child(1) {
  font-size: 1.5rem;
}

.card-price-estado span:nth-child(2) {
  font-weight: bold;
} */
</style>