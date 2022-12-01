<template>
<q-table title="Colores" no-data-label="Cargando colores" no-results-label="No se encontaron colores basadas en tu búsqueda" :columns="state.columnas" :rows="state.filas" row-key="colorId" rows-per-page-label="Elementos por página" :pagination-label="getPaginationLabel" :pagination="state.pagination" :loading="state.loading" :filter="state.filter" :dense="$q.screen.lt.md">
    <template v-slot:body-cell-acciones="props">
        <q-td class="q-gutter-sm" :props="props">
            <q-btn round outline dense color="amber" icon="edit" @click="editarColor(props)"></q-btn>
            <q-btn round outline dense color="negative" icon="delete" @click="eliminarColor(props)"></q-btn>
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
    name: "TablaColores",
    setup(props, context) {
        const state = reactive({
            columnas: [
                // {
                //     name: "colorId",
                //     label: "#",
                //     align: "center",
                //     field: "colorId",
                //     sortable: false,
                //     classes: 'bg-grey-2 ellipsis',
                //     style: 'max-width: 30px',
                //     headerClasses: 'bg-primary text-white',
                //     headerStyle: 'max-width: 30px'
                // },
                {
                    name: "nombreColor",
                    label: "Nombre",
                    align: "center",
                    field: "nombreColor",
                    sortable: false,
                    classes: 'bg-grey-2 ellipsis',
                    style: 'max-width: 30px',
                    headerClasses: 'bg-primary text-white',
                    headerStyle: 'max-width: 30px'
                },
                {
                    name: "codigoColor",
                    label: "Código Color",
                    align: "center",
                    field: "codigoColor",
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
            cargarColores();
        });

        //Formatear el precio
        function formatter(val) {
            return new Intl.NumberFormat("es-MX", {
                style: "currency",
                currency: "MXN",
                minimumFractionDigits: 2,
            }).format(val);
        }

        //Cargar los colores
        async function cargarColores() {
            var responseColores = await api.get(`Color`);
            state.filas = responseColores.data.payload;
        }

        //Cambiar mensaje de paginación
        function getPaginationLabel(firstRowIndex, endRowIndex, totalRowsNumber) {
            return firstRowIndex + "-" + endRowIndex + " de " + totalRowsNumber;
        }

        //Abrir ventana para editar color
        function editarColor(props) {
            var id = props.row.colorId;
            context.emit("editarColor", id);
        }

        function eliminarColor(props) {
            var id = props.row.colorId;
            //Mensaje de confirmación
            $q.dialog({
                title: "Eliminar Color",
                message: "¿Deseas eliminar el color: '" + props.row.nombreColor + "'?",
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
                //DELETE del color
                const response = await api.delete(`/Color/${id}`, {
                    headers: {
                        Authorization: 'Bearer ' + localStorage.getItem("token"),
                    }
                });
                if (response && response.status === 200) {
                    $q.notify({
                        color: "green-4",
                        textColor: "white",
                        icon: "cloud_done",
                        message: "Color eliminado exitosamente",
                    });
                } else {
                    $q.notify({
                        color: "red-5",
                        textColor: "white",
                        icon: "warning",
                        message: "Ocurrió un problema. Intentálo de nuevo.",
                    });
                }
                cargarColores();
            });
        }

        return {
            state,
            cargarColores,
            editarColor,
            eliminarColor,
            getPaginationLabel,
        };
    },
};
</script>

<style>
</style>
