<template>
<div>

  <div v-if="load" class="container main-container">
    <div class="left-grid-container">
      <SideCard />
    </div>
    <div class="right-grid-container">
      <div class="price-order-container">
        <Price />
        <Order />
      </div>
      <div class="anuncios-container">
          <div class="anuncios-content">
            <div
            class="anuncios-cards"
            v-for="(anuncio, index) in anunciosFiltrados"
            :key="index"
            >
            <router-link
                :to="{ name: 'anuncio', params: { id: anuncio.id_anuncio } }"
                ><Card :object="anuncio"
            /></router-link>
            </div>              
          </div>
          <div class="anuncios-paginator">
              <ul class="paginator-container">
                <li class="paginator-content" @click="cambiarPagina(index)" v-for="(number, index) in anunciosFiltradosPaginados" :key="index">
                  <span>{{ numero = index + 1 }}</span>
                </li>
              </ul>
              <div class="perPage-container">

              </div>
          </div>
      </div>
    </div>
  </div>
  <div v-if="!load" class="load-gif">
    <img src="../assets/beer.gif" alt="">
  </div>
</div>
</template>

<script setup>
import { ref, onMounted, watch, onBeforeMount } from "vue";
import { useInputStore } from "../stores/input";
import Card from "../components/Cards/CardView.vue";
import SideCard from "../components/HomeView/Home-SideCard/SideCard.vue";
import Price from "../components/HomeView/Price-Order/PriceFilter.vue";
import Order from "../components/HomeView/Price-Order/OrderFilter.vue";
import { db, st } from "../firebase";
import { collection, addDoc, getDocs } from "firebase/firestore";
import { getDownloadURL, ref as reference } from "firebase/storage";

let anuncios = [];
let anunciosFiltrados = ref([]);
let anunciosFiltradosPaginados = ref([]);
let pagination = ref(8);
let load = ref(false)
const input = useInputStore();

watch(input, () => {
  filtrarAnuncios();
});

onBeforeMount(() => {
  callData();
});

const callData = async () => {
  const querySnapshot = await getDocs(collection(db, "anuncios"));
  for(let doc of querySnapshot.docs){
    const url = await getDownloadURL(reference(st, "anuncios/" + doc.id + "/1"))
      anuncios.push({
        titulo: doc.data().titulo,
        id_anuncio: doc.id,
        descripcion: doc.data().descripcion,
        vendedor: doc.data().vendedor,
        numeroTelefono: doc.data().numeroTelefono,
        url: url,
        telefono: {
          precio: doc.data().telefono.precio,
          modelo: doc.data().telefono.modelo,
          estado: doc.data().telefono.estado,
          sistema: doc.data().telefono.sistema,
        },
      });
  };
  filtrarAnuncios();
  load.value = true;
}

const cambiarPagina = (index) => {
  anunciosFiltrados.value = anunciosFiltradosPaginados.value[index];
}

const filtrarAnuncios = () => {
  anunciosFiltrados.value = anuncios;

  // Filtro input navbar

  if (input.text !== "") {
    anunciosFiltrados.value = anunciosFiltrados.value.filter((t) => {
      let regex = new RegExp(input.text, "i");
      return regex.test(t.telefono.modelo);
    });
  }

  // Filtro price

  if (input.desde !== "") {
    parseInt(input.desde);
    parseInt(input.hasta);
    anunciosFiltrados.value = anunciosFiltrados.value.filter((x) => {
      return x.telefono.precio > input.desde;
    });
  }

  if (input.hasta !== "") {
    parseInt(input.desde);
    parseInt(input.hasta);
    anunciosFiltrados.value = anunciosFiltrados.value.filter((x) => {
      return x.telefono.precio < input.hasta;
    });
  }

  // Filtro Nuevo, Marcas y Sistemas

  if (input.estado === true) {
    anunciosFiltrados.value = anunciosFiltrados.value.filter((t) => {
      let regex = new RegExp("nuevo", "i");
      return regex.test(t.telefono.estado);
    });
  }
  if (input.estado === false) {
    anunciosFiltrados.value = anunciosFiltrados.value.filter((t) => {
      let regex = new RegExp("usado", "i");
      return regex.test(t.telefono.estado);
    });
  }

  if (input.marcas.length > 0) {
    let anunciosTemporales = [];
    anunciosTemporales.push(...anunciosFiltrados.value);
    anunciosFiltrados.value = anunciosTemporales.filter((x) => {
      let regex = new RegExp(input.marcas[0], "i");
      return regex.test(x.telefono.modelo);
    });
    if (input.marcas[1] !== undefined) {
      let anuncios2 = anunciosTemporales.filter((x) => {
        let regex = new RegExp(input.marcas[1], "i");
        return regex.test(x.telefono.modelo);
      });
      anunciosFiltrados.value.push(...anuncios2);
    }
    if (input.marcas[2] !== undefined) {
      let anuncios2 = anunciosTemporales.filter((x) => {
        let regex = new RegExp(input.marcas[2], "i");
        return regex.test(x.telefono.modelo);
      });
      anunciosFiltrados.value.push(...anuncios2);
    }
    if (input.marcas[3] !== undefined) {
      let anuncios2 = anunciosTemporales.filter((x) => {
        let regex = new RegExp(input.marcas[3], "i");
        return regex.test(x.telefono.modelo);
      });
      anunciosFiltrados.value.push(...anuncios2);
    }
  }

  if (input.sistemas.length > 0) {
    let anunciosTemporales = [];
    anunciosTemporales.push(...anunciosFiltrados.value);
    anunciosFiltrados.value = anunciosTemporales.filter((x) => {
      let regex = new RegExp(input.sistemas[0], "i");
      return regex.test(x.telefono.sistema);
    });
    if (input.sistemas[1] !== undefined) {
      let anuncios2 = anunciosTemporales.filter((x) => {
        let regex = new RegExp(input.sistemas[1], "i");
        return regex.test(x.telefono.sistema);
      });
      anunciosFiltrados.value.push(...anuncios2);
    }
    if (input.sistemas[2] !== undefined) {
      let anuncios2 = anunciosTemporales.filter((x) => {
        let regex = new RegExp(input.sistemas[2], "i");
        return regex.test(x.telefono.sistema);
      });
      anunciosFiltrados.value.push(...anuncios2);
    }
    if (input.sistemas[3] !== undefined) {
      let anuncios2 = anunciosTemporales.filter((x) => {
        let regex = new RegExp(input.sistemas[3], "i");
        return regex.test(x.telefono.sistema);
      });
      anunciosFiltrados.value.push(...anuncios2);
    }
  }

  //Filtrar precio

      if(input.precio === false){
        anunciosFiltrados.value = anunciosFiltrados.value.sort((p1, p2) => {
          if (p1.telefono.precio > p2.telefono.precio) {
            // this.filtrarFecha = null;            
            return 1;
          }
          if (p1.telefono.precio < p2.telefono.precio) {            
            return -1;
          }
          return 0;
        }); 
      } else if(input.precio === true){
        anunciosFiltrados.value = anunciosFiltrados.value.sort((p1, p2) => {
          if (p2.telefono.precio > p1.telefono.precio) {
            return 1;
          }
          if (p2.telefono.precio < p1.telefono.precio) {
            return -1;
          }
          return 0;
        });        
      }  

    let total = Math.ceil(anunciosFiltrados.value.length / pagination.value);

    let counter = 0;
    let pagination2 = pagination.value;
    let pagStart = 0;
    anunciosFiltradosPaginados.value.length = 0
    while(counter < total){
      anunciosFiltradosPaginados.value.push(anunciosFiltrados.value.slice(pagStart, pagination2));
      pagStart += pagination2;
      pagination2 += pagination2;
      counter++;
    }
    anunciosFiltrados.value = anunciosFiltradosPaginados.value[0];
};
</script>

<style scoped>
.main-container {
  display: grid;
  grid-template-columns: 240px 1fr;
  gap: 35px;
}

.left-grid-container {
  height: 100%;
}

.price-order-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
}

.anuncios-content {
  margin-top: 20px;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 15px;
}

/* Paginator */

.anuncios-paginator {
  display: flex;
}

.paginator-container {
  display: flex;
}

.paginator-content {
  margin: 0 2px;
  padding: 3px 5px;
  background-color: var(--main-color);
}

.paginator-content span {
  color: var(--text-color);
}

.paginator-content:hover {
  cursor: pointer;
}

@media (min-width: 768px) and (max-width: 1024px) {
  .left-grid-container {
    /* width: var(--width-sidenav-md);  */
    /* font-size: 1.5rem; */
    display: none;
  }

  .main-container {
    grid-template-columns: 1fr;
  }

  .anuncios-content {
    grid-template-columns: repeat(3, 1fr);
  }
}

.anuncios-paginator {
    margin: 15px 0;
}

@media (max-width: 767px) {
  .left-grid-container {
    /* width: var(--width-sidenav-sm);  */
    /* font-size: 1.5rem; */
    display: none;
  }

  .main-container {
    grid-template-columns: 1fr;
  }

  .price-order-container {
    grid-template-columns: 1fr;
  }

  .anuncios-content {
    grid-template-columns: 1fr;
  }

}
</style>