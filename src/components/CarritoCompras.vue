<template>
<q-btn flat color="primary" text-color="white" icon="shopping_cart">
    <div class="num-items">{{ state.macetas.length }}</div>

    <q-menu class="carrito-compras">
        <div class="column no-wrap q-pa-md">
            <div class="column text-center">
                <div class="text-h6 text-primary text-bold q-mb-md">Tu carrito de compras</div>
            </div>

            <q-separator inset class="q-mx-lg q-mb-sm" />

            <div class="lista-macetas" v-for="(maceta, index) in state.macetas" :key="index">

                <div class="maceta">
                    <div class="indicador-numerico text-bold bg-primary">{{ index + 1 }}</div>

                    <div class="info-maceta">
                        <div class="titulo text-primary text-bold">{{ maceta.nombreMaceta }}</div>
                        <div class="precio">{{ formatter(maceta.precio) }} MXN</div>
                        <div class="text-subtitle2 text-white selector-piezas">
                            <q-btn :icon="maceta.cantidad == 1 ? 'delete' : 'remove'" round color="grey" size="xs" @click="eliminarPieza(maceta.itemCarritoCompraID)" />
                            <span class="piezas text-grey">{{ maceta.cantidad }}</span>
                            <q-btn icon="add" round color="grey" size="xs" @click="agregarPieza(maceta.itemCarritoCompraID)" />
                        </div>
                    </div>

                    <div class="column items-center">
                        <q-avatar size="72px" class="foto-maceta" @click="$router.push(`/producto/${maceta.macetaID}`)">
                            <img :src="maceta.imagenMaceta == '-' ? obtenerImagenUrl(maceta.nombreMaterial, maceta.nombreColor, maceta.nombreForma) : maceta.imagenMaceta" alt="imagen maceta">
                        </q-avatar>
                        <q-icon flat color="grey" name="info" size="xs">
                            <q-tooltip class="info-maceta">
                                <div class="atributos">
                                    <div class="atributo" v-if="maceta.nombreMaterial != '-'">Material: {{ maceta.nombreMaterial }}</div>
                                    <div class="atributo" v-if="maceta.nombreForma != '-'">Forma: {{ maceta.nombreForma }}</div>
                                    <div class="atributo" v-if="maceta.nombreColor != '-'">Color: {{ maceta.nombreColor }}</div>
                                    <!-- <div class="atributo" v-if="maceta.nombreMedida != '-'">Medidas: {{ maceta.nombreMedida }}</div> -->
                                </div>
                            </q-tooltip>
                        </q-icon>

                    </div>

                    <q-btn icon="delete" class="text-primary no-padding" size="md" @click="eliminarItem(maceta.itemCarritoCompraID)" />

                </div>

                <q-separator inset class="q-mx-lg q-my-sm" />

            </div>

            <div class="mensaje column items-center text-grey text-subtitle1" v-if="state.macetas.length == 0">No hay nada agregado <br /> a tu carrito de compras</div>

            <div class="costo-total q-mt-md q-mb-xs text-black text-right"><span class="text-bold">Total: </span>{{ formatter($store.getters["carritocompras/getTotal"]) }} MXN</div>

            <q-btn label="Pagar ahora" color="primary" :disabled="state.macetas.length == 0" @click="$router.push('/checkout')" />

        </div>
    </q-menu>
</q-btn>
</template>

<script>
import {
    defineComponent,
    reactive,
    onMounted
} from "vue";
import {
    api
} from "boot/axios";
import {
    useQuasar
} from "quasar";
import {
    useStore
} from 'vuex'

export default defineComponent({
    name: "CarritoCompras",
    setup() {
        const $q = useQuasar();
        const $store = useStore()

        const state = reactive({
            sesionActiva: false,
            macetas: [],
            total: 0
        });

        onMounted(async () => {
            state.sesionActiva = localStorage.getItem("clienteID") !== null;

            if (!state.sesionActiva)
                return;

            //Obtener items del carrito de compras
            let items = $store.getters["carritocompras/getItems"];

            if (items.length == 0)
                await api.get(`/CarritoCompras/${localStorage.getItem("clienteID")}`, {
                    headers: {
                        Authorization: 'Bearer ' + localStorage.getItem("token"),
                    }
                })
                .then(response => {
                    state.macetas = response.data.payload
                    $store.commit("carritocompras/setItems", response.data.payload);
                });
            else
                state.macetas = items;

            //Obtener calculo del total del carrito de compras
            let calculo = $store.getters["carritocompras/getTotal"];
            state.total = calculo;
        });

        //Formatear el precio
        function formatter(val) {
            return new Intl.NumberFormat('es-MX', {
                style: 'currency',
                currency: 'MXN',
                minimumFractionDigits: 2
            }).format(val);
        }

        //Agregar item al carrito de compras
        async function agregarPieza(itemCarritoCompraID) {
            $store.commit("carritocompras/agregarPieza", itemCarritoCompraID);

            state.total = $store.getters["carritocompras/getTotal"];

            let cantidad = state.macetas.find(m => m.itemCarritoCompraID === itemCarritoCompraID).cantidad
            await api.post(`/CarritoCompras/ModifcarItem/${itemCarritoCompraID}/${cantidad}`, {}, {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem("token"),
                }
            });
        }

        //Modificar item del carrito de compras
        async function eliminarPieza(itemCarritoCompraID) {
            let maceta = state.macetas.find(maceta => maceta.itemCarritoCompraID === itemCarritoCompraID);

            $store.commit("carritocompras/quitarPieza", itemCarritoCompraID);

            state.total = $store.getters["carritocompras/getTotal"];

            await api.post(`/CarritoCompras/ModifcarItem/${itemCarritoCompraID}/${maceta.cantidad}`, {}, {
                    headers: {
                        Authorization: 'Bearer ' + localStorage.getItem("token"),
                    }
                })
                .then(() => {
                    if (maceta.cantidad == 0) {
                        $store.commit("carritocompras/deleteItem", itemCarritoCompraID);
                        state.macetas = state.macetas.filter(m => m.itemCarritoCompraID !== itemCarritoCompraID);
                        // location.reload();
                    }
                });
        }

        //Eliminar item del carrito de compras
        function eliminarItem(itemCarritoCompraID) {
            //Mensaje de confirmacion
            $q.dialog({
                title: 'Eliminar',
                message: '¿Está seguro que desea eliminar el producto?',
                ok: {
                    push: true,
                    label: "Aceptar",
                    color: "primary",
                    flat: true
                },
                cancel: {
                    label: "Cancelar",
                    color: "grey",
                    flat: true
                },
                persistent: true
            }).onOk(async () => {
                await api.post(`/CarritoCompras/ModifcarItem/${itemCarritoCompraID}/0`, {}, {
                        headers: {
                            Authorization: 'Bearer ' + localStorage.getItem("token"),
                        }
                    })
                    .then(() => {
                        $store.commit("carritocompras/deleteItem", itemCarritoCompraID);
                        state.macetas = state.macetas.filter(m => m.itemCarritoCompraID !== itemCarritoCompraID);
                        // location.reload();
                    });

                state.total = $store.getters["carritocompras/getTotal"];
            });

        }

        //Obtener imagen correcta de la maceta personalizada
        function obtenerImagenUrl(material, color, forma) {

            if (material == 'Fibra de vidrio' && (forma == '' || forma == 'Copa') && (color == '' || color == 'Blanco'))
                return require('../assets/macetas_personalizadas/copa_blanco.png');

            if (material == 'Fibra de vidrio' && (forma == '' || forma == 'Copa') && (color == '' || color == 'Amarillo'))
                return require('../assets/macetas_personalizadas/copa_amarillo.png');

            if (material == 'Fibra de vidrio' && (forma == '' || forma == 'Copa') && (color == '' || color == 'Azul'))
                return require('../assets/macetas_personalizadas/copa_azul.png');

            if (material == 'Fibra de vidrio' && (forma == '' || forma == 'Copa') && (color == '' || color == 'Gris'))
                return require('../assets/macetas_personalizadas/copa_gris.png');

            if (material == 'Fibra de vidrio' && (forma == '' || forma == 'Copa') && (color == '' || color == 'Morado'))
                return require('../assets/macetas_personalizadas/copa_morado.png');

            if (material == 'Fibra de vidrio' && (forma == '' || forma == 'Copa') && (color == '' || color == 'Naranja'))
                return require('../assets/macetas_personalizadas/copa_naranja.png');

            if (material == 'Fibra de vidrio' && (forma == '' || forma == 'Copa') && (color == '' || color == 'Negro'))
                return require('../assets/macetas_personalizadas/copa_negro.png');

            if (material == 'Fibra de vidrio' && (forma == '' || forma == 'Copa') && (color == '' || color == 'Rojo'))
                return require('../assets/macetas_personalizadas/copa_rojo.png');

            if (material == 'Fibra de vidrio' && (forma == '' || forma == 'Copa') && (color == '' || color == 'Rosa'))
                return require('../assets/macetas_personalizadas/copa_rosa.png');

            if (material == 'Fibra de vidrio' && (forma == '' || forma == 'Copa') && (color == '' || color == 'Verde'))
                return require('../assets/macetas_personalizadas/copa_verde.png');

            // Reloj

            if (material == 'Fibra de vidrio' && (forma == 'Reloj') && (color == '' || color == 'Blanco'))
                return require('../assets/macetas_personalizadas/reloj_blanco.png');

            if (material == 'Fibra de vidrio' && (forma == 'Reloj') && (color == '' || color == 'Amarillo'))
                return require('../assets/macetas_personalizadas/reloj_amarillo.png');

            if (material == 'Fibra de vidrio' && (forma == 'Reloj') && (color == '' || color == 'Azul'))
                return require('../assets/macetas_personalizadas/reloj_azul.png');

            if (material == 'Fibra de vidrio' && (forma == 'Reloj') && (color == '' || color == 'Gris'))
                return require('../assets/macetas_personalizadas/reloj_gris.png');

            if (material == 'Fibra de vidrio' && (forma == 'Reloj') && (color == '' || color == 'Morado'))
                return require('../assets/macetas_personalizadas/reloj_morado.png');

            if (material == 'Fibra de vidrio' && (forma == 'Reloj') && (color == '' || color == 'Naranja'))
                return require('../assets/macetas_personalizadas/reloj_naranja.png');

            if (material == 'Fibra de vidrio' && (forma == 'Reloj') && (color == '' || color == 'Negro'))
                return require('../assets/macetas_personalizadas/reloj_negro.png');

            if (material == 'Fibra de vidrio' && (forma == 'Reloj') && (color == '' || color == 'Rojo'))
                return require('../assets/macetas_personalizadas/reloj_rojo.png');

            if (material == 'Fibra de vidrio' && (forma == 'Reloj') && (color == '' || color == 'Rosa'))
                return require('../assets/macetas_personalizadas/reloj_rosa.png');

            if (material == 'Fibra de vidrio' && (forma == 'Reloj') && (color == '' || color == 'Verde'))
                return require('../assets/macetas_personalizadas/reloj_verde.png');

            // Mármol cudrado
            if (material == 'Mármol' && (forma == '' || forma == 'Cuadrangular') && (color == '' || color == 'Blanco'))
                return require('../assets/macetas_personalizadas/cuadrado_blanco.png');
            if (material == 'Mármol' && (forma == '' || forma == 'Cuadrangular') && (color == '' || color == 'Negro'))
                return require('../assets/macetas_personalizadas/cuadrado_negro.png');
            if (material == 'Mármol' && (forma == '' || forma == 'Cuadrangular') && (color == '' || color == 'Gris'))
                return require('../assets/macetas_personalizadas/cuadrado_gris.png');

            // Mármol rectángulo

            if (material == 'Mármol' && (forma == 'Rectangular') && (color == '' || color == 'Blanco'))
                return require('../assets/macetas_personalizadas/rectangulo_blanco.png');
            if (material == 'Mármol' && (forma == 'Rectangular') && (color == '' || color == 'Negro'))
                return require('../assets/macetas_personalizadas/rectangulo_negro.png');
            if (material == 'Mármol' && (forma == 'Rectangular') && (color == '' || color == 'Gris'))
                return require('../assets/macetas_personalizadas/rectangulo_gris.png');

            // Mármol cilindro
            if (material == 'Mármol' && (forma == 'Cilíndrica') && (color == '' || color == 'Blanco'))
                return require('../assets/macetas_personalizadas/cilindro_blanco.png');
            if (material == 'Mármol' && (forma == 'Cilíndrica') && (color == '' || color == 'Negro'))
                return require('../assets/macetas_personalizadas/cilindro_negro.png');
            if (material == 'Mármol' && (forma == 'Cilíndrica') && (color == '' || color == 'Gris'))
                return require('../assets/macetas_personalizadas/cilindro_gris.png');

            return require('../assets/macetas_personalizadas/copa_blanco.png');
        }

        return {
            state,
            formatter,
            agregarPieza,
            eliminarPieza,
            eliminarItem,
            obtenerImagenUrl
        };
    },
});
</script>

<style lang="scss" scoped>
.costo-total {
    font-size: 1.09rem;
}

.maceta {
    display: grid;
    grid-template-columns: repeat(4, auto);
    align-items: center;
    justify-items: center;
    gap: 1rem;
    border-radius: 5px;
    padding: 1rem;

    .foto-maceta {
        cursor: pointer;
    }

    .info-maceta {
        display: flex;
        flex-flow: column wrap;
        gap: 0.25rem;
        align-items: flex-start;

        .titulo {
            font-weight: bold;
        }
    }

    .indicador-numerico {
        border-radius: 50%;
        width: 1.5rem;
        height: 1.5rem;
        color: white;
        display: flex;
        justify-content: center;
        align-items: center;

    }

    .selector-piezas {
        display: flex;
        justify-content: space-between;
        align-items: center;

        .piezas {
            margin: 0 0.4rem;
        }
    }

    &:hover {
        background-color: #f5f5f5;
    }
}
</style>
