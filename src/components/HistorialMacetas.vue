<template>
<q-expansion-item class="q-mt-sm text-primary macetas-cliente" icon="yard" label="Tus productos personalizados">
    <div class="wrapper-expansion">
        <q-card v-for="(maceta, index) in state.macetas" :key="index" class="maceta-cliente">

            <q-card-section class="holder">
                <img :src="obtenerImagenUrl(maceta.material, maceta.color, maceta.forma)" alt="imagen maceta base">

                <div class="caracteristicas">
                    <div>{{maceta.material}}</div>
                    <div>{{maceta.forma}}</div>
                    <div>{{maceta.color}}</div>
                    <div>{{maceta.medida}}</div>
                    <div>{{formatter(maceta.precio)}}</div>
                </div>

                <div class="btns">
                    <q-btn dense outline icon="edit" color="primary" @click="this.$emit('editar', maceta)" />
                    <q-btn dense outline icon="delete" color="grey" @click="borrarMaceta(maceta.macetaID)" />
                </div>
            </q-card-section>

        </q-card>
    </div>
</q-expansion-item>
</template>

<script>
import {
    defineComponent,
    onMounted,
    reactive
} from 'vue'
import {
    api
} from 'boot/axios'
import {
    useQuasar
} from 'quasar'

export default defineComponent({
    name: 'MacetasPersonalizadas',
    setup() {

        const clienteID = localStorage.getItem('clienteID');

        const $q = useQuasar();

        const state = reactive({
            showBtms: false,
            macetas: []
        })

        onMounted(async () => {
            //Obtener macetas personalizadas del cliente
            if (clienteID != null)
                await api.get(`/Maceta/Personalizada/${clienteID}`, {
                    headers: {
                        Authorization: 'Bearer ' + localStorage.getItem("token"),
                    }
                })
                .then(res => state.macetas = res.data.payload);
        })

        //Formatear el precio
        function formatter(val) {
            return new Intl.NumberFormat('es-MX', {
                style: 'currency',
                currency: 'MXN',
                minimumFractionDigits: 2
            }).format(val);
        }

        //Eliminar maceta personalizada
        async function borrarMaceta(macetaID) {
            //Mensaje de confirmación
            $q.dialog({
                title: 'Eliminar',
                message: '¿Está seguro que desea eliminar el producto?',
                ok: {
                    push: true,
                    label: "Aceptar",
                    color: "primary",
                    flat: true
                },
                cancel: {
                    label: "Cancelar",
                    color: "grey",
                    flat: true
                },
                persistent: true
            }).onOk(async () => {
                await api.delete(`/Maceta/Personalizada/${clienteID}/${macetaID}`, {
                        headers: {
                            Authorization: 'Bearer ' + localStorage.getItem("token"),
                        }
                    })
                    .then(() => state.macetas = state.macetas.filter(maceta => maceta.macetaID != macetaID))
                    .catch(err => console.log(err))
            });
        }

        //Obtener imagen de la maceta personalizada
        function obtenerImagenUrl(material, color, forma) {

            if (material == 'Fibra de vidrio' && (forma == '' || forma == 'Copa') && (color == '' || color == 'Blanco'))
                return require('../assets/macetas_personalizadas/copa_blanco.png');

            if (material == 'Fibra de vidrio' && (forma == '' || forma == 'Copa') && (color == '' || color == 'Amarillo'))
                return require('../assets/macetas_personalizadas/copa_amarillo.png');

            if (material == 'Fibra de vidrio' && (forma == '' || forma == 'Copa') && (color == '' || color == 'Azul'))
                return require('../assets/macetas_personalizadas/copa_azul.png');

            if (material == 'Fibra de vidrio' && (forma == '' || forma == 'Copa') && (color == '' || color == 'Gris'))
                return require('../assets/macetas_personalizadas/copa_gris.png');

            if (material == 'Fibra de vidrio' && (forma == '' || forma == 'Copa') && (color == '' || color == 'Morado'))
                return require('../assets/macetas_personalizadas/copa_morado.png');

            if (material == 'Fibra de vidrio' && (forma == '' || forma == 'Copa') && (color == '' || color == 'Naranja'))
                return require('../assets/macetas_personalizadas/copa_naranja.png');

            if (material == 'Fibra de vidrio' && (forma == '' || forma == 'Copa') && (color == '' || color == 'Negro'))
                return require('../assets/macetas_personalizadas/copa_negro.png');

            if (material == 'Fibra de vidrio' && (forma == '' || forma == 'Copa') && (color == '' || color == 'Rojo'))
                return require('../assets/macetas_personalizadas/copa_rojo.png');

            if (material == 'Fibra de vidrio' && (forma == '' || forma == 'Copa') && (color == '' || color == 'Rosa'))
                return require('../assets/macetas_personalizadas/copa_rosa.png');

            if (material == 'Fibra de vidrio' && (forma == '' || forma == 'Copa') && (color == '' || color == 'Verde'))
                return require('../assets/macetas_personalizadas/copa_verde.png');

            // Reloj

            if (material == 'Fibra de vidrio' && (forma == 'Reloj') && (color == '' || color == 'Blanco'))
                return require('../assets/macetas_personalizadas/reloj_blanco.png');

            if (material == 'Fibra de vidrio' && (forma == 'Reloj') && (color == '' || color == 'Amarillo'))
                return require('../assets/macetas_personalizadas/reloj_amarillo.png');

            if (material == 'Fibra de vidrio' && (forma == 'Reloj') && (color == '' || color == 'Azul'))
                return require('../assets/macetas_personalizadas/reloj_azul.png');

            if (material == 'Fibra de vidrio' && (forma == 'Reloj') && (color == '' || color == 'Gris'))
                return require('../assets/macetas_personalizadas/reloj_gris.png');

            if (material == 'Fibra de vidrio' && (forma == 'Reloj') && (color == '' || color == 'Morado'))
                return require('../assets/macetas_personalizadas/reloj_morado.png');

            if (material == 'Fibra de vidrio' && (forma == 'Reloj') && (color == '' || color == 'Naranja'))
                return require('../assets/macetas_personalizadas/reloj_naranja.png');

            if (material == 'Fibra de vidrio' && (forma == 'Reloj') && (color == '' || color == 'Negro'))
                return require('../assets/macetas_personalizadas/reloj_negro.png');

            if (material == 'Fibra de vidrio' && (forma == 'Reloj') && (color == '' || color == 'Rojo'))
                return require('../assets/macetas_personalizadas/reloj_rojo.png');

            if (material == 'Fibra de vidrio' && (forma == 'Reloj') && (color == '' || color == 'Rosa'))
                return require('../assets/macetas_personalizadas/reloj_rosa.png');

            if (material == 'Fibra de vidrio' && (forma == 'Reloj') && (color == '' || color == 'Verde'))
                return require('../assets/macetas_personalizadas/reloj_verde.png');

            // Mármol cudrado
            if (material == 'Mármol' && (forma == '' || forma == 'Cuadrangular') && (color == '' || color == 'Blanco'))
                return require('../assets/macetas_personalizadas/cuadrado_blanco.png');
            if (material == 'Mármol' && (forma == '' || forma == 'Cuadrangular') && (color == '' || color == 'Negro'))
                return require('../assets/macetas_personalizadas/cuadrado_negro.png');
            if (material == 'Mármol' && (forma == '' || forma == 'Cuadrangular') && (color == '' || color == 'Gris'))
                return require('../assets/macetas_personalizadas/cuadrado_gris.png');

            // Mármol rectángulo

            if (material == 'Mármol' && (forma == 'Rectangular') && (color == '' || color == 'Blanco'))
                return require('../assets/macetas_personalizadas/rectangulo_blanco.png');
            if (material == 'Mármol' && (forma == 'Rectangular') && (color == '' || color == 'Negro'))
                return require('../assets/macetas_personalizadas/rectangulo_negro.png');
            if (material == 'Mármol' && (forma == 'Rectangular') && (color == '' || color == 'Gris'))
                return require('../assets/macetas_personalizadas/rectangulo_gris.png');

            // Mármol cilindro
            if (material == 'Mármol' && (forma == 'Cilíndrica') && (color == '' || color == 'Blanco'))
                return require('../assets/macetas_personalizadas/cilindro_blanco.png');
            if (material == 'Mármol' && (forma == 'Cilíndrica') && (color == '' || color == 'Negro'))
                return require('../assets/macetas_personalizadas/cilindro_negro.png');
            if (material == 'Mármol' && (forma == 'Cilíndrica') && (color == '' || color == 'Gris'))
                return require('../assets/macetas_personalizadas/cilindro_gris.png');

            return require('../assets/macetas_personalizadas/copa_blanco.png');
        }

        return {
            state,
            formatter,
            borrarMaceta,
            obtenerImagenUrl
        }
    }
})
</script>

<style lang="scss" scoped>
.wrapper-expansion {
    display: flex;
    gap: 0.5rem;
    overflow-y: scroll;
    padding: 0.5rem 0.1rem;

    .maceta-cliente {

        .holder {
            display: grid;
            grid-template-columns: 0.9fr 1fr;
            column-gap: 1rem;
            justify-content: center;
            align-items: center;
            text-align: center;

            img {
                width: 4rem;
                height: 6.5rem;
                object-fit: cover;
                align-self: center;
                margin: auto;
            }

            .caracteristicas {
                padding: 0 1rem;
            }
        }
    }
}

.btns {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-column: 1/-1;
    gap: 0.5rem;
    margin-top: 0.5rem;
}
</style>
