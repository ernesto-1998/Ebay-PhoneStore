<template>
  <div>
    <div v-if="load" class="container-space anuncio-container">
      <div class="first-line">
        <CarouselView :array="imagenes" />
        <AnuncioInfo :object="anuncio" />
      </div>
      <div class="anuncio-title">
        <span>Descripción</span>
      </div>
      <div class="second-line">
        <TelefonoDetalles :object="anuncio" />
        <div class="anuncio-textarea">
          {{ anuncio.descripcion }}
        </div>
      </div>
      <div class="buttons-container">
        <div class="buttons-content">
          <router-link :to="{ name: 'home' }" class="button-item item1">
            <span>Inicio</span>
          </router-link>
          <a class="button-item item2">
            <span>Comprar</span>
          </a>
        </div>
      </div>
    </div>
    <div v-if="!load" class="load-gif">
      <img src="../assets/beer.gif" alt="" />
    </div>
  </div>
</template>

<script setup>
import { ref, onBeforeMount } from "vue";
import router from "../router/index";
import { ref as reference, listAll, getDownloadURL } from "firebase/storage";
import { doc, getDoc } from "firebase/firestore";
import { db, st } from "../firebase";
import CarouselView from "../components/Anuncio/CarouselView.vue";
import AnuncioInfo from "../components/Anuncio/AnuncioInfo.vue";
import TelefonoDetalles from "../components/Anuncio/TelefonoDetalles.vue";

const id_anuncio = router.currentRoute.value.params.id;
let imagenes = ref([]);
let load = ref(false);
let anuncio = ref({
  titulo: "",
  nombre: "",
  telefonoContacto: null,
  descripcion: "",
  precio: null,
  foto: null,
  fecha: "",
  telefono: {
    estado: "",
    marca: "",
    modelo: "",
    pantalla: null,
    sistema: "",
    rom: null,
    ram: null,
  },
});

onBeforeMount(async () => {
  const listRef = reference(st, "anuncios/" + id_anuncio);
  const res = await listAll(listRef);
  for (let itemRef of res.items) {
    imagenes.value.push(await getDownloadURL(itemRef));
  }

  const docRef = doc(db, "anuncios", id_anuncio);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    anuncio.value = {
      id_anuncio: docSnap.id,
      titulo: docSnap.data().titulo,
      nombre: docSnap.data().nombre,
      telefonoContacto: docSnap.data().telefonoContacto,
      descripcion: docSnap.data().descripcion,
      precio: docSnap.data().precio,
      fecha:
        docSnap.data().fecha === undefined ? "" : docSnap.data().fecha.toDate(),
      telefono: {
        estado: docSnap.data().telefono.estado,
        marca: docSnap.data().telefono.marca,
        modelo: docSnap.data().telefono.modelo,
        pantalla: docSnap.data().telefono.pantalla,
        sistema: docSnap.data().telefono.sistema,
        rom: docSnap.data().telefono.rom,
        ram: docSnap.data().telefono.ram,
      },
    };
    load.value = true;
  } else {
    console.log("No such document!");
  }
});
</script>

<style scoped>
.anuncio-container {
  margin-top: 10px;
  color: #000;
}

.first-line {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
}

.anuncio-title {
  font-size: 2.5rem;
  text-align: center;
}

.second-line {
  margin: 20px 0;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  margin-bottom: 90px;
}

.anuncio-textarea {
  padding: 1rem;
  border: 0.1rem solid #000;
}

@media (min-width: 768px) and (max-width: 1024px) {
  .first-line {
    display: grid;
    grid-template-columns: 1fr;
    gap: 20px;
  }
}

@media (max-width: 767px) {
  .first-line {
    display: grid;
    grid-template-columns: 1fr;
    gap: 20px;
  }

  .second-line {
    grid-template-columns: 1fr;
    gap: 1rem;
  }

  .buttons-container {
    width: 85%;
    margin: auto;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
  }

  .buttons-content {
    width: 100%;
    display: grid;
    grid-template-columns: 1fr 1fr;
  }

  .button-item {
    font-size: 2rem;
    display: grid;
    align-items: center;
    justify-content: center;
    padding: 1rem 0.7rem;
  }

  .item1 {
    background-color: var(--second-color);
  }

  .item2 {
    background-color: var(--main-color);
  }

  .buttons-content:nth-child(1) {
    background-color: var(--main-color);
  }
}
</style>