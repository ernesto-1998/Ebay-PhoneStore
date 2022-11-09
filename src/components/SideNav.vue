<template>
  <div class="toggle-button">
    <!-- <ion-icon name="menu-outline" @click="sendEmit"></ion-icon> -->
    <ion-icon name="chevron-forward-outline" @click="sendEmit"></ion-icon>
  </div>
  <div class="side-menu-content">
    <div class="user-photo">
      <div class="user-photo-content">
        <img v-if="!control" src="../assets/blank-profile-picture-973460.svg" alt="" />
        <img v-if="control" :src="usuario.photo" alt="" />
      </div>
    </div>
    <div class="user-name">
      <span align="center" v-if="existe">{{ usuario.nombre }}</span>
      <span v-if="!existe"> No Registrado </span>
    </div>

    <hr />

    <div v-if="!existe" class="iniciar-sesion">
      <a class="btn btnGeneral" @click="googleAutenticar"
        ><span align="center">Iniciar Sesión</span></a
      >
    </div>

    <ul class="side-menu-options" v-if="existe">
      <router-link :to="{ name: 'perfil', params: { id: usuario.id }}"
        ><li class="options-items">Mi Perfil</li></router-link
      >
      <router-link :to="{ name: 'nuevo', params: { id: usuario.id }}"
        ><li class="options-items">Nuevo Anuncio</li></router-link
      >
      <router-link :to="{ name: 'anuncios', params: { id: usuario.id }}"
        ><li class="options-items">Mis Anuncios</li></router-link
      >
      <!-- <router-link :to="{ name: 'nuevo' }"
        ><li class="options-items">Estadisticas</li></router-link
      >  -->
      <li class="options-items-last"><a @click="cerrarSesion" class="btn btnGeneral2">Cerrar Sesión</a></li>
    </ul>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import {
  getAdditionalUserInfo,
  signOut,
  onAuthStateChanged,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { db, auth, st } from "../firebase";
import router from "../router/index";
import { getDownloadURL, ref as reference, list } from "firebase/storage";

let usuario = ref({});
let control = ref(false);
let existe = ref(false);
// const storageRef = reference(st, 'usuarios' + '/' + id_usuario + '/' + 'perfil');

onMounted(() => {
  onAuthStateChanged(auth, async (user) => {
    if (user) {
      usuario.value.id = user.uid;
      existe.value = true;
      const storageRef = reference(st, 'usuarios' + '/' + user.uid + '/' + 'perfil');
      const storageRefList = reference(st, 'usuarios' + '/' + user.uid);
      const lista = await list(storageRefList);
        if(lista.items.length !== 0) {
          await getDownloadURL(reference(st, storageRef)).then((url) => {
            usuario.value.photo = url;
            control.value = true;
          });
        }else {
          control.value = false;
        }

      const docRef = doc(db, "usuarios", user.uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        usuario.value.nombre = docSnap.data().nombre;
      } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
      }
    }
  });
});

const googleAutenticar = () => {
  const provider = new GoogleAuthProvider();
  
  auth.languageCode = "es";
  signInWithPopup(auth, provider)
    .then(async (result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      
      const token = credential.accessToken;

      // The signed-in user info.
      // const user = result.user;

      const docRef = doc(db, "usuarios", result.user.uid);
      const docSnap = await getDoc(docRef);

      if(!docSnap.exists()) {
        await setDoc(doc(db, "usuarios", result.user.uid), {
          id_usuario: result.user.uid,
          nombre: result.user.displayName,
          email: result.user.email,
        });

        llenarUsuario(result.user.uid);
        console.log("Es un nuevo usuario")
      }

    //   router.push({ name: "home" });
      
    })
    .catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
      // ...
    });
};

const cerrarSesion = () => {
  signOut(auth).then(() => {
    // control.value = false;
    router.go();
  });
};

const llenarUsuario = async (id_usuario) => {

      const docRef = doc(db, "usuarios", id_usuario);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        usuario.value.photo = docSnap.data().foto;
        usuario.value.nombre = docSnap.data().nombre;
        usuario.value.id = docSnap.data().id_usuario;
      } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
      }
    

}

const emit = defineEmits(["changeState"]);

const sendEmit = () => {
  emit("changeState");
};
</script>

<style scoped>

.toggle-button {
  padding-top: 15px;
  width: 100%;
  position: fixed;
  z-index: 102;
  background: var(--main-color);
}

.side-menu-content {
  padding: 20px;
  padding-top: 60px;
  height: 100vh;
  overflow: auto;
}

.toggle-button ion-icon {
  cursor: pointer;
  font-size: 1.9rem;
}

.user-photo {
  display: flex;
  justify-content: center;
}

.user-photo-content {
  width: 100%;
  overflow: hidden;
}

.user-photo-content img {
  object-fit: cover;
}

.user-name {
  margin: 10px 0;
  display: flex;
  justify-content: center;
}

.iniciar-sesion {
  display: flex;
  justify-content: center;
  padding-top: 15px;
}

.btnIniciar {
  padding: 5px 20px;
  background: var(--second-color);
  color: var(--text-color);
  cursor: pointer;
}

.btnIniciar:hover {
  background: var(--text-color);
  color: var(--main-color);
}

.side-menu-options .options-items {
  display: flex;
  justify-content: center;
  padding: 10px 0;
  transition: 250ms ease-in-out;
}

.options-items-last {
  display: flex;
  justify-content: center;
  margin-top: 120px;
  
}

.options-items:hover {
  background: var(--second-color);
  color: var(--text-color);
  cursor: pointer;
}

/* @media(max-width: 767px) {
  .user-photo-content {
    width: 75%;
  }
} */
</style>