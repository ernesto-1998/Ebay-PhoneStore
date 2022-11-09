<template>
    <div class="carousel-container">
        <div class="img-container">
            <div class="img-box">
                <div class="img-content">
                    <img :src="props.array[contador]" alt="" />
                </div>
            </div>
        </div> 
        <ul class="list-container">

            <li class="list-item" v-for="(img, index) in props.array" :key="index">
                <div class="list-item-content">
                    <div class="list-item-number" @click="cambiarImagen(index)">
                        <span>{{ index+1 }}</span>
                    </div>
                </div>
            </li>

        </ul>           
    </div>
</template>

<script setup>

import { ref } from 'vue'

let contador = ref(0)
const props = defineProps({ array: Array })

const cambiarImagen = (index) => {
    contador.value = index
}

</script>

<style scoped>

.carousel-container {
    display: flex;
    flex-direction: column;
}

.img-container {
  /* background: var(--main-color); */
  display: flex;
  justify-content: center;
}

.img-content {
  /* width: 350px; */
  height: 350px;
  margin: 0 auto;
  overflow: hidden;
}

.img-content img {
  object-fit: cover;
}

/* ul list buttons */

.list-container {
    display: flex;
    justify-content: center;
    padding: 10px 0 0 0;
}

.list-item {
    display: flex;
    align-items: center;
    background: var(--second-color);
    color: var(--text-color);
    margin: 10px 0;
}

.list-item-content {
    display: flex;
}

.list-item-number {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 75px;
    border-right: 1px solid var(--text-color);
    cursor: pointer;
    transition: 250ms ease-in-out;
}

.list-item-number:hover {
    background: var(--text-color);
    color: var(--main-color);
    transform: translateY(-3px);
}

.list-item-number span {
    font-size: 1.5rem;
}



</style>