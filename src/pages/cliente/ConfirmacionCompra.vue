<template>
<div class="compra">
    <q-icon name="check_circle" color="primary" size="15em" />
    <h2>Tu compra fue exitosa</h2>
    <h4 id="transaccion" v-if="state.mostrarId">ID de la transacción: {{state.idTransaccion}}</h4>
    <q-btn color="primary" @click="$router.push('/')" label="Regresar al catálogo" />
</div>
</template>

<script>
import {
    reactive,
    onMounted,
    onUnmounted
} from "vue";

export default {
    name: "ConfirmacionCompra",
    setup() {

        const state = reactive({
            idTransaccion: "",
            mostrarId: false

        });

        onMounted(async () => {
            state.mostrarId = false;
            state.idTransaccion = localStorage.getItem("idTransaccion")
            state.mostrarId = true;
        });

        onUnmounted(async () => {
            localStorage.removeItem("idTransaccion")
        });

        return {
            state
        }

    }

}
</script>

<style lang="scss" scoped>
.compra {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
}

#transaccion {
    font-size: 1.5em;
}
</style>
