<template>
  <div class="big-container">
    <div v-if="load" class="container-space main-container">
      <div class="left-grid-container">
        <SideCard />
      </div>
      <div class="right-grid-container">
        <div class="price-order-container">
          <Price class="visibility" />
          <Order />
          <div class="funel-icon visibility2" @click="isActive = !isActive">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-funnel-fill"
              viewBox="0 0 16 16"
            >
              <path
                d="M1.5 1.5A.5.5 0 0 1 2 1h12a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-.128.334L10 8.692V13.5a.5.5 0 0 1-.342.474l-3 1A.5.5 0 0 1 6 14.5V8.692L1.628 3.834A.5.5 0 0 1 1.5 3.5v-2z"
              />
            </svg>
          </div>
        </div>
        <div class="anuncios-container">
          <div class="anuncios-content">
            <div
              class="anuncios-cards"
              v-for="(anuncio, index) in anunciosFiltradosPaginados"
              :key="index"
            >
              <router-link
                :to="{ name: 'anuncio', params: { id: anuncio.id_anuncio } }"
                ><CardView :object="anuncio"
              /></router-link>
            </div>
          </div>
          <div class="anuncios-paginator">
            <div class="q-pa-lg flex flex-center">
              <q-pagination
                v-model="current"
                :max="numPaginas"
                @click="cambioPagina"
                direction-links
                boundary-links
                icon-first="skip_previous"
                icon-last="skip_next"
                icon-prev="fast_rewind"
                icon-next="fast_forward"
              />
            </div>
            <!-- <ul class="paginator-container">
              <li
                class="paginator-content"
                @click="cambiarPagina(index)"
                v-for="(number, index) in anunciosFiltradosPaginados"
                :key="index"
              >
                <span>{{ (numero = index + 1) }}</span>
              </li>
            </ul> -->
            <div class="perPage-container">
              <q-select
                v-model="anunciosPorPagina"
                :options="anunciosPorPaginaOptions"
                label="Paginación"
              />
            </div>
          </div>
        </div>
      </div>
      <div class="side-menu-container" :class="{ toggle_back: isActive }">
        <SideNav @change-state="change" />
      </div>
    </div>
    <div v-if="!load" class="load-gif">
      <img src="../assets/beer.gif" alt="" />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch, onBeforeMount, onUnmounted } from "vue";
import { useInputStore } from "../stores/input";
import CardView from "../components/Cards/CardView.vue";
import SideNav from "../components/SideNav.vue";
import SideCard from "../components/HomeView/Home-SideCard/SideCard.vue";
import Price from "../components/HomeView/Price-Order/PriceFilter.vue";
import Order from "../components/HomeView/Price-Order/OrderFilter.vue";
import { db, st } from "../firebase";
import { collection, addDoc, getDocs } from "firebase/firestore";
import { getDownloadURL, ref as reference } from "firebase/storage";

let anuncios = ref([]);
let isActive = ref(false);
let anunciosFiltrados = ref([]);
let anunciosFiltradosPaginados = ref([]);
let anunciosPorPagina = ref(4);
let anunciosPorPaginaOptions = ref([4, 8, 16]);
let current = ref(1);
let numPaginas = ref(0);
let load = ref(false);
const input = useInputStore();

watch(input, () => {
  filtrarAnuncios();
});

watch(anunciosPorPagina, () => {
  filtrarAnuncios();
});

onUnmounted(() => {
  input.$reset();
});

onBeforeMount(() => {
  callData();
});

const change = () => {
  isActive.value = !isActive.value;
};

const callData = async () => {
  const querySnapshot = await getDocs(collection(db, "anuncios"));
  for (let doc of querySnapshot.docs) {
    anuncios.value.push({
      id_anuncio: doc.id,
      titulo: doc.data().titulo,
      nombre: doc.data().nombre,
      telefonoContacto: doc.data().telefonoContacto,
      descripcion: doc.data().descripcion,
      precio: doc.data().precio,
      foto: await getDownloadURL(reference(st, "anuncios/" + doc.id + "/1")),
      fecha: doc.data().fecha === undefined ? "" : doc.data().fecha.toDate(),
      telefono: {
        estado: doc.data().telefono.estado,
        marca: doc.data().telefono.marca,
        modelo: doc.data().telefono.modelo,
        pantalla: doc.data().telefono.pantalla,
        sistema: doc.data().telefono.sistema,
        rom: doc.data().telefono.rom,
        ram: doc.data().telefono.ram,
      },
    });
  }
  filtrarAnuncios();
  load.value = true;
};

// const cambiarPagina = (index) => {
//   anunciosFiltrados.value = anunciosFiltradosPaginados.value[index];
// };

const cambioPagina = () => {
  anunciosFiltradosPaginados.value = anunciosFiltrados.value.slice(
    current.value * anunciosPorPagina.value - anunciosPorPagina.value,
    current.value * anunciosPorPagina.value
  );
};

const filtrarAnuncios = () => {
  anunciosFiltrados.value = anuncios.value;

  // Filtro input navbar

  if (input.text !== "") {
    anunciosFiltrados.value = anunciosFiltrados.value.filter((t) => {
      let regex = new RegExp(input.text, "i");
      return regex.test(t.telefono.marca);
    });
  }

  // Filtro price

  if (input.desde !== "") {
    parseInt(input.desde);
    parseInt(input.hasta);
    anunciosFiltrados.value = anunciosFiltrados.value.filter((x) => {
      return x.precio > input.desde;
    });
  }

  if (input.hasta !== "") {
    parseInt(input.desde);
    parseInt(input.hasta);
    anunciosFiltrados.value = anunciosFiltrados.value.filter((x) => {
      return x.precio < input.hasta;
    });
  }

  // Filtro Nuevo, Marcas, Sistemas y Pantalla

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
      return regex.test(x.telefono.marca);
    });
    if (input.marcas[1] !== undefined) {
      let anuncios2 = anunciosTemporales.filter((x) => {
        let regex = new RegExp(input.marcas[1], "i");
        return regex.test(x.telefono.marca);
      });
      anunciosFiltrados.value.push(...anuncios2);
    }
    if (input.marcas[2] !== undefined) {
      let anuncios2 = anunciosTemporales.filter((x) => {
        let regex = new RegExp(input.marcas[2], "i");
        return regex.test(x.telefono.marca);
      });
      anunciosFiltrados.value.push(...anuncios2);
    }
    if (input.marcas[3] !== undefined) {
      let anuncios2 = anunciosTemporales.filter((x) => {
        let regex = new RegExp(input.marcas[3], "i");
        return regex.test(x.telefono.marca);
      });
      anunciosFiltrados.value.push(...anuncios2);
    }
    if (input.marcas[4] !== undefined) {
      let anuncios2 = anunciosTemporales.filter((x) => {
        let regex = new RegExp(input.marcas[3], "i");
        return regex.test(x.telefono.marca);
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

  // Filtrar por pantalla

  if (input.pantallas.length > 0) {
    input.pantallas.forEach((x) => {
      if (x === "6.0") {
        anunciosFiltrados.value = anunciosFiltrados.value.filter((t) => {
          return t.telefono.pantalla > 6;
        });
      }
      if (x === "5.5") {
        anunciosFiltrados.value = anunciosFiltrados.value.filter((t) => {
          return t.telefono.pantalla < 6.0 && t.telefono.pantalla > 5.0;
        });
      }
      if (x === "5.0") {
        anunciosFiltrados.value = anunciosFiltrados.value.filter((t) => {
          return t.telefono.pantalla <= 5.0;
        });
      }
    });
  }

  //Filtrar precio

  if (input.precio === false) {
    input.fecha = null;
    anunciosFiltrados.value = anunciosFiltrados.value.sort((p1, p2) => {
      if (p1.precio > p2.precio) {
        // this.filtrarFecha = null;
        return 1;
      }
      if (p1.precio < p2.precio) {
        return -1;
      }
      return 0;
    });
  }
  if (input.precio === true) {
    anunciosFiltrados.value = anunciosFiltrados.value.sort((p1, p2) => {
      if (p2.precio > p1.precio) {
        return 1;
      }
      if (p2.precio < p1.precio) {
        return -1;
      }
      return 0;
    });
  }

  //Filtrar fecha

  if (input.fecha === false) {
    input.precio = null;
    anunciosFiltrados.value = anunciosFiltrados.value.sort((p1, p2) => {
      if (p1.fecha > p2.fecha) {
        // this.filtrarFecha = null;
        return 1;
      }
      if (p1.fecha < p2.fecha) {
        return -1;
      }
      return 0;
    });
  }
  if (input.fecha === true) {
    anunciosFiltrados.value = anunciosFiltrados.value.sort((p1, p2) => {
      if (p2.fecha > p1.fecha) {
        return 1;
      }
      if (p2.fecha < p1.fecha) {
        return -1;
      }
      return 0;
    });
  }

  current.value = 1;
  let total = anunciosFiltrados.value.length;
  numPaginas.value = Math.ceil(total / anunciosPorPagina.value);
  anunciosFiltradosPaginados.value = anunciosFiltrados.value.slice(
    0,
    anunciosPorPagina.value
  );
  // anunciosFiltradosPaginados.value;
};
console.log(anunciosFiltradosPaginados.value);
</script>

<style scoped>
.big-container {
  position: relative;
}

.side-menu-container {
  width: var(--width-sidenav-sm);
  background: var(--main-color);
  height: 100%;
  padding: 0 30px 15px 30px;
  z-index: 101;
  position: fixed;
  top: 0;
  right: -100%;
  font-size: 1rem;
  transition: 200ms ease-in-out;
}

.toggle_back {
  right: 0;
}

.funel-icon {
  background-color: var(--main-color);
  width: 40px;
  height: 40px;
  justify-content: center;
  align-items: center;
  color: #000;
}
.visibility {
  display: flex;
}

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
  display: grid;
  grid-template-columns: 1fr 100px;
  width: 100%;
}

/* .paginator-container {
  display: flex;
}

.paginator-content {
  margin: 0 2px;
  padding: 3px 5px;
  background-color: var(--main-color);
} */

.paginator-content span {
  color: var(--text-color);
}

.paginator-content:hover {
  cursor: pointer;
}

.perPage-container {
  color: #000;
}

.visibility2 {
  display: none;
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

.visibility2 {
  display: none;
}

.anuncios-paginator {
  margin: 15px 0;
}

@media (max-width: 767px) {
  .visibility {
    display: none;
  }

  .main-container {
    grid-template-columns: 1fr;
  }

  .left-grid-container {
    /* width: var(--width-sidenav-sm);  */
    /* font-size: 1.5rem; */
    display: none;
  }
  .price-order-container {
    grid-template-columns: 1fr 70px;
  }

  .anuncios-content {
    grid-template-columns: 1fr;
  }

  .visibility2 {
    display: flex;
  }
}
</style>