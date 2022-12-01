<template>
<q-layout view="lHh Lpr lFf">
    <q-header elevated>
        <q-toolbar class="header">
            <div id="menuresp">
                <q-avatar color="primary" icon="menu">
                    <q-menu>
                        <q-list style="min-width: 100px">
                            <q-item clickable @click="$router.push('/')">
                                <q-item-section>Catálogo</q-item-section>
                            </q-item>
                            <!-- <q-item clickable @click="$router.push('/tu-maceta')">
                                <q-item-section>Personalización</q-item-section>
                            </q-item> -->
                            <q-separator v-if="state.auth"/>
                            <q-item clickable @click="$router.push('/gestion_productos')" v-if="state.auth">
                                <q-item-section>Gestión de productos</q-item-section>
                            </q-item>
                            <q-item clickable @click="$router.push('/pedidos')" v-if="state.auth">
                                <q-item-section>Gestión de pedidos</q-item-section>
                            </q-item>
                            <q-item clickable @click="irATiendaVirtual()">
                                <q-item-section>Tienda virtual</q-item-section>
                            </q-item>
                            <q-item clickable @click="$router.push('/nosotros')">
                                <q-item-section>Nosotros</q-item-section>
                            </q-item>
                        </q-list>
                    </q-menu>
                </q-avatar>
            </div>
            <div id="logo" @click="this.$router.push('/')">Mèxic</div>

            <div id="menu">
                <q-btn flat color="primary" text-color="white" label="Catálogo" @click="$router.push('/')"></q-btn>
                <!-- <q-btn flat color="primary" text-color="white" label="Personalización" @click="$router.push('/tu-maceta')"></q-btn> -->
                <q-btn flat color="primary" text-color="white" label="Gestión de productos" @click="$router.push('/gestion_productos')" v-if="state.auth"></q-btn>
                <q-btn flat color="primary" text-color="white" label="Gestión de pedidos" @click="$router.push('/pedidos')" v-if="state.auth"></q-btn>
                <q-btn flat color="primary" text-color="white" label="Tienda virtual" @click="irATiendaVirtual()"></q-btn>
                <q-btn flat color="primary" text-color="white" label="Nosotros" @click="$router.push('/nosotros')"></q-btn>
            </div>

            <div id="acciones">
                <CarritoCompras :sesionActiva="state.sesionActiva" />

                <q-btn flat color="primary" text-color="white" icon="person">
                    <q-menu v-if="!state.sesionActiva">
                        <div class="row no-wrap q-pa-sm">

                            <div class="column items-center centrar" style="width: 150px">

                                <div class="text-subtitle1 q-mt-xs q-mb-xs">
                                    Bienvenido
                                </div>

                                <div class="q-pt-sm">
                                    <q-btn color="primary" label="Iniciar sesión" @click="iniciarSesion" push size="md" v-close-popup />
                                </div>

                                <div class="q-pt-sm">
                                    <q-btn color="primary" label="Crear cuenta" @click="crearCuenta" push size="md" v-close-popup />
                                </div>

                            </div>

                        </div>
                    </q-menu>

                    <q-menu v-if="state.sesionActiva">
                        <div class="row no-wrap q-pa-sm">

                            <div class="column items-center centrar" style="width: 150px">

                                <div class="text-subtitle1 q-mt-md q-mb-xs">
                                    Bienvenido, {{state.nombreCliente}}
                                </div>

                                <q-btn color="primary" label="Cerrar sesión" @click="cerrarSesion" push size="md" v-close-popup />

                            </div>

                            <q-separator vertical inset class="q-mx-sm" />

                            <div class="column items-center">
                                <q-list style="min-width: 150">
                                    <q-item clickable v-close-popup @click="$router.push('/mis-pedidos')">
                                        <q-item-section>Mis pedidos</q-item-section>
                                    </q-item>
                                    <q-separator />
                                    <q-item clickable v-close-popup @click="this.$router.push('/direccion_envio')">
                                        <q-item-section>Mi dirección de envío</q-item-section>
                                    </q-item>
                                </q-list>
                            </div>

                        </div>
                    </q-menu>
                </q-btn>
            </div>
        </q-toolbar>
    </q-header>

    <q-page-container>
        <router-view />
    </q-page-container>

</q-layout>
</template>

<script>
import {
    defineComponent,
    onMounted,
    reactive
} from "vue";
import {
    useRouter
} from "vue-router";
import CarritoCompras from "components/CarritoCompras.vue";

export default defineComponent({
    name: "MainLayout",

    components: {
        CarritoCompras
    },

    setup() {

        const router = useRouter();

        const state = reactive({
            sesionActiva: false,
            nombreCliente: "",
            auth: localStorage.getItem("auth") == 'admin'
        });

        onMounted(async () => {
            state.sesionActiva = localStorage.getItem("clienteID") !== null;
            state.nombreCliente = localStorage.getItem("nombreCliente");
        });

        function iniciarSesion() {
            router.push("/login");
        }

        function crearCuenta() {
            router.push("/crear_cuenta");
        }

        function cerrarSesion() {
            localStorage.clear();
            location.reload();
        }

        function irATiendaVirtual(){
            window.open("https://www.spatial.io/s/Mexic-Marketplace-637beab5769cb70001cf4367?share=3483436664969537908/", "_blank");
        }
        return {
            state,
            iniciarSesion,
            cerrarSesion,
            crearCuenta, 
            irATiendaVirtual
        };
    },
});
</script>

<style lang="scss" scoped>
#menuresp {
    display: none;
}

.header {
    display: flex;
    justify-content: space-between;
    align-items: center;

    #logo {
        font-size: 1.5em;
        font-weight: bold;
        color: #fff;
        text-transform: uppercase;
        letter-spacing: 1px;
        transition: all 0.5s ease-in-out;

        &:hover {
            transform: scale(1.05, 1.05);
            cursor: pointer;
        }
    }
}

h6 {
    font-size: 14px;
}

.centrar {
    text-align: center;
}

@media screen and (max-width: 750px) {
    #menuresp {
        display: inline;
    }

    #menu {
        display: none;
    }

    #logo {
        display: block;
    }

}
</style>
