<template>
  <div class="info-container">
    <div class="info-title">
      <span align="center">{{ props.object.descripcion }}</span>
    </div>
    <div class="item-info">
      <span>Vendedor: </span>
      <span>{{ props.object.vendedor }}</span>
    </div>
    <div class="item-info">
      <span>Teléfono (Contacto) : </span>
      <span>{{ props.object.numeroTelefono }}</span>
    </div>
    <div class="item-info">
      <span>Precio: </span>
      <span>${{ props.object.telefono.precio }}</span>
    </div>
    <div class="descripcion-container">
      <div class="descripcion-content">
        <span>{{ props.object.descripcion }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({ object: Object });
</script>

<style scoped>
.info-container {
  background: var(--main-color);
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
}

.info-title {
  width: 100%;
  display: flex;
  justify-content: center;
  padding: 7px 0;
}

.info-title span {
  color: var(--text-color);
  font-size: 1.9rem;
  padding: 0 7px;
}

.item-info {
  width: 80%;
  display: flex;
  margin: 0 auto;
  color: var(--text-color);
  font-size: 1.5rem;
  /* margin-top: 25px; */
}

.item-info span:first-child {
  font-weight: bold;
  margin-right: 10px;
}

.descripcion-container {
  /* display: flex; */
  /* align-items: center; */
  /* justify-content: center; */
  padding: 10px;
}

.descripcion-content {
  padding: 10px;
  background: var(--second-color);
  color: var(--text-color);
}

@media (min-width: 768px) and (max-width: 1024px) {
  .item-info {
    margin: 15px 15px;
  }
}

@media (max-width: 767px) {
  .item-info {
    margin: 15px 15px;
  }

  .descripcion-content {
    height: 200px;
    overflow: auto;
  }
}
</style>