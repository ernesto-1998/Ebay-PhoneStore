<template>
  <div class="main-container">
    <div class="container-space">
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
                <input v-model="anuncio.nombre" type="text" />
              </div>
            </div>

            <div class="item-box">
              <div class="item-title">
                <span>Número de Teléfono del Vendedor:</span>
              </div>
              <div class="item-input-number">
                <input
                  id="phone-number"
                  v-model="anuncio.telefonoContacto"
                  class="input-number"
                  type="tel"
                  maxlength="9"
                  @keyup="phoneNumberFormatter()"
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
            <div class="item-box-precio">
              <div class="item-precio">
                <div class="item-title">
                  <span>Precio</span>
                </div>
                <div class="item-input-number">
                  <input
                    v-model="anuncio.precio"
                    class="input-number"
                    type="number"
                  />
                </div>
              </div>
            </div>
          </div>
          <div class="buttons-container">
            <div class="buttons-content">
              <router-link
                :to="{ name: 'home' }"
                class="btnA btnAIcon btnGeneralA2"
                ><i class="bx bxs-x-circle"></i>Cancelar</router-link
              >
              <a class="btnA btnAIcon btnGeneralA" @click="guardarAnuncio"
                ><i class="bx bxs-save"></i>Crear</a
              >
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
              <div class="img-buttons">
                <div class="upload-button">
                  <a @click="cargarImagen()">
                    <div class="icon-cont icon-border">
                      <i class="bx bx-plus-medical"></i>
                    </div>
                  </a>
                </div>
                <div class="delete-button">
                  <a @click="borrarImagen(borrarKeys.numero, borrarKeys.index)">
                    <div class="icon-cont icon-border">
                      <i class="bx bx-minus"></i>
                    </div>
                  </a>
                </div>
              </div>

              <div class="img-table visibilidad2">
                <div class="table-container">
                  <table class="table table-borderless">
                    <!-- <thead> -->
                    <tr class="table-row-head">
                      <th class="table-ceil">N</th>
                      <th class="table-ceil">Tamaño</th>
                      <th class="table-ceil">Tipo</th>
                    </tr>
                    <!-- </thead> -->
                    <!-- <tbody v-if="visible === true"> -->
                    <tr
                      @click="cambiarImagen(value.numero, index)"
                      v-for="(value, index) in imagenes2"
                      :key="index"
                      class="table-row-body table-row"
                    >
                      <td class="table-ceil">{{ index + 1 }}</td>
                      <td class="table-ceil">{{ value.size }} kb</td>
                      <td class="table-ceil">
                        {{
                          value.type === "image/jpeg"
                            ? ".jpg"
                            : value.type === "image/png"
                            ? ".png"
                            : ".gif"
                        }}
                      </td>
                    </tr>
                    <!-- </tbody> -->
                  </table>
                </div>
              </div>
              <div class="img-table visibilidad">
                <div class="table-container">
                  <table class="table table-borderless">
                    <!-- <thead> -->
                    <tr class="table-row-head">
                      <th class="table-ceil">N</th>
                      <th class="table-ceil">Tamaño</th>
                      <th class="table-ceil">Tipo</th>
                    </tr>
                    <!-- </thead> -->
                    <!-- <tbody v-if="visible === true"> -->
                    <tr
                      @click="cambiarImagen(value.numero, index)"
                      v-for="(value, index) in imagenes2"
                      :key="index"
                      class="table-row-body table-row"
                    >
                      <td class="table-ceil">{{ index + 1 }}</td>
                      <td class="table-ceil">{{ value.size }} kb</td>
                      <td class="table-ceil">
                        {{
                          value.type === "image/jpeg"
                            ? ".jpg"
                            : value.type === "image/png"
                            ? ".png"
                            : ".gif"
                        }}
                      </td>
                    </tr>
                    <!-- </tbody> -->
                  </table>
                </div>
              </div>

              <div class="img-upload-container">
                <div class="img-content">
                  <img
                    v-if="imgControl"
                    :src="
                      imagenes2[contador] ? imagenes2[contador].url : rutaImg
                    "
                    alt=""
                  />
                  <q-spinner-hourglass
                    v-if="!imgControl"
                    color="purple"
                    size="10rem"
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
          </div>
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
import { ref, onMounted, watch, onUpdated } from "vue";
import router from "../router/index";
import { doc, addDoc, collection } from "firebase/firestore";
import { alertas } from "../utils/sweetAlerts2.js";
import { db, st } from "../firebase";
import {
  uploadBytes,
  getDownloadURL,
  getMetadata,
  ref as reference,
  list,
  deleteObject,
} from "firebase/storage";

// const id_usuario = router.currentRoute.value.params.id;
const rutaImg = ref("src/assets/blank-profile-picture-973460.svg");
let visible = ref(true);
let imgControl = ref(true);
let mostrarMovil = ref(false);
let borrarKeys = ref({
  numero: null,
  index: null,
});
let imagenes = ref([]);
let imagenes2 = ref([]);
let metaDatosI = ref([]);
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

onMounted(() => {});

watch(conteo, () => {
  if (conteo.value > 4) {
    conteo.value = 1;
  }
});

// onUpdated(() => {
//   console.log(Number(anuncio.value.telefonoContacto.replace("-", "")));
// });

const formatPhoneNumber = (value) => {
  if (!value) return value;
  const phoneNumber = value.replace(/[^\d]/g, "");
  const phoneNumberLength = phoneNumber.length;
  if (phoneNumberLength < 4) return phoneNumber;
  if (phoneNumberLength === 4) {
    return `${phoneNumber.slice(0, 4)}-`;
  }
  if (phoneNumberLength > 4 && phoneNumberLength <= 8) {
    return `${phoneNumber.slice(0, 4)}-${phoneNumber.slice(4)}`;
  }
};

const phoneNumberFormatter = () => {
  const inputField = document.getElementById("phone-number");
  const formattedInputValue = formatPhoneNumber(inputField.value);
  inputField.value = formattedInputValue;
};

// Métodos

// Este método guarda el anuncio

const guardarAnuncio = async () => {
  if (validarFormulario()) {
    if (imagenes.value.length > 0) {
      if (anuncio.value.telefonoContacto.length < 9) {
        alertas.alertaNegativa(
          "Ha ocurrido un error",
          "Debes ingresar un número telefónico de 8 dígitos"
        );
      } else {
        const docSnap = await addDoc(collection(db, "anuncios"), {
          // id_usuario: id_usuario,
          titulo: anuncio.value.titulo.trim(),
          nombre: anuncio.value.nombre.trim(),
          telefonoContacto: Number(
            anuncio.value.telefonoContacto.replace("-", "")
          ),
          fecha: new Date(),
          precio: anuncio.value.precio,
          descripcion: anuncio.value.descripcion.trim(),
          telefono: {
            estado: anuncio.value.telefono.estado.trim(),
            marca: anuncio.value.telefono.marca.trim(),
            modelo: anuncio.value.telefono.modelo.trim(),
            pantalla: anuncio.value.telefono.pantalla,
            sistema: anuncio.value.telefono.sistema,
            rom: anuncio.value.telefono.rom,
            ram: anuncio.value.telefono.ram,
          },
        });
        alertas.alertaAgregar();
        id_anuncio.value = docSnap.id;
        await guardarImagenes(docSnap.id);
        router.push({ name: "home" });
      }
    } else {
      alertas.alertaNegativa(
        "Ha ocurrido un error",
        "Debes subir al menos una imagen para crear un anuncio"
      );
    }
  } else {
    alertas.alertaNegativa(
      "Ha ocurrido un error",
      "Debes llenar todos los campos de los formularios"
    );
    // router.push({ name: "home" });
  }
};

const validarFormulario = () => {
  if (
    anuncio.value.titulo !== "" &&
    anuncio.value.nombre !== "" &&
    anuncio.value.telefonoContacto !== null &&
    anuncio.value.descripcion !== "" &&
    anuncio.value.precio !== null &&
    anuncio.value.telefono.estado !== "" &&
    anuncio.value.telefono.marca !== "" &&
    anuncio.value.telefono.pantalla !== null &&
    anuncio.value.telefono.sistema !== "" &&
    anuncio.value.telefono.rom !== null &&
    anuncio.value.telefono.ram !== null
  ) {
    return true;
  } else {
    return false;
  }
};

// Este método guarda las imagenes del componente imagen en la carpeta con el id del anuncio

const guardarImagenes = async (id) => {
  let numero = 1;
  for (let image of imagenes.value) {
    await uploadBytes(
      reference(st, "anuncios/" + id + "/" + numero),
      image
    ).then((snapshot) => {
      // console.log("Imagenes guardadas");
    });
    numero++;
  }
};

// Este método sube la imagen a una carpeta temporal (Aun no la carpeta oficial)

const handleFileUpload = async () => {};

const cargarImagen = async () => {
  if (img.value.files[0]) {
    if (imagenes2.value.length < 4) {
      imagenes.value.push(img.value.files[0]);
      imgControl.value = false;
      await uploadBytes(
        reference(st, "imagenes/temporal" + conteo.value),
        img.value.files[0]
      ).then((snapshot) => {
        traerImagenTemp();
        imgControl.value = true;
        img.value.value = "";
        mostrarMovil.value = true;
      });
    } else {
      alertas.alertaNegativa(
        "Ha ocurrido un error",
        "Solamente puedes subir un máximo de 4 imagenes por anuncio"
      );
    }
  } else {
    alertas.alertaNegativa(
      "Ha ocurrido un error",
      "Debes seleccionar una imagen para subirla"
    );
  }
};

// Este método trae la imagen en tiempo real en el componente upload (para que le usuario pueda verla)

const traerImagenTemp = async () => {
  await getDownloadURL(reference(st, "imagenes/temporal" + conteo.value)).then(
    async (url) => {
      const metaDatos = await getMetadata(
        reference(st, "imagenes/temporal" + conteo.value)
      );
      imagenes2.value.push({
        url: url,
        numero: conteo.value,
        size: (metaDatos.size * 0.001).toFixed(0),
        type: metaDatos.contentType,
      });
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

const cambiarImagen = (numero, index) => {
  borrarKeys.value.numero = numero;
  borrarKeys.value.index = index;
  contador.value = index;
};

// Método para borrar la imagen del menú

const borrarImagen = (numero, index) => {
  if (numero !== null && index !== null) {
    const desertRef = reference(st, "imagenes/temporal" + numero);
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
    borrarKeys.value.numero = null;
    borrarKeys.value.index = null;
  } else {
    alertas.alertaNegativa(
      "Ha ocurrido un error",
      "Debes seleccionar una imagen para eliminarla"
    );
  }
};
</script>

<style scoped>
.main-container {
  position: relative;
  margin-bottom: 75px;
  font-size: 1.2rem;
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
  /* display: flex;
  align-items: center; */
}

.item-title span {
  color: var(--text-color);
  margin-right: 2rem;
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
  /* width: 30%; */
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
  /* width: 35%; */
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

.item-box-precio {
  width: 100%;
}

.item-box-precio .item-precio {
  border: 0.5rem solid var(--text-color);
  padding: 1rem;
  margin: auto;
  width: 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

/* Tercer Contenedor */

.second-line {
  margin-top: 25px;
  background: var(--main-color);
  color: var(--text-color);
}

.title-content {
  display: flex;
  justify-content: center;
  margin: 1rem 0;
}

.title-content span {
  font-size: 25px;
  color: var(--text-color);
}

.img-container {
  /* background: var(--main-color); */
  /* display: flex;
  justify-content: center; */
  /* display: grid;
  grid-template-columns: 1fr 1fr 1fr; */
  padding: 15px 0;
  color: var(--text-color);
}

.img-box {
  /* display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  padding: 1rem; */
  display: grid;
  grid-template-columns: 100px 1fr 30%;
  padding: 1rem 5rem;
}

.img-table {
  display: flex;
  justify-content: center;
  color: var(--text-color);
}

.img-buttons {
  display: flex;
  flex-direction: column;
  /* justify-content: space-around; */
}

.upload-button,
.delete-button {
  font-size: 5rem;
  margin-bottom: 2rem;
  background-color: var(--second-color);
  border-radius: 50px;
}

/* .upload-button ion-icon,
.delete-button ion-icon {
} */

.upload-button:hover,
.delete-button:hover {
  cursor: pointer;
}

.table-container {
  color: var(--text-color);
}

.table-ceil {
  padding: 0.2rem 1.5rem;
  font-size: 1rem;
}

.img-content {
  /* width: 250px;
  height: 250px; */
  width: 100%;
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

.icon-border {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100px;
  height: 100px;
  border-radius: 100px;
  border: 1px solid #fff;
}

.table-row:hover {
  cursor: pointer;
  background-color: var(--second-color);
}
/* Third Line */

/* .third-line {
  width: 100%;
  padding: 15px;
  position: fixed;
  bottom: 0;
  background: var(--main-color);
} */

/* .img-container {
} */

/* .img-box {
  display: grid;
  grid-template-columns: 100px 1fr 1fr;
} */

.buttons-container {
  width: 100%;
  margin: 2rem 1rem;
}

.buttons-content {
  width: 100%;
  display: flex;
  justify-content: center;
}

.buttons-content a {
  margin: 0 15px;
}

.visibilidad {
  display: none;
}

@media (max-width: 820px) {
  .visibilidad {
    display: flex;
  }

  .visibilidad2 {
    display: none;
  }

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

  .img-table {
    margin: 2rem 1rem;
  }

  .first-line {
    grid-template-columns: 1fr;
  }

  .img-box {
    grid-template-columns: 95%;
  }

  .img-content {
    width: 80%;
    margin: 0 auto;
    overflow: hidden;
    margin-bottom: 15px;
  }

  .img-buttons {
    flex-direction: row;
    justify-content: space-around;
  }

  /* .list-container {
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
  } */
}
</style>