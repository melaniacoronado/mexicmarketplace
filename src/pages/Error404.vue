<template>
<div class="fullscreen bg-primary text-white text-center q-pa-md flex flex-center">
    <div>
        <div style="font-size: 30vh">
            <q-icon name="error" />
        </div>

        <div class="text-h2" style="opacity:.4">
            Oops. No hay nada aqui...
        </div>

        <q-btn class="q-mt-xl" color="white" text-color="primary" unelevated to="/" label="REGRESAR" />
    </div>
</div>
</template>

<script>
import {
    defineComponent
} from 'vue'

export default defineComponent({
    name: 'Error404'
})
</script>
