<template>
<q-page>
    <div class="tools q-pb-xl">
        <div class="header">
            <div class="titulo">Checkout</div>
        </div>
    </div>

    <div class="q-pa-md">
        <q-stepper v-model="state.step" header-nav ref="stepper" color="primary" animated>

            <!-- Paso 1: Información de pedido -->
            <q-step :name="1" title="Información del pedido" icon="description" :done="state.step > 1" :header-nav="state.step > 1">
                <div class="titulo-seguimiento">
                    <h4 class="titulo-confirmacion">Revisa tu compra</h4>
                </div>
                <div class="dos-columnas">
                    <InformacionPedido @precioCalculado="asignarTotal($event)" />
                    <Total v-if="state.totalListo" :total="state.total" />
                </div>

                <q-stepper-navigation class="fit row justify-center q-pb-md">
                    <q-btn @click="() => { done1 = true; state.step = 2 }" color="primary" label="Continuar" />
                </q-stepper-navigation>
            </q-step>

            <!-- Paso 2: Información de envío -->
            <q-step :name="2" title="Dirección de envío" icon="local_shipping" :done="state.step > 2" :header-nav="state.step > 2">
                <div class="titulo-seguimiento">
                    <h4 class="titulo-confirmacion">Ingresa la información de envío</h4>
                </div>
                <DireccionEnvio @infoDireccionCompleta="imprimirState($event)" />

                <q-stepper-navigation class="fit row justify-center q-pb-md">
                    <q-btn flat @click="state.step = 1" color="primary" label="Regresar" class="q-ml-sm" />
                    <q-btn :disabled="state.continuar" @click="() => { done2 = true; state.step = 3 }" color="primary" label="Continuar" />
                </q-stepper-navigation>
            </q-step>

            <!-- Paso 3: Información de pago -->
            <q-step :name="3" title="Método de pago" icon="payment" :done="state.step > 3" :header-nav="state.step > 3">
                <h4 class="titulo-confirmacion">Ingresa la información de pago</h4>
                <div class="dos-columnas">
                    <MetodoPago :total="state.total" />
                    <Total v-if="state.totalListo" :total="state.total" />
                </div>

                <q-stepper-navigation class="fit row justify-center q-pb-md">
                    <q-btn flat @click="state.step = 2" color="primary" label="Regresar" class="q-ml-sm" />
                </q-stepper-navigation>

            </q-step>

        </q-stepper>
    </div>

</q-page>
</template>

<script>
import {
    reactive,
    onUnmounted
} from 'vue'
import InformacionPedido from 'components/InformacionPedido.vue'
import DireccionEnvio from 'components/DireccionEnvio.vue'
import MetodoPago from 'components/MetodoPago.vue'
import Total from 'components/Total.vue'

export default {
    name: 'Checkout',
    components: {
        InformacionPedido,
        DireccionEnvio,
        MetodoPago,
        Total
    },
    setup() {
        document.title = 'Checkout'
        const state = reactive({
            step: 1,
            total: 0,
            continuar: true,
            totalListo: false
        })

        window.addEventListener('unload', localStorage.removeItem("direccionID"));

        onUnmounted(async () => {
            localStorage.removeItem("direccionID")
        });

        function imprimirState(a) {
            state.continuar = a;
        }

        function asignarTotal(a) {
            state.total = a;
            state.totalListo = true;
        }

        return {
            state,
            imprimirState,
            asignarTotal
        }
    }
}
</script>

<style lang="scss" scoped>
.dos-columnas {
    display: grid;
    grid-template-columns: 65% 35%;
    grid-gap: 30px;

}

.titulo-confirmacion {
    padding-top: 0%;
    font-size: 25px;
    font-weight: bold;
    text-align: center;
    margin: 0%;
}

.titulo-seguimiento {
    padding: 0%;
    padding-bottom: 25px;
}
</style>
