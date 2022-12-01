<template>
<div class="pago">

    <div class="column items-center q-pt-md" id="paypal-button-container">

    </div>

</div>
</template>

<script>
import {
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
    loadScript
} from '@paypal/paypal-js';
import {
    useRouter
} from "vue-router";
import {
    useStore
} from 'vuex'

export default {
    name: "MetodoPago",
    props: ['total'],
    setup(props) {

        const $q = useQuasar();
        const router = useRouter();
        const $store = useStore()
        const delay = ms => new Promise(res => setTimeout(res, ms));

        const state = reactive({
            total: "",
            items: [],
            ordenCompraID: 0,
        });

        onMounted(async () => {

            $q.loading.show();

            state.total = props.total;

            //Procesar pago mediante PayPal
            const paypalSdk = await loadScript({
                'client-id': 'AR77H3Rd2gajALUvBwgK9oI2fowfXhgIWfIrmOf_EXmLtjNTwPlFt-T71E2uel196bBIKyfX8nzO21Ij',
                currency: 'MXN',
                locale: 'es_MX',
            });
            //Desplegar botones de pago
            paypalSdk.Buttons({
                createOrder: function (data, actions) {
                    return actions.order.create({
                        purchase_units: [{
                            amount: {
                                value: state.total
                            }
                        }]
                    });
                },
                //Al aprobarse la transacción
                onApprove: function (data, actions) {
                    $q.loading.show();
                    return actions.order.capture().then(function (details) {
                        localStorage.setItem("idTransaccion", details.id);
                        //Agregar orden de compra a la BD
                        agregarOrdenCompra();
                        setTimeout(function () {
                            //Mandar notificación al administrador
                            mandarNotificacionAdmin();
                        }, 5000);
                        localStorage.removeItem("direccionID");
                        //Vaciar el carrtio
                        eliminarCarrito();
                        //Delay de 8 segundos para que se puedan hacer todos los movimientos de la transaccion
                        setTimeout(function () {
                            $q.loading.hide();
                            //Redirigir a la página de confirmación de compra
                            location.replace('/confirmacion_compra');
                        }, 8000);
                    }).catch(function (err) {
                        alert("Error");
                    });
                },

                onError: function (err, actions) {
                    alert("Error");
                }

            }).render('#paypal-button-container');

            $q.loading.hide();

            //Obtener los items del carrito
            await api.get(`/CarritoCompras/Int/${localStorage.getItem("clienteID")}`, {
                    headers: {
                        Authorization: 'Bearer ' + localStorage.getItem("token"),
                    }
                })
                .then(response => {
                    response.data.payload.forEach(element => {
                        state.items.push({
                            macetaID: element.macetaID,
                            cantidad: element.cantidad,
                            color: element.color,
                            medida: element.medida,
                            forma: element.forma,
                            personalizada: element.personalizada,
                        });
                    });
                });

        });

        async function agregarOrdenCompra() {
            //Subir orden compra
            var clienteID = localStorage.getItem("clienteID");
            var direccionID = localStorage.getItem("direccionID");
            var total = parseFloat(state.total).toFixed(2);
            var transaccionID = localStorage.getItem("idTransaccion");
            api.post("/Checkout/OrdenCompra", {
                clienteId: clienteID,
                direccionId: direccionID,
                total: total,
                transaccionId: transaccionID
            }, {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem("token"),
                }
            }).then(response => {
                //Subir item orden compra
                state.ordenCompraID = response.data.payload.ordenCompraID;
                state.items.forEach(element => {
                    api.post("/Checkout/ItemOrdenCompra", {
                        ordenCompraId: state.ordenCompraID,
                        macetaId: element.macetaID,
                        cantidad: element.cantidad,
                        color: element.color,
                        medida: element.medida,
                        forma: element.forma,
                        personalizada: element.personalizada,
                    }, {
                        headers: {
                            Authorization: 'Bearer ' + localStorage.getItem("token"),
                        }
                    });

                });
            });

        }

        //Para vaciar el carrito
        async function eliminarCarrito() {
            api.delete(`/CarritoCompras/${localStorage.getItem("clienteID")}`, {
                    headers: {
                        Authorization: 'Bearer ' + localStorage.getItem("token"),
                    }
                })
                .then(response => {
                    $store.commit('carritocompras/setItems', []);
                });
        }

        //Mandar notificación al administrador
        async function mandarNotificacionAdmin() {
            api.post("/Checkout/NotificacionAdmin/" + state.ordenCompraID, {},{
                    headers: {
                        Authorization: 'Bearer ' + localStorage.getItem("token"),
                    }
                })
                .then(response => {});
        }

        return {
            state,
            eliminarCarrito
        }

    }

}
</script>

<style lang="scss" scoped>
.form-holder {
    padding: 0;
    margin: 0;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    .content {
        display: grid;
        width: 50rem;
        grid-template-columns: 1fr 1fr;
        grid-gap: 0 0.7rem;

        .botones {
            grid-column: 1/-1;
            display: flex;
            gap: 0.7rem;
        }
    }
}

.pago {
    display: grid;
    align-items: center;
}

.paypal-button-container {
    width: 50%;
}
</style>
