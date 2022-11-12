<template>
  <header class="header">
    <nav class="container-space navigation visibility">
      <div class="left-container">
        <router-link :to="{ name: 'home' }">
          <ion-icon name="megaphone-outline"></ion-icon>
          <span>Tienda Cellphone</span>
        </router-link>
      </div>
      <div class="input-container">
        <div class="input-content">
          <ion-icon name="search-outline"></ion-icon>
          <ion-icon
            v-if="text_input !== ''"
            @click="limpiarInput"
            name="close-circle-outline"
          ></ion-icon>
          <input
            type="text"
            placeholder="Ingresa una marca de telefono"
            v-model="text_input"
          />
        </div>
        <div class="search-button" @click="searchEmit">
          <ion-icon name="search-circle-outline"></ion-icon>
        </div>
      </div>
      <div class="buttons-container">
        <router-link :to="{ name: 'home' }" class="btnA btnGeneralA m-l"
          >Inicio</router-link
        >
        <router-link :to="{ name: 'home' }" class="btnA btnGeneralA m-l"
          >Estadisticas</router-link
        >
      </div>
      <div class="interaction-container">
        <router-link class="icon-interactive" :to="{ name: 'nuevo' }"
          ><div class="icon-cont background icon-border">
            <ion-icon name="add-outline"></ion-icon></div
        ></router-link>
        <router-link class="icon-interactive" :to="{ name: 'nuevo' }"
          ><ion-icon name="cart-outline"></ion-icon
        ></router-link>
      </div>
      <!-- <div class="side-menu-container" :class="{ toggle_back: isActive }">
        <SideNav @change-state="change" />
      </div> -->
    </nav>
    <!-- <nav class="movil-container visibilidad2">
      <div class="burguer-icon">
        <i class="bx bx-menu bx-lg"></i>
      </div>
    </nav> -->
    <nav class="navbar navbar-expand-lg navbar-light bg-primary visibility2">
      <div class="container-fluid">
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="d-flex visibility2">
          <input
            class="form-control me-2 input-size"
            type="search"
            placeholder="Search"
            aria-label="Search"
            v-model="text_input"
          />
          <button class="btn btn-warning" @click="searchEmit">Buscar</button>
        </div>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="hidden-menu">
            <hr />
            <!-- navbar-nav -->
            <li class="hidden-item">
              <router-link :to="{ name: 'home' }">Inicio</router-link>
            </li>
            <hr />
            <li class="hidden-item">
              <router-link :to="{ name: 'nuevo' }">Nuevo Anuncio</router-link>
            </li>
            <hr />
            <li class="hidden-item">
              <router-link :to="{ name: 'home' }">Carrito</router-link>
            </li>
            <hr />
            <li class="hidden-item">
              <router-link :to="{ name: 'home' }">Estadisticas</router-link>
            </li>
            <hr />
          </ul>
        </div>
      </div>
    </nav>
  </header>
</template>

<script setup>
import SideNav from "./SideNav.vue";
import { useInputStore } from "../stores/input";
import { ref, onUpdated, onMounted } from "vue";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { db, auth, st } from "../firebase";
import { getDownloadURL, ref as reference, list } from "firebase/storage";

let text_input = ref("");
let isActive = ref(false);
const input = useInputStore();

onMounted(() => {
  onAuthStateChanged(auth, async (user) => {
    if (user) {
      const storageRef = reference(
        st,
        "usuarios" + "/" + user.uid + "/" + "perfil"
      );
      const storageRefList = reference(st, "usuarios" + "/" + user.uid);
      const lista = await list(storageRefList);
      if (lista.items.length !== 0) {
        getDownloadURL(reference(st, storageRef)).then((url) => {
          user_photo.value.photo = url;
        });
      }
    } else {
    }
  });
});

onUpdated(() => {
  searchEmit();
});

const change = () => {
  isActive.value = !isActive.value;
};

const limpiarInput = () => (text_input.value = "");

const searchEmit = () => {
  input.asignarText(text_input.value);
};
</script>

<style scoped>
/* Estilos para navbar movil */

.hidden-menu {
  width: 100%;
  padding: 0.2rem;
  font-size: 1.2rem;
}

.hidden-item {
  width: 100%;
  /* display: flex;
  justify-content: center; */
}

.hidden-item a {
  width: 100%;
  display: flex;
  justify-content: center;
}

.input-size {
  width: 450px;
}

.visibility2 {
  display: none;
}
.m-l {
  margin-left: 1rem;
}

.icon-interactive {
  margin-left: 1rem;
}

.icon-interactive ion-icon {
  font-size: 2.2rem;
}

.interaction-container {
  display: flex;
  align-items: center;
}

.icon-border {
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 100px;
  border: 1px solid #fff;
}

header {
  width: 100%;
  height: 63px;
  /* padding: 10px 0; */
  background: var(--main-color);
  position: fixed;
  z-index: 100;
}

.side-menu-container {
  width: var(--width-sidenav-lg);
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

.toggle-button {
  width: 45px;
  height: 45px;
  overflow: hidden;
  border-radius: 50%;
  cursor: pointer;
}

.toggle-button img {
  height: 100%;
}

.toggle-button ion-icon {
  cursor: pointer;
  font-size: 1.9rem;
}

.navigation {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100%;
  /* gap: 10px; */
  color: var(--text-color);
}

.left-container a {
  display: flex;
  align-items: center;
  text-decoration: none;
  font-size: 1.5rem;
  font-weight: 800;
  cursor: pointer;
}

.interaction-container a:nth-child(2):hover {
  color: var(--text-color);
}

.left-container a:hover {
  color: var(--text-color);
}

.left-container ion-icon {
  margin-right: 10px;
  font-size: 2.2rem;
}

.input-container {
  height: 100%;
  display: flex;
  align-items: center;
  position: relative;
}

.input-content {
  height: 50%;
  position: relative;
  display: flex;
  align-items: center;
}

.input-content input {
  width: 430px;
  outline: none;
  padding: 0 33px;
  height: 100%;
  background: none;
  border: none;
  color: var(--text-color);
  border-bottom: 2px solid var(--text-color);
  transition: all 0.4s ease;
}

.input-content input:focus {
  background: var(--second-color);
  width: 480px;
}

.input-content input::placeholder {
  color: var(--text-color);
  opacity: 1;
}

.input-content ion-icon:nth-child(1) {
  font-size: 1.7rem;
  position: absolute;
  top: 6%;
  left: 0;
  color: var(--text-color);
}

.input-content ion-icon:nth-child(2) {
  font-size: 1.7rem;
  position: absolute;
  top: 6%;
  right: 0%;
  color: var(--text-color);
}

.search-button {
  height: 50%;
  position: relative;
  border: 2px solid var(--text-color);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.search-button ion-icon {
  font-size: 1.7rem;
}

.background {
  background-color: var(--second-color);
  border-radius: 50px;
}

.background:hover {
  background-color: var(--text-color);
  color: var(--main-color);
}

@media (min-width: 768px) and (max-width: 1024px) {
  .input-size {
    width: 550px;
  }

  .side-menu-container {
    width: var(--width-sidenav-md);
    font-size: 1.5rem;
  }

  .buttons-container {
    display: none;
  }

  .input-container {
    width: 60%;
  }

  .input-content input {
    width: 350px;
  }

  .input-content input:focus {
    width: 360px;
  }

  .visibility {
    display: none;
  }
  .visibility2 {
    display: block;
  }
}

@media (max-width: 767px) {
  .input-size {
    width: 300px;
  }

  .visibility {
    display: none;
  }
  .left-container {
    font-size: 1.2rem;
    font-weight: 800;
  }

  .left-container span {
    line-height: 1.1em;
  }

  .side-menu-container {
    width: var(--width-sidenav-sm);
    font-size: 1.5rem;
  }

  .left-container ion-icon {
    display: none;
  }

  .input-container {
    width: 60%;
    display: flex;
  }

  .input-content input {
    width: 180px;
  }

  .input-content input:focus {
    width: 190px;
  }

  .left-container {
    width: 20%;
  }

  .buttons-container {
    display: none;
  }

  .toggle-container {
    width: 20%;
  }

  .visibility2 {
    display: block;
  }

  @media (max-width: 414px) {
    .input-size {
      width: 190px;
    }

    .left-container span {
      font-size: 1.2rem;
    }

    .input-content input {
      width: 120px;
    }

    .input-content input:focus {
      width: 125px;
    }

    .visibilidad2 {
      display: block;
    }
  }
}
</style>