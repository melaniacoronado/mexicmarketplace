<template>
<q-page>
    <div id="personalizacion-maceta">
        <div class="tools q-pb-xl">
            <div class="header">
                <div class="titulo">Personalización de producto</div>
                <div class="holder row items-center">
                    <div class="cotizado q-mr-md" v-show="!estatusCompleto() || state.precioCargado"><span class="text-bold">Precio: </span>{{ formatter(state.precioTotal) }}</div>
                    <q-btn label="Agregar a carrito" color="primary" :disable="estatusCompleto()" @click="agregarACarrito()" />
                </div>
            </div>
        </div>

        <HistorialMacetas @editar="selectMaceta" />

        <ul class="nav q-mt-sm">
            <li id="material" class="link activo" @click="changeView('material')">Material</li>
            <li id="forma" class="link" @click="changeView('forma')">Forma</li>
            <li id="color" class="link" @click="changeView('color')">Color</li>
            <li id="medida" class="link" @click="changeView('medida')">Tamaño</li>
        </ul>

        <div class="content">
            <div class="img-holder">
                <img :src="obtenerImagenUrl()" alt="imagen maceta base">
            </div>

            <div class="opciones">
                <div class="materiales sub-opciones" v-show="state.view == 'material'">
                    <div class="material-op opcion" v-for="(material, index) in state.materiales" :key="index" @click="selectOption(index)">
                        {{material.nombreMaterial}}
                    </div>
                </div>

                <div class="formas sub-opciones" v-show="state.view == 'forma'">
                    <div class="forma-op opcion" v-for="(forma, index) in state.formas" :key="index" @click="selectOption(index)">
                        {{forma.nombreForma}}
                    </div>
                </div>

                <div class="colores sub-opciones" v-show="state.view == 'color'">
                    <div class="color-op opcion" v-for="(color, index) in state.colores" :key="index" @click="selectOption(index)">
                        <span>{{ color.nombreColor }}</span>
                        <div class="circulo" :style="`background-color: #${color.codigoColor};`"></div>
                    </div>
                </div>

                <div class="medidas sub-opciones" v-show="state.view == 'medida'">
                    <div class="medida-op opcion" v-for="(medida, index) in state.medidas" :key="index" @click="selectOption(index)">
                        {{medida.nombreMedida}}
                    </div>
                </div>
            </div>
        </div>

    </div>
</q-page>
</template>

<script>
import {
    defineComponent,
    onMounted,
    reactive
} from 'vue'
import {
    api
} from 'boot/axios'
import {
    useQuasar
} from 'quasar'
import {
    useRouter
} from 'vue-router'
import {
    useStore
} from 'vuex'
import HistorialMacetas from '../../components/HistorialMacetas.vue'

export default defineComponent({
    name: 'PersonalizacionMaceta',
    components: {
        HistorialMacetas
    },
    setup() {
        document.title = 'Personalización de productos';

        const $q = useQuasar();
        const $router = useRouter();
        const $store = useStore();

        const state = reactive({
            view: 'material',
            macetaDelHistorial: null,
            precioCargado: false,

            color: -1,
            material: -1,
            forma: -1,
            medida: -1,

            colores: [],
            materiales: [],
            formas: [],
            medidas: [],

            copiaColores: [],
            copiaMateriales: [],
            copiaFormas: [],
            copiaMedidas: [],

            mt2: 0,
            precioMt2: 0,
            aumentoColor: 0,
            aumentoForma: 0,
            precioTotal: 0,
        });

        onMounted(async () => {
            //Obtener colores, materiales, formas y medidas disponibles
            await api.get('/Color').then(res => state.colores = state.copiaColores = res.data.payload);
            await api.get('/Material').then(res => state.materiales = state.copiaMateriales = res.data.payload.filter(m => m.materialId == 1 || m.materialId == 2));
            console.log(state.materiales);
            state.materiales[0].nombreMaterial =  state.copiaMateriales[0].nombreMaterial =  "Mármol";
            state.materiales[1].nombreMaterial =  state.copiaMateriales[1].nombreMaterial =  "Fibra de vidrio";

            console.log(state.materiales);
            await api.get('/Forma').then(res => state.formas = state.copiaFormas = res.data.payload);
            await api.get('/Medida').then(res => state.medidas = state.copiaMedidas = res.data.payload);
        })

        //Actualizr la imagen a desplegar
        function obtenerImagenUrl() {
            let material = state.materiales[state.material] ? state.materiales[state.material].nombreMaterial : '';
            let color = state.colores[state.color] ? state.colores[state.color].nombreColor : '';
            let forma = state.formas[state.forma] ? state.formas[state.forma].nombreForma : '';

            if (material == 'Cerámica' && (forma == '' || forma == 'Copa') && (color == '' || color == 'Blanco'))
                return require('../../assets/macetas_personalizadas/copa_blanco.png');

            if (material == 'Cerámica' && (forma == '' || forma == 'Copa') && (color == '' || color == 'Amarillo'))
                return require('../../assets/macetas_personalizadas/copa_amarillo.png');

            if (material == 'Cerámica' && (forma == '' || forma == 'Copa') && (color == '' || color == 'Azul'))
                return require('../../assets/macetas_personalizadas/copa_azul.png');

            if (material == 'Cerámica' && (forma == '' || forma == 'Copa') && (color == '' || color == 'Gris'))
                return require('../../assets/macetas_personalizadas/copa_gris.png');

            if (material == 'Cerámica' && (forma == '' || forma == 'Copa') && (color == '' || color == 'Morado'))
                return require('../../assets/macetas_personalizadas/copa_morado.png');

            if (material == 'Cerámica' && (forma == '' || forma == 'Copa') && (color == '' || color == 'Naranja'))
                return require('../../assets/macetas_personalizadas/copa_naranja.png');

            if (material == 'Cerámica' && (forma == '' || forma == 'Copa') && (color == '' || color == 'Negro'))
                return require('../../assets/macetas_personalizadas/copa_negro.png');

            if (material == 'Cerámica' && (forma == '' || forma == 'Copa') && (color == '' || color == 'Rojo'))
                return require('../../assets/macetas_personalizadas/copa_rojo.png');

            if (material == 'Cerámica' && (forma == '' || forma == 'Copa') && (color == '' || color == 'Rosa'))
                return require('../../assets/macetas_personalizadas/copa_rosa.png');

            if (material == 'Cerámica' && (forma == '' || forma == 'Copa') && (color == '' || color == 'Verde'))
                return require('../../assets/macetas_personalizadas/copa_verde.png');

            // Reloj

            if (material == 'Cerámica' && (forma == 'Reloj') && (color == '' || color == 'Blanco'))
                return require('../../assets/macetas_personalizadas/reloj_blanco.png');

            if (material == 'Cerámica' && (forma == 'Reloj') && (color == '' || color == 'Amarillo'))
                return require('../../assets/macetas_personalizadas/reloj_amarillo.png');

            if (material == 'Cerámica' && (forma == 'Reloj') && (color == '' || color == 'Azul'))
                return require('../../assets/macetas_personalizadas/reloj_azul.png');

            if (material == 'Cerámica' && (forma == 'Reloj') && (color == '' || color == 'Gris'))
                return require('../../assets/macetas_personalizadas/reloj_gris.png');

            if (material == 'Cerámica' && (forma == 'Reloj') && (color == '' || color == 'Morado'))
                return require('../../assets/macetas_personalizadas/reloj_morado.png');

            if (material == 'Cerámica' && (forma == 'Reloj') && (color == '' || color == 'Naranja'))
                return require('../../assets/macetas_personalizadas/reloj_naranja.png');

            if (material == 'Cerámica' && (forma == 'Reloj') && (color == '' || color == 'Negro'))
                return require('../../assets/macetas_personalizadas/reloj_negro.png');

            if (material == 'Cerámica' && (forma == 'Reloj') && (color == '' || color == 'Rojo'))
                return require('../../assets/macetas_personalizadas/reloj_rojo.png');

            if (material == 'Cerámica' && (forma == 'Reloj') && (color == '' || color == 'Rosa'))
                return require('../../assets/macetas_personalizadas/reloj_rosa.png');

            if (material == 'Cerámica' && (forma == 'Reloj') && (color == '' || color == 'Verde'))
                return require('../../assets/macetas_personalizadas/reloj_verde.png');

            // Mármol cudrado
            if (material == 'Mármol' && (forma == '' || forma == 'Cuadrangular') && (color == '' || color == 'Blanco'))
                return require('../../assets/macetas_personalizadas/cuadrado_blanco.png');
            if (material == 'Mármol' && (forma == '' || forma == 'Cuadrangular') && (color == '' || color == 'Negro'))
                return require('../../assets/macetas_personalizadas/cuadrado_negro.png');
            if (material == 'Mármol' && (forma == '' || forma == 'Cuadrangular') && (color == '' || color == 'Gris'))
                return require('../../assets/macetas_personalizadas/cuadrado_gris.png');

            // Mármol rectángulo

            if (material == 'Mármol' && (forma == 'Rectangular') && (color == '' || color == 'Blanco'))
                return require('../../assets/macetas_personalizadas/rectangulo_blanco.png');
            if (material == 'Mármol' && (forma == 'Rectangular') && (color == '' || color == 'Negro'))
                return require('../../assets/macetas_personalizadas/rectangulo_negro.png');
            if (material == 'Mármol' && (forma == 'Rectangular') && (color == '' || color == 'Gris'))
                return require('../../assets/macetas_personalizadas/rectangulo_gris.png');

            // Mármol cilindro
            if (material == 'Mármol' && (forma == 'Cilíndrica') && (color == '' || color == 'Blanco'))
                return require('../../assets/macetas_personalizadas/cilindro_blanco.png');
            if (material == 'Mármol' && (forma == 'Cilíndrica') && (color == '' || color == 'Negro'))
                return require('../../assets/macetas_personalizadas/cilindro_negro.png');
            if (material == 'Mármol' && (forma == 'Cilíndrica') && (color == '' || color == 'Gris'))
                return require('../../assets/macetas_personalizadas/cilindro_gris.png');

            return require('../../assets/macetas_personalizadas/copa_blanco.png');
        }

        //Formatear el precio
        function formatter(val) {
            return new Intl.NumberFormat('es-MX', {
                style: 'currency',
                currency: 'MXN',
                minimumFractionDigits: 2
            }).format(val);
        }

        //Cambiar aspecto del elemento activo
        function changeView(view) {
            state.view = view;
            const opciones = document.querySelectorAll('.link');
            const seleccionada = document.querySelector(`#${view}`);

            opciones.forEach(opcion => opcion.classList.remove('activo'));
            seleccionada.classList.add('activo');
        }

        //Cambiar opciones en función de lo seleccionado
        function alterOptions(view, index) {
            const opciones = document.querySelectorAll('.' + view + '-op');
            opciones.forEach(opcion => opcion.classList.remove('seleccionada'));
            opciones[index].classList.add('seleccionada');
        }

        //Remover elemento seleccionado
        function removeSeleccionada(view) {
            const opciones = document.querySelectorAll('.' + view + '-op');
            opciones.forEach(opcion => opcion.classList.remove('seleccionada'));
        }

        //Seleccionar elemento
        function selectOption(index) {
            alterOptions(state.view, index);

            switch (state.view) {
                //Para el material
                case 'material':
                    state.material = index;
                    state.precioMt2 = state.materiales[index].precioMt2;

                    const opciones = document.querySelectorAll('.forma-op');
                    opciones.forEach(opcion => opcion.classList.remove('disabled'));

                    let indices = [];
                    if (state.material == 1)
                        indices = state.copiaFormas.flatMap(f => f.nombreForma == 'Cuadrangular' || f.nombreForma == 'Rectangular' || f.nombreForma == 'Cilíndrica' ? f.formaID - 1 : null);
                    else
                        indices = state.copiaFormas.flatMap(f => f.nombreForma == 'Copa' || f.nombreForma == 'Reloj' ? f.formaID - 1 : null);

                    indices.forEach(i => i != null ? opciones[i].classList.add('disabled') : null);

                    removeSeleccionada('forma');
                    removeSeleccionada('color');
                    removeSeleccionada('medida');

                    break;
                    //Para la forma
                case 'forma':
                    state.forma = index;
                    state.aumentoForma = state.formas[index].aumentoPrecio;

                    const opciones2 = document.querySelectorAll('.color-op');
                    opciones2.forEach(opcion => opcion.classList.remove('disabled'));

                    let indices2 = [];
                    if (state.forma == 0 || state.forma == 1 || state.forma == 2)
                        indices2 = state.copiaColores.flatMap(c => c.colorId > 3 ? c.colorId - 1 : null);

                    indices2.forEach(i => i != null ? opciones2[i].classList.add('disabled') : null);

                    const opciones3 = document.querySelectorAll('.medida-op');
                    opciones3.forEach(opcion => opcion.classList.remove('disabled'));

                    let indices3 = [];
                    switch (state.forma) {
                        case 0:
                            indices3 = state.copiaMedidas.flatMap(m => m.medidaID > 3 ? m.medidaID - 1 : null);
                            break;
                        case 1:
                            indices3 = state.copiaMedidas.flatMap(m => ![4, 5, 9].includes(m.medidaID) ? m.medidaID - 1 : null);
                            break;
                        case 2:
                            indices3 = state.copiaMedidas.flatMap(m => m.medidaID != 5 ? m.medidaID - 1 : null);
                            break;
                        case 3:
                            indices3 = state.copiaMedidas.flatMap(m => ![6, 7, 9].includes(m.medidaID) ? m.medidaID - 1 : null);
                            break;
                        case 4:
                            indices3 = state.copiaMedidas.flatMap(m => m.medidaID != 8 ? m.medidaID - 1 : null);
                            break;
                    }

                    indices3.forEach(i => i != null ? opciones3[i].classList.add('disabled') : null);
                    removeSeleccionada('color');
                    break;

                    //Para el color
                case 'color':
                    state.color = index;
                    state.aumentoColor = state.colores[index].aumentoPrecio;
                    break;

                    //Para la medida
                case 'medida':
                    state.medida = index;
                    state.mt2 = state.medidas[index].mt2;
                    break;
            }

            state.precioTotal = 4500;
            state.precioCargado = false;
        }

        // Una vez seleccionados todos los atributos se muestra el precio
        function estatusCompleto() {
            return state.material == -1 || state.forma == -1 || state.color == -1 || state.medida == -1 || state.precioTotal == 0;
        }

        // Se carga la maceta seleccionada del historial
        function selectMaceta(val) {
            state.macetaDelHistorial = val;
            state.color = state.colores.findIndex(color => color.nombreColor == state.macetaDelHistorial.color);
            state.forma = state.formas.findIndex(forma => forma.nombreForma == state.macetaDelHistorial.forma);
            state.material = state.materiales.findIndex(material => material.nombreMaterial == state.macetaDelHistorial.material);
            state.medida = state.medidas.findIndex(medida => medida.nombreMedida == state.macetaDelHistorial.medida);
            state.precioTotal = state.macetaDelHistorial.precio;

            alterOptions('color', state.color);
            alterOptions('forma', state.forma);
            alterOptions('material', state.material);
            alterOptions('medida', state.medida);

            state.precioCargado = true;
        }

        // Se agrega la maceta al carrito
        async function agregarACarrito() {
            if (!localStorage.getItem('clienteID')) {
                $q.notify({
                    message: 'Debes ingresar a tu cuenta para agregar al carrito',
                    color: 'primary'
                })
                return;
            }

            let nuevaMaceta = {
                ClienteID: localStorage.getItem('clienteID'),
                NombreMaceta: 'Maceta personalizada',
                MaterialID: state.materiales[state.material].materialId,
                ColorID: state.colores[state.color].colorId,
                FormaID: state.formas[state.forma].formaID,
                MedidaID: state.medidas[state.medida].medidaID,
                Precio: state.precioTotal
            };

            let macetaID = -1;

            if (state.macetaDelHistorial == null)
                await api.post('/Maceta/Personalizada', nuevaMaceta, {
                    headers: {
                        Authorization: 'Bearer ' + localStorage.getItem("token"),
                    }
                })
                .then(res => macetaID = res.data.payload.num);
            else {
                macetaID = state.macetaDelHistorial.macetaID;
                state.macetaDelHistorial = null;
            }

            //Se agrega maceta personalizada del cliente
            if (macetaID == -1) {
                $q.notify({
                    color: 'red-6',
                    textColor: 'white',
                    message: 'Borra alguna maceta para poder agregar una nueva',
                    position: 'top',
                    timeout: 5000
                })
                return;
            }

            //Se agrega como un item del carrito de compras
            await api({
                    url: "/CarritoCompras/AgregarItem",
                    method: "POST",
                    data: {
                        ClienteID: localStorage.getItem('clienteID'),
                        MacetaID: macetaID,
                        Cantidad: 1,
                        Color: nuevaMaceta.ColorID,
                        Medida: nuevaMaceta.MedidaID,
                        Forma: nuevaMaceta.FormaID,
                        Personalizada: true
                    },
                    headers: {
                        Authorization: 'Bearer ' + localStorage.getItem("token"),
                    }
                })
                .then(response => {
                    $q.notify({
                        message: 'Se ha agregado al carrito de compras',
                        color: 'primary'
                    })

                    $store.commit("carritocompras/addItem", {
                        cantidad: 1,
                        imagenMaceta: '-',
                        itemCarritoCompraID: response.data.payload.num,
                        macetaID: macetaID,
                        nombreColor: state.colores[state.color].nombreColor,
                        nombreForma: state.formas[state.forma].nombreForma,
                        nombreMaceta: nuevaMaceta.NombreMaceta,
                        nombreMaterial: state.materiales[state.material].nombreMaterial,
                        nombreMedida: state.medidas[state.medida].nombreMedida,
                        precio: nuevaMaceta.Precio,
                        personalizada: true
                    });

                })
                .catch(() => {
                    $q.notify({
                        message: 'No se pudo agregar al carrito de compras',
                        color: 'negative'
                    })
                })
        }

        return {
            state,
            formatter,
            changeView,
            selectOption,
            estatusCompleto,
            obtenerImagenUrl,
            agregarACarrito,
            selectMaceta
        }
    }
})
</script>

<style lang="scss" scoped>
#personalizacion-maceta {
    width: 100%;
    height: 38rem;
}

.header {
    display: flex;
    justify-content: space-between;
    align-items: center;

    .cotizado {
        font-size: 1.2rem;
    }
}

.nav {
    display: flex;
    justify-content: space-between;
    gap: 0.25rem;
    align-items: center;
    list-style: none;
    padding: 0;

    li {
        font-size: 1.2em;
        padding: 1.25rem 1em;
        background-color: #b6c1bd25;
        width: 100%;
        text-align: center;
        transition: all 0.3s ease;

        &.activo {
            background-color: #242626;
            color: #fff;
            font-weight: bold;
        }

        &:hover {
            font-weight: bold;
            cursor: pointer;
            transform: scale(1.03);
        }
    }

}

.content {
    display: grid;
    grid-template-columns: 1fr 1fr;

    .img-holder {
        display: flex;
        flex-flow: column nowrap;
        justify-content: top;
        align-items: center;
        padding: 1rem;
        padding-top: 0;

        img {
            margin-top: 30px;
            width: 45%;
            object-fit: cover;
        }
    }

    .opciones {
        .sub-opciones {
            display: grid;
            grid-template-columns: 1fr 1fr;

            .opcion {
                display: flex;
                flex-flow: column nowrap;
                gap: 0.5rem;
                align-items: center;
                padding: 2rem 1rem;
                font-size: 1.2em;
                transition: all 0.3s ease;
                border: 2px solid rgba(128, 128, 128, 0.075);
                border-radius: 2px;

                .circulo {
                    width: 3rem;
                    height: 3rem;
                    border-radius: 50%;
                    margin-bottom: 0.5rem;
                    box-shadow: 0 0 0.3rem rgba(0, 0, 0, 0.2);
                }

                &.seleccionada {
                    transform: scale(1.03);
                    background-color: rgba(0, 0, 0, 0.068);
                    font-weight: bold;
                }

                &:hover {
                    cursor: pointer;
                    transform: scale(1.03);
                    background-color: rgba(0, 0, 0, 0.068);
                }
            }
        }
    }
}

.disabled {
    background-color: rgba(177, 176, 176, 0.383);
    color: rgb(159, 158, 158);
    pointer-events: none;
}
</style>
