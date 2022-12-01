<template>
<q-page class="flex flex-center">

    <div id="catalogo">

        <div v-if="state.cargaCompletada">
            <div class="tools">
                <div class="titulo">Catálogo de productos</div>

                <div class="sorting">

                    <div class="selects">
                        <q-select class="select" filled dense v-model="state.material" :options="state.materiales" label="Producto">
                            <template v-slot:prepend>
                                <q-icon name="sort" />
                            </template>
                        </q-select>

                        <q-select class="select" filled dense v-model="state.precio" :options="state.precios" label="Precios">
                            <template v-slot:prepend>
                                <q-icon name="sort" />
                            </template>
                        </q-select>

                        <q-btn @click="limpiarFiltros()" icon="clear" text-color="primary" flat dense />
                    </div>

                    <div class="search-bar">

                        <q-input filled dense id="search-bar" color="primary" v-model="state.userInput" label="Busca tu producto">
                            <template v-slot:prepend>
                                <q-icon name="search" />
                            </template>
                        </q-input>

                    </div>

                </div>
            </div>

            <div class="catalogo-macetas">

            <div class="mensaje" v-if="state.numMacetas == 0">
                <q-icon name="search" size="5em" />
                <h4>No se encontraron productos <br> basados en tu búsqueda</h4>
            </div>

            <div class="maceta" v-for="(maceta, index) in filter()" :key="index">
                <Maceta v-bind="maceta" />
            </div>
        </div>
            
        </div>

        <div v-else>
            <!-- Progress bar -->
            <q-spinner-hourglass class="progress_center" color="negative" size="30em" :thickness="10" />

        </div>

    </div>

</q-page>
</template>

<script>
import {
    defineComponent,
    reactive,
    onMounted
} from 'vue'
import {
    api
} from "boot/axios";
import Maceta from 'components/Maceta.vue'

export default defineComponent({
    name: 'Catalogo',
    components: {
        Maceta
    },
    setup() {
        document.title = 'Catálogo'

        const state = reactive({
            userInput: null,
            material: null,
            precio: null,
            macetas: [],
            numMacetas: null,
            materiales: [],
            precios: [{
                    value: 0,
                    label: '$100-599',
                    min: 100,
                    max: 599
                }, {
                    value: 1,
                    label: '$600-799',
                    min: 600,
                    max: 799

                },
                {
                    value: 2,
                    label: '>$800',
                    min: 800,
                    max: 9999999
                }
            ],
            cargaCompletada: false
        });

        onMounted(async () => {

            getMateriales();

            //Obtener macetas
            await api.get('/Maceta', {
                    headers: {
                        Authorization: 'Bearer ' + localStorage.getItem("token"),
                    }
                })
                .then(res => {
                    res.data.payload.forEach(m => {
                        state.macetas.push({
                            id: m.macetaID,
                            imagen: m.imagenMaceta,
                            nombre: m.nombreMaceta,
                            descripcion: m.descripcion,
                            precio: m.precio,
                            material: m.nombreMaterial,
                        })
                    });
                    state.cargaCompletada = true;
                });
        })

        //Obtener materiales disponibles
        async function getMateriales() {
            await api.get('/Material')
                .then(res => {
                    res.data.payload.forEach(m => {
                        state.materiales.push({
                            value: m.materialId,
                            label: m.nombreMaterial
                        })
                    });
                });

            state.materiales.sort((a, b) => {
                if (a.label < b.label) return -1;
                if (a.label > b.label) return 1;
                return 0;
            });
        }

        //Realizar el filtrado de macetas
        function filter() {
            let macetas = state.macetas;
            //Para barra de búsqueda
            if (state.userInput)
                macetas = macetas.filter(m => {
                    let nombre = m.nombre.toLowerCase();
                    let material = m.material.toLowerCase();

                    return nombre.includes(state.userInput.toLowerCase()) ||
                        material.includes(state.userInput.toLowerCase());
                });
            //Para filtros
            if (state.material)
                macetas = macetas.filter(m => m.material.toLowerCase().includes(state.material.label.toLowerCase()));
            if (state.precio)
                macetas = macetas.filter(m => m.precio >= state.precio.min && m.precio <= state.precio.max);
            state.numMacetas = macetas.length;
            return macetas;
        }

        //Limpiar filtros
        function limpiarFiltros() {
            state.userInput = null;
            state.material = null;
            state.precio = null;
        }

        return {
            state,
            filter,
            limpiarFiltros
        }

    }
})
</script>

<style lang="scss" scoped>
#catalogo {
    width: 100%;
    height: 100%;
}

.catalogo-macetas {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(15rem, 1fr));
    grid-column-gap: 0.5rem;
    height: 80vh;
    overflow-y: scroll;

    .mensaje {
        display: flex;
        flex-flow: column nowrap;
        justify-content: center;
        align-items: center;
        height: 75%;
        opacity: 0.2;

        h4 {
            margin: 0;
            text-align: center;
        }
    }
}

.progress_center {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}

@media (max-width: 1000px) {
    .tools .sorting {
        display: flex;
        flex-flow: column nowrap;
        gap: 0.5rem;
    }
}
</style>
