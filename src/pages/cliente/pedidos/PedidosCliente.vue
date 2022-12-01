<template>
<q-page class="q-gutter-lg">
    <div class="tools q-pb-xl">
        <div class="titulo">Historial de pedidos</div>
    </div>
    <q-table title="Pedidos" no-data-label="Sin pedidos para mostrar" no-results-label="No se encontaron pedidos basados en tu búsqueda" :columns="state.columnas" :rows="state.filas" row-key="index" rows-per-page-label="Elementos por página" :pagination-label="getPaginationLabel" :pagination="state.pagination" :loading="state.loading" :filter="state.filter" :dense="$q.screen.lt.md">
        <template v-slot:body-cell-acciones="props">
            <q-td :props="props">
                <q-btn round outline dense color="amber" icon="visibility" @click="this.$router.push('/detalle_pedido_cliente/'+props.row.ordenCompraID)"></q-btn>
            </q-td>
        </template>

        <template v-slot:top-right>
            <q-input borderless dense debounce="300" v-model="state.filter" placeholder="Buscar">
                <template v-slot:append>
                    <q-icon name="search" />
                </template>
            </q-input>
        </template>
    </q-table>
</q-page>
</template>

<script>
import {
    reactive
} from "@vue/reactivity";
import {
    onMounted
} from "@vue/runtime-core";
import {
    api
} from "boot/axios";

export default {
    name: "PedidosCliente",
    setup() {
        document.title = "Gestión de pedidos";

        let tiposEstatus = [{
                value: 0,
                label: "Procesada"
            },
            {
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
            columnas: [{
                    name: "index",
                    label: '#',
                    align: "center",
                    field: row => row.index,
                    sortable: false,
                    classes: 'bg-grey-2 ellipsis',
                    style: 'max-width: 30px',
                    headerClasses: 'bg-primary text-white',
                    headerStyle: 'max-width: 30px'
                },
                {
                    name: "fechaPedido",
                    label: "F. de Pedido",
                    align: "center",
                    field: row => formatterDate(row.fechaProcesada),
                    sortable: false,
                    classes: 'bg-grey-2 ellipsis',
                    style: 'max-width: 30px',
                    headerClasses: 'bg-primary text-white',
                    headerStyle: 'max-width: 30px'
                },
                {
                    name: "estatus",
                    label: "Estatus",
                    align: "center",
                    field: row => tiposEstatus[(row.procesada + row.fabricada + row.enviada + row.entregada) - 1].label,
                    sortable: false,
                    classes: 'bg-grey-2 ellipsis',
                    style: 'max-width: 30px',
                    headerClasses: 'bg-primary text-white',
                    headerStyle: 'max-width: 30px'
                },
                {
                    name: "monto",
                    label: "Monto",
                    align: "center",
                    field: row => formatter(row.total),
                    sortable: false,
                    classes: 'bg-grey-2 ellipsis',
                    style: 'max-width: 30px',
                    headerClasses: 'bg-primary text-white',
                    headerStyle: 'max-width: 30px'
                },
                {
                    name: "acciones",
                    label: "Detalle",
                    align: "center",
                    field: "acciones",
                    sortable: false,
                    classes: 'bg-grey-2 ellipsis',
                    style: 'max-width: 30px',
                    headerClasses: 'bg-primary text-white',
                    headerStyle: 'max-width: 30px'
                },
            ],
            filas: [],
            loading: false,
            filter: "",
            pagination: {
                rowsPerPage: 8,
            },
        });

        onMounted(async () => {
            let clienteID = localStorage.getItem("clienteID");
            let cont = 0;
            //Obtener pedidos del cliente
            await api.get(`OrdenCompra/Cliente/${clienteID}`, {
                    headers: {
                        Authorization: 'Bearer ' + localStorage.getItem("token"),
                    }
                })
                .then(response => state.filas = response.data.payload.map(row => {
                    row.index = ++cont;
                    return row;
                }));
        });

        //Formatear el precio
        function formatter(val) {
            return new Intl.NumberFormat("es-MX", {
                style: "currency",
                currency: "MXN",
                minimumFractionDigits: 2,
            }).format(val);
        }

        //Formatear la fecha
        function formatterDate(fecha) {
            if (fecha == null) return null;

            let date = new Date(fecha);
            let day = date.getDate();
            let year = date.getFullYear();
            let month = date.getMonth() + 1;

            if (day < 10) day = "0" + day;
            if (month < 10) month = "0" + month;

            return day + "-" + month + "-" + year;
        }

        function getPaginationLabel(firstRowIndex, endRowIndex, totalRowsNumber) {
            return firstRowIndex + "-" + endRowIndex + " de " + totalRowsNumber;
        }

        return {
            state,
            getPaginationLabel,
            formatter
        };
    },
};
</script>
