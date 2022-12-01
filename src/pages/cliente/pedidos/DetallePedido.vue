<template>
<q-page padding>

    <div class="tools q-pb-xl">
        <div class="header">
            <div class="titulo">Información del pedido</div>
            <q-btn flat color="primary" label="Regresar" @click="this.$router.push('/mis-pedidos')" />
        </div>
    </div>

    <div class="column flex-center q-mt-xl">
        <div class="wrapper">

            <class class="items">
                <div class="item" v-for="(item, index) in state.items" :key="index">
                    <ItemCompra :id="index+1" v-bind="item" :macetaID=item.macetaId />
                </div>
            </class>

            <q-btn class="estatus" color="primary" label="Revisar Estatus" @click="this.$router.push('/estatus_pedido_cliente/' + state.ordenCompraID)" />

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
            //Obtener items de la orden de compra
            await api.get('/OrdenCompra/Items/' + id, {
                    headers: {
                        Authorization: 'Bearer ' + localStorage.getItem("token"),
                    }
                })
                .then(response => state.items = response.data.payload);
        })

        return {
            state
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
