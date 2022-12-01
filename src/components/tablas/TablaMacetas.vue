<template>
<q-table title="Productos" no-data-label="Cargando productos" no-results-label="No se encontaron productos basados en tu búsqueda" :columns="state.columnas" :rows="state.filas" row-key="macetaID" rows-per-page-label="Elementos por página" :pagination-label="getPaginationLabel" :pagination="state.pagination" :loading="state.loading" :filter="state.filter" :dense="$q.screen.lt.md">
    <template v-slot:body-cell-acciones="props">
        <q-td class="q-gutter-sm" :props="props">
            <q-btn round outline dense color="amber" icon="edit" @click="editarMaceta(props)"></q-btn>
            <q-btn round outline dense color="negative" icon="delete" @click="eliminarMaceta(props)"></q-btn>
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
    name: "TablaMacetas",
    setup(props, context) {
        const state = reactive({
            columnas: [{
                    name: "macetaID",
                    label: "Código",
                    align: "center",
                    field: "macetaID",
                    sortable: false,
                    classes: 'bg-grey-2 ellipsis',
                    style: 'max-width: 30px',
                    headerClasses: 'bg-primary text-white',
                    headerStyle: 'max-width: 30px'
                },
                {
                    name: "nombreMaceta",
                    label: "Nombre",
                    align: "center",
                    field: "nombreMaceta",
                    sortable: false,
                    classes: 'bg-grey-2 ellipsis',
                    style: 'max-width: 30px',
                    headerClasses: 'bg-primary text-white',
                    headerStyle: 'max-width: 30px'
                },
                {
                    name: "nombreMaterial",
                    label: "Material",
                    align: "center",
                    field: "nombreMaterial",
                    sortable: false,
                    classes: 'bg-grey-2 ellipsis',
                    style: 'max-width: 30px',
                    headerClasses: 'bg-primary text-white',
                    headerStyle: 'max-width: 30px'
                },
                {
                    name: "precio",
                    label: "Precio",
                    align: "center",
                    field: row => formatter(row.precio),
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
            cargarMacetas();
        });

        //Cargar macetas
        async function cargarMacetas() {
            var responseMacetas = await api.get(`Maceta`, {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem("token"),
                }
            });
            state.filas = responseMacetas.data.payload;
        }

        //Cambiar mensaje de paginación
        function getPaginationLabel(firstRowIndex, endRowIndex, totalRowsNumber) {
            return firstRowIndex + "-" + endRowIndex + " de " + totalRowsNumber;
        }

        //Abrir ventana para editar maceta
        function editarMaceta(props) {
            var id = props.row.macetaID;
            context.emit("editarMaceta", id);
        }

        function eliminarMaceta(props) {
            var id = props.row.macetaID;
            $q.dialog({
                //Mensaje de confirmación
                title: "Eliminar producto",
                message: "¿Deseas eliminar el producto: '" + props.row.nombreMaceta + "'?",
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
                //DELETE de la maceta
                const response = await api.delete(`/Maceta/${id}`, {
                    headers: {
                        Authorization: 'Bearer ' + localStorage.getItem("token"),
                    }
                });
                if (response && response.status === 200) {
                    $q.notify({
                        color: "green-4",
                        textColor: "white",
                        icon: "cloud_done",
                        message: "Producto eliminado exitosamente",
                    });
                } else {
                    $q.notify({
                        color: "red-5",
                        textColor: "white",
                        icon: "warning",
                        message: "Ocurrió un problema. Intentálo de nuevo.",
                    });
                }
                cargarMacetas();
            });
        }

        //Formatear el precio
        function formatter(val) {
            return new Intl.NumberFormat("es-MX", {
                style: "currency",
                currency: "MXN",
                minimumFractionDigits: 2,
            }).format(val);
        }

        return {
            state,
            cargarMacetas,
            editarMaceta,
            eliminarMaceta,
            getPaginationLabel,
            formatter
        };
    },
};
</script>

<style>
</style>
