<template>
<q-table title="Tipos de producto" no-data-label="Cargando tipos de producto" no-results-label="No se encontaron tipos de producto basados en tu búsqueda" :columns="state.columnas" :rows="state.filas" row-key="materialId" rows-per-page-label="Elementos por página" :pagination-label="getPaginationLabel" :pagination="state.pagination" :loading="state.loading" :filter="state.filter" :dense="$q.screen.lt.md">
    <template v-slot:body-cell-acciones="props">
        <q-td class="q-gutter-sm" :props="props">
            <q-btn round outline dense color="amber" icon="edit" @click="editarMaterial(props)"></q-btn>
            <q-btn round outline dense color="negative" icon="delete" @click="eliminarMaterial(props)"></q-btn>
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
    name: "TablaMateriales",
    setup(props, context) {
        const state = reactive({
            columnas: [
                // {
                //     name: "materialId",
                //     label: "#",
                //     align: "center",
                //     field: "materialId",
                //     sortable: false,
                //     classes: 'bg-grey-2 ellipsis',
                //     style: 'max-width: 30px',
                //     headerClasses: 'bg-primary text-white',
                //     headerStyle: 'max-width: 30px'
                // },
                {
                    name: "nombreMaterial",
                    label: "Nombre",
                    align: "center",
                    field: "nombreMaterial",
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
            cargarMateriales();
        });

        //Cargar materiales
        async function cargarMateriales() {
            var responseMateriales = await api.get(`Material`);
            state.filas = responseMateriales.data.payload;
        }

        //Cambiar mensaje de paginación
        function getPaginationLabel(firstRowIndex, endRowIndex, totalRowsNumber) {
            return firstRowIndex + "-" + endRowIndex + " de " + totalRowsNumber;
        }

        //Abrir ventana para editar material
        function editarMaterial(props) {
            var id = props.row.materialId;
            context.emit("editarMaterial", id);
        }

        function eliminarMaterial(props) {
            var id = props.row.materialId;
            $q.dialog({
                //Mensaje de confirmación
                title: "Eliminar Material",
                message: "¿Deseas eliminar el tipo de producto: '" + props.row.nombreMaterial + "'?",
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
                //DELETE del material
                const response = await api.delete(`/Material/${id}`, {
                    headers: {
                        Authorization: 'Bearer ' + localStorage.getItem("token"),
                    }
                });
                if (response && response.status === 200) {
                    $q.notify({
                        color: "green-4",
                        textColor: "white",
                        icon: "cloud_done",
                        message: "Tipo de producto eliminado exitosamente",
                    });
                } else {
                    $q.notify({
                        color: "red-5",
                        textColor: "white",
                        icon: "warning",
                        message: "Ocurrió un problema. Intentálo de nuevo.",
                    });
                }
                cargarMateriales();
            });
        }

        return {
            state,
            cargarMateriales,
            editarMaterial,
            eliminarMaterial,
            getPaginationLabel,
        };
    },
};
</script>

<style>
</style>
