<template>
<div class="q-pr-md" style="max-width: 400px">
    <q-list bordered padding class="lista-total">
        <q-item-label header class="titulo-total">Resumen de la compra</q-item-label>

        <q-item clickable v-ripple>
            <q-item-section>
                <q-item-label class="subtitulo-total">Subtotal</q-item-label>
                <q-item-label caption class="cuerpo-total">
                    ${{formatter(state.total)}} MXN
                </q-item-label>
            </q-item-section>
        </q-item>

        <q-item clickable v-ripple>
            <q-item-section>
                <q-item-label class="subtitulo-total">Total</q-item-label>
                <q-item-label caption class="cuerpo-total">
                    ${{formatter(state.total)}} MXN
                </q-item-label>
            </q-item-section>
        </q-item>

    </q-list>
</div>
</template>

<script>
import {
    reactive,
    onMounted
} from "vue";
import {
    api
} from "boot/axios";
import {
    useQuasar
} from "quasar";

export default {
    name: "Total",
    props: ['total'],
    setup(props) {

        const $q = useQuasar();

        const state = reactive({
            total: props.total
        });

        onMounted(async () => {
            state.total = props.total
        });

        //Formatear el precio
        function formatter(val) {
            return new Intl.NumberFormat("es-MX", {
                minimumFractionDigits: 2,
            }).format(val);
        }

        return {
            state,
            formatter

        }

    }

}
</script>

<style lang="scss" scoped>
.titulo-total {
    font-size: 23px;
    font-style: bold;
}

.subtitulo-total {
    font-size: 18px;
    font-style: bold;
}

.cuerpo-total {
    font-size: 15px;
}
</style>
