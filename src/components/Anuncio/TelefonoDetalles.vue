<template>
  <div class="detalles-container">
    <div class="detalles-content">
      <div class="telefono-container">
        <div class="item-telefono">
          <span>Estado: </span>
          <span>{{ props.object.telefono.estado }}</span>
        </div>
        <div class="item-telefono">
          <span>Marca: </span>
          <span>{{ props.object.telefono.marca }}</span>
        </div>
        <div class="item-telefono">
          <span>Modelo: </span>
          <span>{{ props.object.telefono.modelo }}</span>
        </div>
        <div class="item-telefono">
          <span>Pantalla: </span>
          <span>{{ props.object.telefono.pantalla }}</span>
        </div>
        <div class="item-telefono">
          <span>Sistema: </span>
          <span>{{ props.object.telefono.sistema }}</span>
        </div>
        <div class="item-telefono">
          <span>ROM: </span>
          <span>{{ props.object.telefono.rom }} GB</span>
        </div>
        <div class="item-telefono">
          <span>RAM: </span>
          <span>{{ props.object.telefono.ram }} GB</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({ object: Object });
</script>

<style scoped>
.detalles-container {
  display: flex;
  justify-content: center;
}

.detalles-content {
  width: 80%;
  background: var(--main-color);
  display: grid;
  grid-template-columns: 1fr;
}

.telefono-container {
  margin: 0 auto;
}

.item-telefono {
  color: var(--text-color);
  font-size: 1.4rem;
  margin: 10px 0;
}

.item-telefono span:first-child {
  font-weight: bold;
  margin-right: 10px;
}

/* Segunda columna */

.descripcion-container {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px;
}

.descripcion-content {
  padding: 10px;
  background: var(--second-color);
  color: var(--text-color);
}

@media (max-width: 767px) {
  .detalles-content {
    width: 100%;
  }
}
</style>