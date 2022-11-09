import { defineStore } from "pinia";

export const useInputStore = defineStore({
    id: 'input',
    state: () => ({
        text: '',
        desde: '',
        hasta: '',
        marcas: [],
        sistemas: [],
        pantallas: [],
        estado: null,
        precio: null
    }),
    actions: {
        asignarText(data) {
            this.text = data
        },
        asignarDesde(data){
            this.desde = data;
        },
        asignarHasta(data){
            this.hasta = data;
        },
        asignarMarcas(data){
            this.marcas = data;
        },
        asignarSistemas(data){
            this.sistemas = data;
        },
        asignarSistemas(data){
            this.pantallas = data;
        },
        asignarEstado(data){
            this.estado = data;
        },
        asignarPrecio(data){
            this.precio = data;
        }
    }
})