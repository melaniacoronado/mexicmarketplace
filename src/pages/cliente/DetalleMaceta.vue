<template>
<q-page class="flex flex-center">
    <div id="detalle-maceta">

        <div class="detalle">
            <div class="titulo">
                <q-btn icon="keyboard_backspace" color="primary" size="1.2rem" padding="0px 0px" flat @click="this.$router.push('/')" />
                <span class="nombre">{{state.maceta.nombreMaceta}}</span>
            </div>

            <div class="img-holder">
                <q-btn class="zoom" icon="zoom_out_map" color="white" text-color="primary" @click="expandirImagen()" />
                <img :src="state.maceta.imagenMaceta" id="main-image" alt="imagen maceta">
            </div>

            <div class="descripcion q-pt-md">
                <span>Descripción: </span>{{state.maceta.descripcion}}
            </div>
        </div>

        <div class="linea"></div>

        <div class="config-maceta">

            <div class="precio">{{formatter(state.maceta.precio)}} MXN</div>

            <div class="selector-colores">
                <label>Color</label>
                <div class="wrapper">
                    <div :id="`circulo-${color.colorId}`" class="circulo" v-for="(color, index) in state.colores" :key="index" :style="`background-color:#${color.codigoColor}`" @click="seleccionarColor(color.colorId)" />
                </div>
            </div>

            <!-- <div class="selector-medidas">
                <label>¿De qué tamaño?</label>
                <div class="wrapper">
                    <div :id="`medida-${medida.medidaID}`" class="medida" v-for="(medida, index) in state.medidas" :key="index" @click="seleccionarMedida(medida.medidaID)">
                        {{medida.nombreMedida}}
                    </div>
                </div>
            </div> -->

            <div class="cantidad">
                <label>Cantidad</label>
                <q-input filled dense v-model.number="state.cantidad" type="number" label="Cantidad" :rules="[ val => val > 0 || 'Ingrese un valor mayor a 0' ]" />
            </div>

            <div class="vendedor_contenedor">
                <label>Vendedor</label>
                <p class="vendedor">Armandoç Flores</p>
            </div>

            <q-btn color="primary" @click="agregarAlCarrito()" label="Agregar al carrito" padding="10px 5px" />
        </div>

    </div>
</q-page>
</template>

<script>
import {
    defineComponent,
    onMounted,
    computed,
    reactive
} from 'vue'
import {
    api
} from "boot/axios";
import {
    useRoute
} from 'vue-router'
import {
    useQuasar
} from 'quasar'
import {
    useStore
} from 'vuex'

export default defineComponent({
    name: 'DetalleMaceta',
    setup() {
        document.title = 'Detalle Maceta'

        const $q = useQuasar();
        const route = useRoute();
        const $store = useStore()
        const id = computed(() => route.params.id).value;

        const state = reactive({
            cantidad: null,
            maceta: {
                descripcion: "",
                imagenMaceta: "",
                macetaID: -1,
                nombreColor: "",
                nombreMaceta: "",
                nombreMaterial: "",
                precio: 0,
            },

            color: null,
            colores: [],

            medida: null,
            medidas: []
        });

        onMounted(async () => {
            //Obtener maceta, color y medida
            await api.get('/Color').then(res => state.colores = res.data.payload);
            await api.get('/Medida').then(res => state.medidas = res.data.payload);
            await api.get(`/Maceta/${id}`, {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem("token"),
                }
            }).then(res => state.maceta = res.data.payload);
        });

        //Formatear el precio
        function formatter(val) {
            return new Intl.NumberFormat('es-MX', {
                style: 'currency',
                currency: 'MXN',
                minimumFractionDigits: 2
            }).format(val);
        }

        //Zoom en la imagen
        function expandirImagen() {
            const overlay = document.createElement('div');
            overlay.innerHTML =
                `<div class="overlay">
                    <img src="${state.maceta.imagenMaceta}" alt="imagen maceta">
                </div>`;

            document.body.appendChild(overlay);

            overlay.addEventListener('click', () => document.body.removeChild(overlay));

            $q.notify({
                message: 'Da click en cualquier parte para salir',
                color: 'primary'
            })
        }

        //Selección del color para agregar efecto
        function seleccionarColor(colorId) {
            state.color = colorId;
            let circulo = document.getElementById(`circulo-${colorId}`);
            circulo.classList.add('selected');

            let circulos = document.querySelectorAll('.circulo');
            circulos.forEach(circulo => {
                if (circulo.id !== `circulo-${colorId}`)
                    circulo.classList.remove('selected');
            });
        }

        //Selección de la medida para agregar efecto
        function seleccionarMedida(medidaId) {
            state.medida = medidaId;
            let medida = document.getElementById(`medida-${medidaId}`);
            medida.classList.add('selected');

            let medidas = document.querySelectorAll('.medida');
            medidas.forEach(medida => {
                if (medida.id !== `medida-${medidaId}`)
                    medida.classList.remove('selected');
            });
        }

        //Agregar al carrito
        async function agregarAlCarrito() {
            //Validaciones
            if (state.color === null) {
                $q.notify({
                    message: 'Selecciona un color',
                    color: 'negative'
                })
                return;
            }

            state.medida = 1;

            if (state.medida === null) {
                $q.notify({
                    message: 'Selecciona una medida',
                    color: 'negative'
                })
                return;
            }

            if (state.cantidad === null) {
                $q.notify({
                    message: 'Ingresa una cantidad',
                    color: 'negative'
                })
                return;
            }

            if (!localStorage.getItem('clienteID')) {
                $q.notify({
                    message: 'Debes ingresar a tu cuenta para agregar al carrito',
                    color: 'primary'
                })
                return;
            }

            //POST del item al carrito de compras
            await api({
                    url: "/CarritoCompras/AgregarItem",
                    method: "POST",
                    data: {
                        ClienteID: localStorage.getItem('clienteID'),
                        MacetaID: state.maceta.macetaID,
                        Cantidad: state.cantidad,
                        Color: state.color,
                        Medida: state.medida,
                        Forma: -1,
                        Personalizada: false
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

                    let nuevaMaceta = {
                        cantidad: state.cantidad,
                        imagenMaceta: state.maceta.imagenMaceta,
                        itemCarritoCompraID: response.data.payload.num,
                        macetaID: state.maceta.macetaID,
                        nombreColor: state.colores.find(color => color.colorId == state.color).nombreColor,
                        nombreForma: '-',
                        nombreMaceta: state.maceta.nombreMaceta,
                        nombreMaterial: state.maceta.nombreMaterial,
                        nombreMedida: state.medidas.find(medida => medida.medidaID == state.medida).nombreMedida,
                        precio: state.maceta.precio,
                        personalizada: false
                    };

                    $store.commit("carritocompras/addItem", nuevaMaceta);

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
            expandirImagen,
            seleccionarColor,
            seleccionarMedida,
            agregarAlCarrito
        }
    }
})
</script>

<style lang="scss" scoped>
#detalle-maceta {
    display: grid;
    grid-template-columns: 1fr 0.1fr 1fr;
    gap: 1rem;
    border: 2px solid rgba(204, 204, 204, 0.336);
    border-radius: 10px;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
    padding: 3rem;
}

.detalle {
    .titulo {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        margin-bottom: 1rem;

        .nombre {
            font-size: 1.5rem;
            font-weight: bold;
        }
    }

    .img-holder {
        display: flex;
        flex-flow: column nowrap;

        .zoom {
            width: 2rem;
            align-self: flex-end;
            position: absolute;
            margin: 0.5rem;
            opacity: 0.6;
            transition: all 0.3s ease;

            &:hover {
                opacity: 1;
            }
        }

        img {
            border-radius: 10px;
            width: auto;
            max-width: 30rem;
            height: auto;
            max-height: 18rem;
            object-fit: cover;
        }
    }

    .descripcion {
        font-size: 1.1rem;
        color: grey;
        width: 20rem;

        span {
            font-weight: bold;
        }
    }

}

.linea {
    display: flex;
    justify-self: center;
    width: 2px;
    height: 100%;
    border-radius: 100%;
    background-color: #e0e0e075;
}

.config-maceta {
    display: flex;
    flex-flow: column nowrap;
    gap: 1rem;

    label {
        font-size: 1.2rem;
        font-weight: bold;
    }

    .selector-colores {
        .wrapper {
            display: flex;
            gap: 0.5rem;

            .circulo {
                width: 1.8rem;
                height: 1.8rem;
                border-radius: 50%;
                box-shadow: 0 0 0.5rem rgba(0, 0, 0, 0.267);
                transition: all 0.2s ease-in-out;

                &:hover {
                    cursor: pointer;
                    transform: scale(1.1);
                    box-shadow: 0 0 0.5rem rgba(0, 0, 0, 0.567);
                }
            }

            .selected {
                transform: scale(1.1);
                box-shadow: 0 0 0.5rem rgba(0, 0, 0, 0.637);
            }
        }
    }

    .selector-medidas {
        .wrapper {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            grid-template-rows: 1fr 1fr 1fr;
            gap: 0.5rem;

            .medida {
                display: flex;
                flex-flow: column nowrap;
                justify-content: center;
                align-items: center;
                background-color: #f4f4f4;
                padding: 0.25rem 0.5rem;
                border-radius: 10px;
                transition: all 0.2s ease-in-out;

                &:hover {
                    cursor: pointer;
                    transform: scale(1.025);
                    box-shadow: 0 0 0.5rem rgba(0, 0, 0, 0.418);
                }
            }

            .selected {
                transform: scale(1.025);
                box-shadow: 0 0 0.5rem rgba(0, 0, 0, 0.418);
            }
        }
    }

    .precio {
        font-size: 1.5rem;
        color: grey;
        font-weight: bold;
    }

    .vendedor_contenedor {
        font-size: 1.2rem;
        font-weight: bold;
        .vendedor {
            color: grey;
        }
    }
}
</style>
