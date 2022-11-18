import { QMarkupTable } from 'quasar'
import Swal from 'sweetalert2'

export const alertas = {
    alertaAgregar(){
        Swal.fire({
            icon: 'success',
            title: 'El Anuncio se ha guardado con éxito!!!',
            showConfirmButton: false,
            timer: 2000
          })
    },
    alertaPositiva2(titulo, texto){
        Swal.fire({
            icon: 'success',
            title: titulo,
            text: texto,
            showConfirmButton: false,
            timer: 2500
          })
    },
    alertaPositiva(titulo, texto){
        Swal.fire({
            icon: "success",
            title: titulo,
            text: texto,
            color: '#fff',
            background: '#9C2C77',
            backdrop: `
                rgba(0,0,123,0.4)
                left top
                no-repeat
            `            
        })        
    },
    alertaNegativa(titulo, texto){
        Swal.fire({
            icon: "error",
            title: titulo,
            text: texto,
            color: '#fff',
            background: '#CD104D',
            backdrop: `
                rgba(0,0,123,0.4)
                left top
                no-repeat
            `            
        })
    }
}