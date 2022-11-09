<template>
  <div class="main-container">
    <div class="container">
      <div class="first-line">
        <div class="first-cuadrant">
          <div class="form-content">
            <div class="item-box">
              <div class="item-title">
                <span>Estado del Teléfono</span>
              </div>
              <div class="radio-container">
                <div class="item-radio">
                  <input
                    v-model="anuncio.telefono.estado"
                    type="radio"
                    value="nuevo"
                    name="estado"
                  />
                  <span>Nuevo</span>
                </div>
                <div class="item-radio">
                  <input
                    v-model="anuncio.telefono.estado"
                    type="radio"
                    value="usado"
                    name="estado"
                  />
                  <span>Usado</span>
                </div>
              </div>
            </div>

            <div class="item-box">
              <div class="item-title">
                <span>Marca:</span>
              </div>
              <div class="item-input">
                <input v-model="anuncio.telefono.marca" type="text" />
              </div>
            </div>

            <div class="item-box">
              <div class="item-title">
                <span>Modelo:</span>
              </div>
              <div class="item-input">
                <input v-model="anuncio.telefono.modelo" type="text" />
              </div>
            </div>

            <div class="item-box">
              <div class="item-title">
                <span>Pantalla:</span>
              </div>
              <div class="item-input">
                <input v-model="anuncio.telefono.pantalla" type="number" />
              </div>
            </div>

            <div class="item-box">
              <div class="item-title">
                <span>Sistema Operativo:</span>
              </div>
              <div class="select-container">
                <select
                  v-model="anuncio.telefono.sistema"
                  name="sistema"
                  id="cars"
                >
                  <option value="" disabled>Escoge un Sistema</option>
                  <option value="android">Android</option>
                  <option value="ios">IOS</option>
                  <option value="windows">Windows</option>
                </select>
              </div>
            </div>

            <div class="item-box">
              <div class="item-title">
                <span>ROM:</span>
              </div>
              <div class="item-input">
                <input v-model="anuncio.telefono.rom" type="number" />
              </div>
            </div>

            <div class="item-box">
              <div class="item-title">
                <span>RAM:</span>
              </div>
              <div class="item-input">
                <input v-model="anuncio.telefono.ram" type="number" />
              </div>
            </div>
          </div>
        </div>
        <div class="second-cuadrant">
          <div class="form-content">
            <div class="item-box">
              <div class="item-title">
                <span>Titulo Breve del Anuncio</span>
              </div>
              <div class="item-input">
                <input v-model="anuncio.titulo" type="text" />
              </div>
            </div>

            <div class="item-box">
              <div class="item-title">
                <span>Nombre del Vendedor:</span>
              </div>
              <div class="item-input">
                <input v-model="anuncio.vendedor" type="text" />
              </div>
            </div>

            <div class="item-box">
              <div class="item-title">
                <span>Número de Teléfono del Vendedor:</span>
              </div>
              <div class="item-input-number">
                <input
                  v-model="anuncio.numeroTelefono"
                  class="input-number"
                  type="number"
                />
              </div>
            </div>

            <div class="item-box">
              <div class="item-title">
                <span>Descripción:</span>
              </div>
              <div class="item-input">
                <textarea
                  v-model="anuncio.descripcion"
                  id=""
                  cols="30"
                  rows="5"
                ></textarea>
              </div>
            </div>
            <div class="item-box">
              <div class="item-title">
                <span>Precio</span>
              </div>
              <div class="item-input-number">
                <input
                  v-model="anuncio.telefono.precio"
                  class="input-number"
                  type="number"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="second-line">
        <div class="title-content">
          <span align="center"
            >Puedes subir un máximo de 4 imagenes por Anuncio</span
          >
        </div>
        <div class="third-cuadrant">
          <div class="img-container">
            <div class="img-box">
              <div class="img-content">
                <img
                  :src="imagenes[contador] ? imagenes[contador].url : rutaImg"
                  alt=""
                />
              </div>
              <div class="upload-content">
                <div class="upload-input">
                  <input
                    class="btn btnGeneral"
                    ref="img"
                    v-on:change="handleFileUpload()"
                    type="file"
                    id="file"
                    name="file"
                    accept="image/png, image/jpeg"
                  />
                </div>
              </div>
            </div>
          </div>

          <ul class="list-container">
            <li class="list-item" v-for="(img, index) in imagenes" :key="index">
              <div class="list-item-content">
                <div class="list-item-number" @click="cambiarImagen(index)">
                  <span>{{ index + 1 }}</span>
                </div>
                <div
                  class="list-item-icon"
                  @click="borrarImagen(img.numero, index)"
                >
                  <ion-icon name="trash-outline"></ion-icon>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <!-- <div class="third-line">
      <div class="buttons-container">
        <div class="buttons-content">
          <a class="btn btnGeneral" @click="guardarAnuncio">Enviar</a>
          <router-link :to="{ name: 'home' }" class="btn btnGeneral2"
            >Cancelar</router-link
          >
        </div>
      </div>
    </div> -->
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";
import router from "../router/index";
import { doc, addDoc, collection } from "firebase/firestore";
import { db, st } from "../firebase";
import {
  uploadBytes,
  getDownloadURL,
  ref as reference,
  list,
  deleteObject,
} from "firebase/storage";

// const id_usuario = router.currentRoute.value.params.id;
const rutaImg = ref(null);
let imagenes = ref([]);
let imagenes2 = ref([]);
let borrarArray = [];
let contador = ref(0);
let conteo = ref(1);
const id_anuncio = ref("");
let control = ref(false);
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
let img = ref(null);

onMounted(() => {
  getDownloadURL(
    reference(st, "anuncios/noImg/" + "blank-profile-picture-973460.svg")
  ).then((url) => {
    rutaImg.value = url;
  });
});

watch(conteo, () => {
  if (conteo.value > 4) {
    conteo.value = 1;
  }
});

// Métodos

// Este método guarda el anuncio

const guardarAnuncio = async () => {
  if (
    anuncio.value.titulo !== "" &&
    anuncio.value.nombre !== "" &&
    anuncio.value.telefonoContacto &&
    anuncio.value.descripcion !== "" &&
    anuncio.value.precio !== null &&
    anuncio.value.telefono.estado !== "" &&
    anuncio.value.telefono.marca !== "" &&
    anuncio.value.telefono.pantalla !== null &&
    anuncio.value.telefono.sistema !== "" &&
    anuncio.value.telefono.rom !== null &&
    anuncio.value.telefono.ram !== null
  ) {
    if (imagenes.value.length > 0) {
      const docSnap = await addDoc(collection(db, "anuncios"), {
        id_usuario: id_usuario,
        titulo: anuncio.value.titulo.trim(),
        vendedor: anuncio.value.vendedor.trim(),
        numeroTelefono: anuncio.value.numeroTelefono,
        descripcion: anuncio.value.descripcion,
        telefono: {
          estado: anuncio.value.telefono.estado,
          modelo: anuncio.value.telefono.modelo,
          sistema: anuncio.value.telefono.sistema,
          precio: anuncio.value.telefono.precio,
        },
      });
      id_anuncio.value = docSnap.id;
      guardarImagenes(docSnap.id);
    } else {
      alert("Debes subir por lo menos una imagen para crear un anuncio");
    }
  } else {
    alert("Debes llenar todos los campos");
  }
};

// Este método guarda las imagenes del componente imagen en la carpeta con el id del anuncio

const guardarImagenes = async (id) => {
  let numero = 1;
  for (let image of imagenes2.value) {
    await uploadBytes(
      reference(st, "anuncios/" + id + "/" + numero),
      image
    ).then((snapshot) => {
      console.log("Imagenes guardadas");
    });
    numero++;
  }
  router.go();
};

// Este método sube la imagen a una carpeta temporal (Aun no la carpeta oficial)

const handleFileUpload = async () => {
  if (imagenes.value.length < 4) {
    if (borrarArray.length !== 0) {
      conteo.value = borrarArray[0];
    }
    imagenes2.value.push(img.value.files[0]);
    await uploadBytes(
      reference(st, "anuncios/temporal/" + conteo.value),
      img.value.files[0]
    ).then((snapshot) => {
      traerImagenTemp();
      img.value.value = "";
    });
  } else {
    alert("Solo puedes subir 4 imagenes por anuncio");
  }
};

// Este método trae la imagen en tiempo real en el componente upload (para que le usuario pueda verla)

const traerImagenTemp = async () => {
  await getDownloadURL(reference(st, "anuncios/temporal/" + conteo.value)).then(
    (url) => {
      imagenes.value.push({ url: url, numero: conteo.value });
      control.value = true;
      conteo.value += 1;
      contador.value = imagenes.value.length - 1;
      if (borrarArray.length !== 0) {
        borrarArray.shift();
      }
    }
  );
};

// Método para cambiar imagen en el menú

const cambiarImagen = (index) => {
  contador.value = index;
};

// Método para borrar la imagen del menú

const borrarImagen = (numero, index) => {
  const desertRef = reference(st, "anuncios/temporal/" + numero);
  borrarArray.push(numero);
  deleteObject(desertRef)
    .then(() => {
      imagenes2.value.splice(index, 1);
      imagenes.value.splice(index, 1);
      console.log("Imagen borrada", numero);
    })
    .catch((error) => {
      console.log(error);
    });
};
</script>

<style scoped>
.main-container {
  position: relative;
  margin-bottom: 75px;
}

.first-line {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 25px;
}

.first-cuadrant {
  background: var(--main-color);
  width: 100%;
  height: 100%;
}

.form-content {
  padding: 0 20px;
}

.item-box {
  margin: 20px 0;
}

.item-title span {
  color: var(--text-color);
}

.item-input input,
textarea {
  width: 65%;
  outline: none;
  padding: 2px 5px;
  background: none;
  border: none;
  color: var(--text-color);
  border-bottom: 2px solid var(--text-color);
  transition: all 0.4s ease;
}

.item-input textarea {
  padding: 10px 10px;
  resize: none;
}

.item-input-number input {
  width: 30%;
  outline: none;
  padding: 2px 5px;
  background: none;
  border: none;
  color: var(--text-color);
  border-bottom: 2px solid var(--text-color);
  transition: all 0.4s ease;
}

.item-input-number input:focus {
  background: var(--second-color);
  width: 35%;
}

.item-input input:focus {
  background: var(--second-color);
  width: 70%;
}

.item-input textarea:focus {
  background: var(--second-color);
  width: 70%;
}

/* Segundo contenedor */

.second-cuadrant {
  background: var(--main-color);
  width: 100%;
  height: 100%;
}

.radio-container {
  display: flex;
  align-items: center;
}

.item-radio {
  margin: 10px 10px 0 0;
}

.item-radio span {
  margin-left: 10px;
  color: var(--text-color);
}

.select-container {
  margin-top: 10px;
}

.select-container select {
  outline: none;
  border: none;
  padding: 5px;
  background: var(--second-color);
  color: var(--text-color);
}

.select-container option {
  border: none;
  padding: 5px;
}

.buttons-container {
  display: flex;
  justify-content: space-evenly;
}

.item-box:last-of-type {
  margin-top: 30px;
}

/* Tercer Contenedor */

.second-line {
  margin-top: 25px;
  background: var(--main-color);
}

.third-cuadrant {
  display: flex;
  justify-content: center;
}

.title-content {
  display: flex;
  justify-content: center;
}

.title-content span {
  font-size: 25px;
  color: var(--text-color);
}

.img-container {
  /* background: var(--main-color); */
  display: flex;
  justify-content: center;
  padding: 15px 0;
}

.img-content {
  width: 350px;
  height: 350px;
  margin: 0 auto;
  overflow: hidden;
  margin-bottom: 15px;
}

.img-content img {
  object-fit: cover;
}

.upload-input {
  display: flex;
  justify-content: center;
  margin-bottom: 15px;
}

.upload-button {
  display: flex;
  justify-content: center;
}

.list-container {
  padding: 15px 0;
  margin-left: 15px;
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

.list-item-icon {
  padding: 15px 25px;
  cursor: pointer;
  background: var(--third-color);
  transition: 250ms ease-in-out;
}

.list-item-icon:hover {
  background: var(--text-color);
  color: var(--main-color);
  transform: translateY(-3px);
}

.list-item-icon ion-icon {
  font-size: 1.5rem;
}

/* Third Line */

.third-line {
  width: 100%;
  padding: 15px;
  position: fixed;
  bottom: 0;
  background: var(--main-color);
}

.buttons-container {
  width: 100%;
}

.buttons-content {
  width: 100%;
  display: flex;
  justify-content: center;
}

.buttons-content a {
  margin: 0 15px;
}

@media (max-width: 767px) {
  .item-input input {
    width: 90%;
  }

  .item-input-number input {
    width: 90%;
  }

  .item-input textarea {
    width: 90%;
  }

  .third-cuadrant {
    display: flex;
    flex-direction: column;
  }

  .first-line {
    grid-template-columns: 1fr;
  }

  .img-content {
    width: 80%;
    margin: 0 auto;
    overflow: hidden;
    margin-bottom: 15px;
  }

  .list-container {
    margin-left: 0;
    padding: 0;
  }

  .list-item {
    width: 100%;
    background: transparent;
    display: flex;
    justify-content: center;
    margin-top: 0;
  }

  .list-item-content {
    display: flex;
    background: var(--second-color);
  }
}
</style>