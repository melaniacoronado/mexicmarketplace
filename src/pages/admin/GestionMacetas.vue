<template>
<q-page>
    <div class="tools q-pb-xl">
        <div class="titulo">Gestión de productos</div>
    </div>
    <div class="fit row justify-center q-pb-md q-pt-md">
        <div class="q-gutter-y-md" style="max-width: 600px">
            <q-tabs v-model="state.tab" class="text-primary">
                <q-tab name="macetas" icon="inventory" label="Productos" />
                <q-tab name="materiales" icon="sell" label="Tipos de producto" />
                <q-tab name="colores" icon="palette" label="Colores" />
            </q-tabs>
        </div>
    </div>

    <div v-if="state.tab=='macetas'">
        <div class="fit row justify-end q-pb-md">
            <div>
                <q-btn color="primary" label="Agregar producto" @click="toogleBotonAgregarMaceta" />
            </div>
        </div>
        <!-- Tabla de las macetas -->
        <TablaMacetas v-if="state.promptTablaMacetas" :key="state.llaveMaceta" @editarMaceta="editarMaceta" />
    </div>

    <div v-if="state.tab=='colores'">
        <div class="fit row justify-end q-pb-md">
            <div>
                <q-btn color="primary" label="Agregar color" @click="toogleBotonAgregarColor" />
            </div>
        </div>
        <!-- Tabla de los colores -->
        <TablaColores v-if="state.promptTablaColores" :key="state.llaveColor" @editarColor="editarColor" />
    </div>

    <div v-if="state.tab=='materiales'">
        <div class="fit row justify-end q-pb-md">
            <div>
                <q-btn color="primary" label="Agregar tipo de producto" @click="toogleBotonAgregarMaterial" />
            </div>
        </div>
        <!-- Tabla de los materiales -->
        <TablaMateriales v-if="state.promptTablaMateriales" :key="state.llaveMaterial" @editarMaterial="editarMaterial" />
    </div>

    <!-- Ventana para agregar la maceta -->
    <FormAgregarMaceta v-if="state.promptAgregarMaceta" @cerrarDialog="state.promptAgregarMaceta = false" @actualizarMacetas="cargarMacetas" />

    <!-- Ventana para editar la maceta -->
    <FormEditarMaceta v-if="state.promptEditarMaceta" :idSeleccionado="state.idSeleccionado" @cerrarDialog="state.promptEditarMaceta = false" @actualizarMacetas="cargarMacetas" />

    <!-- Ventana para agregar el color -->
    <FormAgregarColor v-if="state.promptAgregarColor" @cerrarDialog="state.promptAgregarColor = false" @actualizarColores="cargarColores" />

    <!-- Ventana para editar el color -->
    <FormEditarColor v-if="state.promptEditarColor" :idSeleccionado="state.idSeleccionado" @cerrarDialog="state.promptEditarColor = false" @actualizarColores="cargarColores" />

    <!-- Ventana para agregar el material -->
    <FormAgregarMaterial v-if="state.promptAgregarMaterial" @cerrarDialog="state.promptAgregarMaterial = false" @actualizarMateriales="cargarMateriales" />

    <!-- Ventana para editar el material -->
    <FormEditarMaterial v-if="state.promptEditarMaterial" :idSeleccionado="state.idSeleccionado" @cerrarDialog="state.promptEditarMaterial = false" @actualizarMateriales="cargarMateriales" />

</q-page>
</template>

<script>
import {
    reactive,
    onMounted
} from "vue";
import FormAgregarMaceta from "components/forms/FormAgregarMaceta.vue";
import FormAgregarColor from "components/forms/FormAgregarColor.vue";
import FormAgregarMaterial from "components/forms/FormAgregarMaterial.vue";
import FormEditarMaceta from "components/forms/FormEditarMaceta.vue";
import FormEditarColor from "components/forms/FormEditarColor.vue";
import FormEditarMaterial from "components/forms/FormEditarMaterial.vue";
import TablaMacetas from "components/tablas/TablaMacetas.vue";
import TablaColores from "components/tablas/TablaColores.vue";
import TablaMateriales from "components/tablas/TablaMateriales.vue";
import {
    useQuasar
} from "quasar";
import {
    api
} from "boot/axios";
import {
    VMoney
} from "v-money";

export default {
    name: "GestionMacetas",
    components: {
        FormAgregarMaceta,
        FormAgregarColor,
        FormAgregarMaterial,
        FormEditarMaceta,
        FormEditarColor,
        FormEditarMaterial,
        TablaMacetas,
        TablaColores,
        TablaMateriales
    },
    directives: {
        money: VMoney
    },
    setup(props, context) {
        document.title = "Gestión de Productos";

        const state = reactive({
            tab: 'macetas',
            promptAgregarMaceta: false,
            promptEditarMaceta: false,
            promptTablaMacetas: false,
            promptAgregarColor: false,
            promptEditarColor: false,
            promptTablaColores: false,
            promptAgregarMaterial: false,
            promptEditarMaterial: false,
            promptTablaMateriales: false,
            idSeleccionado: null,
            llaveMaceta: 0,
            llaveColor: 0,
            llaveMaterial: 0,
            price: 0,
            money: {
                decimal: ".",
                thousands: ",",
                prefix: "$",
                suffix: " MXN",
                precision: 2,
                masked: false
            },
        });

        const $q = useQuasar();

        onMounted(async () => {
            //Cargar todas las macetas, colores y materiales
            cargarMacetas();
            cargarColores();
            cargarMateriales();
        });

        function cargarMacetas() {
            state.promptTablaMacetas = false;
            state.promptTablaMacetas = true;
            state.llaveMaceta++;
        }

        function cargarColores() {
            state.promptTablaColores = false;
            state.promptTablaColores = true;
            state.llaveColor++;
        }

        function cargarMateriales() {
            state.promptTablaMateriales = false;
            state.promptTablaMateriales = true;
            state.llaveMaterial++;
        }

        //Mostrar ventana para editar la maceta
        function editarMaceta(id) {
            state.idSeleccionado = id;
            state.promptEditarMaceta = true;
        }

        //Mostrar ventana para editar el color
        function editarColor(id) {
            state.idSeleccionado = id;
            state.promptEditarColor = true;
        }

        //Mostrar ventana para editar el material
        function editarMaterial(id) {
            state.idSeleccionado = id;
            state.promptEditarMaterial = true;
        }

        //Mostrar ventana para agregar la maceta
        function toogleBotonAgregarMaceta() {
            if (state.promptAgregarMaceta) state.promptAgregarMaceta = false;
            else state.promptAgregarMaceta = true;
        }

        //Mostrar ventana para agregar el color
        function toogleBotonAgregarColor() {
            if (state.promptAgregarColor) state.promptAgregarColor = false;
            else state.promptAgregarColor = true;
        }

        //Mostrar ventana para agregar el material
        function toogleBotonAgregarMaterial() {
            if (state.promptAgregarMaterial) state.promptAgregarMaterial = false;
            else state.promptAgregarMaterial = true;
        }

        return {
            state,
            cargarMacetas,
            cargarColores,
            cargarMateriales,
            editarMaceta,
            editarColor,
            editarMaterial,
            toogleBotonAgregarMaceta,
            toogleBotonAgregarColor,
            toogleBotonAgregarMaterial
        };
    },
};
</script>

<style lang="scss" scoped>

</style>
