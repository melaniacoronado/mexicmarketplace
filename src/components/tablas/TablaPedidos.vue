<template>
<q-table title="Pedidos" no-data-label="Sin pedidos para mostrar" no-results-label="No se encontaron pedidos basados en tu búsqueda" :columns="state.columnas" :rows="state.filas" row-key="ordenCompraID" rows-per-page-label="Elementos por página" :pagination-label="getPaginationLabel" :pagination="state.pagination" :loading="state.loading" :filter="state.filter" :dense="$q.screen.lt.md">
    <template v-slot:body-cell-acciones="props">
        <q-td class="q-gutter-sm" :props="props">
            <q-btn round outline dense color="amber" icon="edit" @click="this.$router.push('/detalle_pedido/'+props.row.ordenCompraID)"></q-btn>
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
import {
    useQuasar
} from "quasar";

export default {
    name: "TablaPedidos",
    setup(props, context) {

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
                    name: "ordenCompraID",
                    label: "ID",
                    align: "center",
                    field: "ordenCompraID",
                    sortable: false,
                    classes: 'bg-grey-2 ellipsis',
                    style: 'max-width: 30px',
                    headerClasses: 'bg-primary text-white',
                    headerStyle: 'max-width: 30px'
                },
                {
                    name: "nombreCliente",
                    label: "Cliente",
                    align: "center",
                    field: "nombreCliente",
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
                    label: "Acciones",
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

        const $q = useQuasar();

        onMounted(async () => {
            await api.get(`OrdenCompra`, {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem("token"),
                }
            }).then(response => {
                state.filas = response.data.payload
            });
        });

        function formatter(val) {
            return new Intl.NumberFormat("es-MX", {
                style: "currency",
                currency: "MXN",
                minimumFractionDigits: 2,
            }).format(val);
        }

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

        function editarPedido(props) {
            var id = props.row.ordenCompraID;
            context.emit("editarPedido", id);
        }

        function eliminarPedido(props) {
            var id = props.row.pedidoID;
            $q.dialog({
                title: "Eliminar pedido",
                message: "¿Deseas eliminar el pedido " + props.row.ordenCompraID + " del cliente " + props.row.nombreCliente + "?",
                ok: {
                    push: true,
                    label: "Eliminar",
                    color: "negative",
                },
                cancel: {
                    label: "Cancelar",
                    color: "primary",
                    flat: true,
                },
                persistent: true,
            }).onOk(async () => {
                const response = await api.delete(`/Pedido/${id}`, {
                    headers: {
                        Authorization: 'Bearer ' + localStorage.getItem("token"),
                    }
                });
                if (response && response.status === 200) {
                    $q.notify({
                        color: "green-4",
                        textColor: "white",
                        icon: "cloud_done",
                        message: "Pedido eliminado exitosamente",
                    });
                } else {
                    $q.notify({
                        color: "red-5",
                        textColor: "white",
                        icon: "warning",
                        message: "Ocurrió un problema. Intentálo de nuevo.",
                    });
                }
                await api.get(`OrdenCompra`, {
                    headers: {
                        Authorization: 'Bearer ' + localStorage.getItem("token"),
                    }
                }).then(response => state.filas = response.data.payload);
            });
        }

        return {
            state,
            editarPedido,
            eliminarPedido,
            getPaginationLabel,
            formatter
        };
    },
};
</script>

<style>
</style>
