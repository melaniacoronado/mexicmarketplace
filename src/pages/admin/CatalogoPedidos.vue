<template>
<q-page>
    <div class="tools q-pb-xl">
        <div class="titulo">Gestión de pedidos</div>
    </div>

    <div class="indicadores row q-pt-xl q-gutter-xl">
        <q-card flat bordered class="my-card">
            <q-card-section>
                <div class="text-h6">{{state.procesados}}</div>
            </q-card-section>

            <q-card-section class="q-pt-none">
                Pedidos procesados
            </q-card-section>
        </q-card>

        <q-card flat bordered class="my-card">
            <q-card-section>
                <div class="text-h6">{{state.fabricados}}</div>
            </q-card-section>

            <q-card-section class="q-pt-none">
                Pedidos fabricados
            </q-card-section>
        </q-card>

        <q-card flat bordered class="my-card">
            <q-card-section>
                <div class="text-h6">{{state.enviados}}</div>
            </q-card-section>

            <q-card-section class="q-pt-none">
                Pedidos enviados
            </q-card-section>
        </q-card>

        <q-card flat bordered class="my-card">
            <q-card-section>
                <div class="text-h6">{{state.entregados}}</div>
            </q-card-section>

            <q-card-section class="q-pt-none">
                Pedidos entregados
            </q-card-section>
        </q-card>

        <q-card flat bordered class="my-card">
            <q-card-section>
                <div class="text-h6">{{state.ventas}}</div>
            </q-card-section>

            <q-card-section class="q-pt-none">
                ventas en el último mes
            </q-card-section>
        </q-card>

    </div>

    <div class="q-pt-xl">
        <TablaPedidos />
    </div>

</q-page>
</template>

<script>
import {
    defineComponent
} from 'vue'
import TablaPedidos from "components/tablas/TablaPedidos.vue";
import {
    reactive
} from "@vue/reactivity";
import {
    onMounted,
    onUnmounted
} from '@vue/runtime-core';
import {
    api
} from "boot/axios";

export default defineComponent({
    name: 'CatalogoPedidos',
    components: {
        TablaPedidos,
    },
    setup() {
        document.title = "Gestión de pedidos";

        const state = reactive({
            procesados: 0,
            fabricados: 0,
            enviados: 0,
            entregados: 0,
            ventas: 0
        });

        // Refresh pagina cada 5 minutos
        const timer = setTimeout(() => {
            window.location.reload(1);
        }, 30000);

        onMounted(async () => {
            //Cargar indicadores
            await api.get('/OrdenCompra/IndicadorProcesados', {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem("token"),
                }
            }).then(response => {
                state.procesados = response.data.payload.num;
            });

            await api.get('/OrdenCompra/IndicadorFabricados', {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem("token"),
                }
            }).then(response => {
                state.fabricados = response.data.payload.num;
            });

            await api.get('/OrdenCompra/IndicadorEnviados', {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem("token"),
                }
            }).then(response => {
                state.enviados = response.data.payload.num;
            });

            await api.get('/OrdenCompra/IndicadorEntregados', {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem("token"),
                }
            }).then(response => {
                state.entregados = response.data.payload.num;
            });

            await api.get('/OrdenCompra/IndicadorVentasMes', {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem("token"),
                }
            }).then(response => {
                state.ventas = response.data.payload.num;
            });

            timer;
        });

        onUnmounted(async () => {
            clearTimeout(timer);
        });

        return {
            state
        }
    }
})
</script>

<style lang="scss" scoped>
h2 {
    margin: 0;
    padding: 0;
    margin-top: 1rem;
    font-weight: 400;
}

.indicadores {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
}

.my-card {
    width: 100%;
    max-width: 200px;
    align-items: center;
}
</style>
