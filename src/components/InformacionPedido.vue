<template>
<div>
    <div class="wrapper">
        <class class="items">
            <div class="item" v-for="(item, index) in state.items" :key="index">
                <ItemCompraCliente :id="index+1" v-bind="item" />
            </div>
        </class>
    </div>

</div>
</template>

<script>
import {
    defineComponent,
    reactive,
    onMounted
} from 'vue'
import ItemCompraCliente from "components/ItemCompraCliente.vue";
import {
    api
} from "boot/axios";

export default defineComponent({
    name: 'InformacionPedido',
    components: {
        ItemCompraCliente
    },
    setup(props, context) {

        const state = reactive({
            items: []
        })

        onMounted(async () => {
            //Obtener los items del pedido
            await api.get(`/CarritoCompras/${localStorage.getItem("clienteID")}`, {
                    headers: {
                        Authorization: 'Bearer ' + localStorage.getItem("token"),
                    }
                })
                .then(response => {
                    let i = 0;
                    let precio = 0
                    response.data.payload.forEach(element => {
                        state.items.push({
                            id: ++i,
                            imagenMaceta: element.personalizada ? obtenerImagenUrl(element.nombreMaterial, element.nombreColor, element.nombreForma) : element.imagenMaceta,
                            nombreMaceta: element.nombreMaceta,
                            cantidad: element.cantidad,
                            precio: element.precio
                        });
                        precio += element.precio * element.cantidad
                    });
                    context.emit("precioCalculado", precio);
                });

        })

        //Obtener la imagen de la maceta
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
            state
        }
    }
})
</script>

<style lang="scss" scoped>
.wrapper {
    border: 1px solid #bbb9b957;
    margin: 1px;
    display: flex;
    flex-flow: column nowrap;
}

.header {
    display: flex;
    justify-content: space-between;
    align-items: center;

}

.estatus {
    width: 50%;
    margin: auto;
}
</style>
