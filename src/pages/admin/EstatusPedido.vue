<template>
<q-page>
    <div class="tools q-pb-xl">
        <div class="header">
            <div class="titulo">Información del pedido #{{ state.ordenCompraID }}</div>
            <q-btn flat color="primary" label="Regresar" @click="this.$router.push('/pedidos')" />
        </div>
    </div>

    <div id="estatus-pagina">

        <div class="content">

            <div class="seguimiento">
                <h4 class="text-primary no-padding">Actualizaciones</h4>
                <div class="figura">
                    <div class="circulo">
                        <q-icon :name="state.procesada == 1 ? 'check' : 'circle'" :size="state.procesada ? '50px' : '30px'" />
                    </div>

                    <div class="linea"></div>

                    <div class="circulo">
                        <q-icon :name="state.fabricada == 1 ? 'check' : 'circle'" :size="state.fabricada ? '50px' : '30px'" />
                    </div>

                    <div class="linea"></div>

                    <div class="circulo">
                        <q-icon :name="state.enviada == 1 ? 'check' : 'circle'" :size="state.enviada ? '50px' : '30px'" />
                    </div>

                    <div class="linea"></div>

                    <div class="circulo">
                        <q-icon :name="state.entregada == 1 ? 'check' : 'circle'" :size="state.entregada ? '50px' : '30px'" />
                    </div>

                    <div class="fecha procesada"><b>Procesada </b><span>{{ state.fechaProcesada ? formatter(state.fechaProcesada) : 'pendiente' }}</span></div>
                    <div class="fecha fabricada"><b>Fabricada </b><span>{{ state.fechaFabricada ? formatter(state.fechaFabricada) : 'pendiente' }}</span></div>
                    <div class="fecha enviada"><b>Enviada </b><span>{{ state.fechaEnviada ? formatter(state.fechaEnviada) : 'pendiente' }}</span></div>
                    <div class="fecha entregada"><b>Entregado </b><span>{{ state.fechaEntregada ? formatter(state.fechaEntregada) : 'pendiente' }}</span></div>
                </div>
            </div>

            <div class="actualizar-estatus">
                <h4 class="text-primary no-padding">Actualizar estatus</h4>
                <div class="opciones">
                    <q-select filled dense v-model="state.estatusSeleccionado" :options="tiposEstatus" label="Estatus" />
                    <q-input dense v-model="state.nuevaFecha" filled type="date" />
                    <q-btn color="primary" label="Actualizar" @click="cambiarEstatus()" :disabled="state.estatusSeleccionado == null" />
                </div>
            </div>

        </div>

    </div>

</q-page>
</template>

<script>
import {
    defineComponent,
    reactive,
    computed,
    onMounted
} from "vue";
import {
    useRoute
} from "vue-router";
import {
    api
} from "boot/axios"

export default defineComponent({
    name: "EstatusPedido",
    name: "PageIndex",

    setup() {
        const route = useRoute();
        const id = computed(() => route.params.id).value;

        let tiposEstatus = [{
                value: 1,
                label: "Fabricada"
            },
            {
                value: 2,
                label: "Enviada"
            },
            {
                value: 3,
                label: "Entregada"
            }
        ];

        const state = reactive({
            ordenCompraID: id,

            procesada: false,
            fechaProcesada: null,

            fabricada: false,
            fechaFabricada: null,

            enviada: false,
            fechaEnviada: null,

            entregada: false,
            fechaEntregada: null,

            estatusSeleccionado: null,
            nuevaFecha: null,

        });

        //Formatear la fecha
        function formatter(fecha) {
            if (fecha == null) return null;

            let date = new Date(fecha);
            date.setDate(date.getDate() + 1);

            let day = date.getDate();
            let year = date.getFullYear();
            let month = date.getMonth() + 1;

            if (day < 10) day = "0" + day;
            if (month < 10) month = "0" + month;

            return day + "-" + month + "-" + year;

        }

        //Cargar orden de compra
        async function cargarOrdenesCompra() {
            await api.get(`/OrdenCompra/${id}`, {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem("token"),
                }
            }).then(response => {
                state.procesada = response.data.payload.procesada;
                state.fechaProcesada = response.data.payload.fechaProcesada.split("T")[0];

                state.fabricada = response.data.payload.fabricada;
                state.fechaFabricada = response.data.payload.fechaFabricada == undefined ? null : response.data.payload.fechaFabricada.split("T")[0];

                state.enviada = response.data.payload.enviada;
                state.fechaEnviada = response.data.payload.fechaEnviada == undefined ? null : response.data.payload.fechaEnviada.split("T")[0];

                state.entregada = response.data.payload.entregada;
                state.fechaEntregada = response.data.payload.fechaEntregada == undefined ? null : response.data.payload.fechaEntregada.split("T")[0];

            })
        }

        onMounted(async () => {
            cargarOrdenesCompra();
        });

        //Cambiar estatus
        async function cambiarEstatus() {
            if (state.estatusSeleccionado == null) return;
            if (state.nuevaFecha == null) return;

            let fecha = state.nuevaFecha;

            switch (state.estatusSeleccionado.value) {
                case 0:
                    state.procesada = true;
                    state.fechaProcesada = fecha;
                    break;
                case 1:
                    state.fabricada = true;
                    state.fechaFabricada = fecha;
                    break;
                case 2:
                    state.enviada = true;
                    state.fechaEnviada = fecha;
                    break;
                case 3:
                    state.entregada = true;
                    state.fechaEntregada = fecha;
                    break;
            }

            //PUT de la orden de compra
            await api({
                url: `/OrdenCompra`,
                method: "PUT",
                data: {
                    OrdenCompraID: parseInt(id),
                    FechaProcesada: state.fechaProcesada,
                    FechaFabricada: state.fechaFabricada,
                    FechaEnviada: state.fechaEnviada,
                    FechaEntregada: state.fechaEntregada,
                    Procesada: state.procesada,
                    Fabricada: state.fabricada,
                    Enviada: state.enviada,
                    Entregada: state.entregada
                },
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem("token"),
                }
            });

        }

        return {
            state,
            tiposEstatus,
            cambiarEstatus,
            formatter

        };
    },
});
</script>

<style lang="scss" scoped>
@import '../../css/quasar.variables.scss';

#estatus-pagina {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-top: 5vh;
}

.content {
    display: flex;
    flex-flow: column nowrap;
    align-items: flex-start;
    border-radius: 5px;
    box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.329);
    padding: 2rem 3rem;

    h4 {
        margin: 0;
        margin-bottom: 1rem;
    }
}

.figura {
    display: grid;
    grid-template-rows: 1fr 0.8fr;
    grid-template-columns: repeat(7, 1fr);
    align-items: center;

    .circulo {
        width: 7rem;
        height: 7rem;
        border-radius: 50%;
        background-color: $primary;
        display: flex;
        justify-content: center;
        align-items: center;
        color: white;
    }

    .linea {
        width: 100%;
        height: 1.4rem;
        background-color: $primary;
        position: relative;

    }

    .fecha {
        display: flex;
        flex-flow: column nowrap;
        align-items: center;
        font-size: 1rem;

        span {
            color: grey;
        }
    }

    .fabricada {
        grid-column: 3;
    }

    .enviada {
        grid-column: 5;
    }

    .entregada {
        grid-column: 7;
    }

}

.actualizar-estatus {
    align-self: flex-start;
    margin-top: 1rem;

    .opciones {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        grid-gap: 1rem;
    }
}
</style>
