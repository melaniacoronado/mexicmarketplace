<template>
<q-page>

    <div class="tools q-pb-xl">
        <div class="header">
            <div class="titulo">Información del pedido #{{state.ordenCompraID}}</div>
            <q-btn flat color="primary" label="Regresar" @click="this.$router.push('/pedidos')" />
        </div>
    </div>

    <div class="column flex-center q-mt-xl">
        <div class="wrapper">

            <class class="items">
                <div class="item" v-for="(item, index) in state.items" :key="index">
                    <ItemCompra :id="index+1" v-bind="item" />
                </div>
            </class>

            <q-btn class="estatus" color="primary" label="Revisar Estatus" @click="this.$router.push('/estatus_pedido/' + state.ordenCompraID)" />

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
} from 'vue'
import ItemCompra from "components/ItemCompra.vue";
import {
    useRoute
} from "vue-router";
import {
    api
} from "boot/axios";

export default defineComponent({
    name: 'DetallePedido',
    components: {
        ItemCompra
    },
    name: 'PageIndex',
    setup() {

        const route = useRoute();
        const id = computed(() => route.params.id).value;
        const state = reactive({
            ordenCompraID: id,
            items: []
        })

        onMounted(async () => {
            //Cargar items de la compra
            await api.get('/OrdenCompra/Items/' + id, {
                    headers: {
                        Authorization: 'Bearer ' + localStorage.getItem("token"),
                    }
                })
                .then(response => {
                    response.data.payload.map(item => {
                        item.imagenMaceta = item.personalizada ? obtenerImagenUrl(item.nombreMaterial, item.nombreColor, item.nombreForma) : item.imagenMaceta
                        return item;
                    })
                    state.items = response.data.payload
                });
        })

        //Obtener imagen de la maceta
        function obtenerImagenUrl(material, color, forma) {

            if (material == 'Fibra de vidrio' && (forma == '' || forma == 'Copa') && (color == '' || color == 'Blanco'))
                return require('../../assets/macetas_personalizadas/copa_blanco.png');

            if (material == 'Fibra de vidrio' && (forma == '' || forma == 'Copa') && (color == '' || color == 'Amarillo'))
                return require('../../assets/macetas_personalizadas/copa_amarillo.png');

            if (material == 'Fibra de vidrio' && (forma == '' || forma == 'Copa') && (color == '' || color == 'Azul'))
                return require('../../assets/macetas_personalizadas/copa_azul.png');

            if (material == 'Fibra de vidrio' && (forma == '' || forma == 'Copa') && (color == '' || color == 'Gris'))
                return require('../../assets/macetas_personalizadas/copa_gris.png');

            if (material == 'Fibra de vidrio' && (forma == '' || forma == 'Copa') && (color == '' || color == 'Morado'))
                return require('../../assets/macetas_personalizadas/copa_morado.png');

            if (material == 'Fibra de vidrio' && (forma == '' || forma == 'Copa') && (color == '' || color == 'Naranja'))
                return require('../../assets/macetas_personalizadas/copa_naranja.png');

            if (material == 'Fibra de vidrio' && (forma == '' || forma == 'Copa') && (color == '' || color == 'Negro'))
                return require('../../assets/macetas_personalizadas/copa_negro.png');

            if (material == 'Fibra de vidrio' && (forma == '' || forma == 'Copa') && (color == '' || color == 'Rojo'))
                return require('../../assets/macetas_personalizadas/copa_rojo.png');

            if (material == 'Fibra de vidrio' && (forma == '' || forma == 'Copa') && (color == '' || color == 'Rosa'))
                return require('../../assets/macetas_personalizadas/copa_rosa.png');

            if (material == 'Fibra de vidrio' && (forma == '' || forma == 'Copa') && (color == '' || color == 'Verde'))
                return require('../../assets/macetas_personalizadas/copa_verde.png');

            // Reloj

            if (material == 'Fibra de vidrio' && (forma == 'Reloj') && (color == '' || color == 'Blanco'))
                return require('../../assets/macetas_personalizadas/reloj_blanco.png');

            if (material == 'Fibra de vidrio' && (forma == 'Reloj') && (color == '' || color == 'Amarillo'))
                return require('../../assets/macetas_personalizadas/reloj_amarillo.png');

            if (material == 'Fibra de vidrio' && (forma == 'Reloj') && (color == '' || color == 'Azul'))
                return require('../../assets/macetas_personalizadas/reloj_azul.png');

            if (material == 'Fibra de vidrio' && (forma == 'Reloj') && (color == '' || color == 'Gris'))
                return require('../../assets/macetas_personalizadas/reloj_gris.png');

            if (material == 'Fibra de vidrio' && (forma == 'Reloj') && (color == '' || color == 'Morado'))
                return require('../../assets/macetas_personalizadas/reloj_morado.png');

            if (material == 'Fibra de vidrio' && (forma == 'Reloj') && (color == '' || color == 'Naranja'))
                return require('../../assets/macetas_personalizadas/reloj_naranja.png');

            if (material == 'Fibra de vidrio' && (forma == 'Reloj') && (color == '' || color == 'Negro'))
                return require('../../assets/macetas_personalizadas/reloj_negro.png');

            if (material == 'Fibra de vidrio' && (forma == 'Reloj') && (color == '' || color == 'Rojo'))
                return require('../../assets/macetas_personalizadas/reloj_rojo.png');

            if (material == 'Fibra de vidrio' && (forma == 'Reloj') && (color == '' || color == 'Rosa'))
                return require('../../assets/macetas_personalizadas/reloj_rosa.png');

            if (material == 'Fibra de vidrio' && (forma == 'Reloj') && (color == '' || color == 'Verde'))
                return require('../../assets/macetas_personalizadas/reloj_verde.png');

            // Mármol cudrado
            if (material == 'Mármol' && (forma == '' || forma == 'Cuadrangular') && (color == '' || color == 'Blanco'))
                return require('../../assets/macetas_personalizadas/cuadrado_blanco.png');
            if (material == 'Mármol' && (forma == '' || forma == 'Cuadrangular') && (color == '' || color == 'Negro'))
                return require('../../assets/macetas_personalizadas/cuadrado_negro.png');
            if (material == 'Mármol' && (forma == '' || forma == 'Cuadrangular') && (color == '' || color == 'Gris'))
                return require('../../assets/macetas_personalizadas/cuadrado_gris.png');

            // Mármol rectángulo

            if (material == 'Mármol' && (forma == 'Rectangular') && (color == '' || color == 'Blanco'))
                return require('../../assets/macetas_personalizadas/rectangulo_blanco.png');
            if (material == 'Mármol' && (forma == 'Rectangular') && (color == '' || color == 'Negro'))
                return require('../../assets/macetas_personalizadas/rectangulo_negro.png');
            if (material == 'Mármol' && (forma == 'Rectangular') && (color == '' || color == 'Gris'))
                return require('../../assets/macetas_personalizadas/rectangulo_gris.png');

            // Mármol cilindro
            if (material == 'Mármol' && (forma == 'Cilíndrica') && (color == '' || color == 'Blanco'))
                return require('../../assets/macetas_personalizadas/cilindro_blanco.png');
            if (material == 'Mármol' && (forma == 'Cilíndrica') && (color == '' || color == 'Negro'))
                return require('../../assets/macetas_personalizadas/cilindro_negro.png');
            if (material == 'Mármol' && (forma == 'Cilíndrica') && (color == '' || color == 'Gris'))
                return require('../../assets/macetas_personalizadas/cilindro_gris.png');

            return require('../../assets/macetas_personalizadas/copa_blanco.png');
        }

        return {
            state,
            obtenerImagenUrl
        }
    }
})
</script>

<style lang="scss" scoped>
.wrapper {
    box-shadow: 0px 0px 10px rgba(128, 128, 128, 0.473);
    border-radius: 5px;
    padding: 2rem;
    display: flex;
    flex-flow: column nowrap;
}

.header {
    display: flex;
    justify-content: space-between;
    align-items: center;

}

.items {
    display: flex;
    flex-flow: column nowrap;
    justify-content: space-between;
    align-items: center;
    overflow: hidden;
    height: 20rem;
    overflow-y: scroll;
    margin-bottom: 1.4rem;
}

.estatus {
    width: 50%;
    margin: auto;
}
</style>
