<template>
<div>
    
    <div v-if="load" class="container anuncio-container">
        <div class="first-line">
            <Carousel :array="imagenes"/>
            <AnuncioInfo :object="anuncio"/>
        </div>
        <div class="second-line">
            <TelefonoDetalles :object="anuncio"/>
        </div>
    </div>
    <div v-if="!load" class="load-gif">
        <img src="../assets/beer.gif" alt="">
    </div>

</div>
</template>

<script setup>

import { ref, onMounted } from 'vue';
import router from '../router/index';
import { ref as reference, listAll, getDownloadURL } from "firebase/storage";
import { doc, getDoc } from "firebase/firestore";
import { db, st } from "../firebase";
import Carousel from '../components/Anuncio/CarouselView.vue'
import AnuncioInfo from '../components/Anuncio/AnuncioInfo.vue'
import TelefonoDetalles from '../components/Anuncio/TelefonoDetalles.vue'

const id_anuncio = router.currentRoute.value.params.id;
let imagenes = ref([]);
let load = ref(false);
let anuncio = ref({
    titulo: '',
    vendedor: '',
    numeroTelefono: '',
    descripcion: '',
    telefono: {
        estado: "",
        modelo: "",
        sistema: "",
        precio: ""
    }

})

onMounted(async () => {
    const listRef = reference(st, 'anuncios/' + id_anuncio);
    const res = await listAll(listRef);
    for(let itemRef of res.items){
        const url = await getDownloadURL(itemRef)
        imagenes.value.push(url)         
    }        
    
    const docRef = doc(db, "anuncios", id_anuncio);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        anuncio.value = {
            titulo: docSnap.data().titulo,
            vendedor: docSnap.data().vendedor,
            numeroTelefono: docSnap.data().numeroTelefono,
            descripcion: docSnap.data().descripcion,
            telefono: {
                estado: docSnap.data().telefono.estado,
                modelo: docSnap.data().telefono.modelo,
                sistema: docSnap.data().telefono.sistema,
                precio: docSnap.data().telefono.precio
            }
        }
    load.value = true;
    } else {
        console.log("No such document!");
    }



})

</script>

<style scoped>

.anuncio-container {
    margin-top: 10px;
}
    
.first-line {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
}

.second-line {
    margin: 20px 0;
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
}

</style>