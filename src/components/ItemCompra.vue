<template>
<div id="item">

    <div class="id text-bold">{{id}}</div>

    <img :src="imagenMaceta == '-' ? obtenerImagenUrl(state.material, state.color, state.forma) : imagenMaceta" alt="imagen maceta">

    <div class="info">
        <div class="nombreMaceta"><b>Nombre: </b>{{nombreMaceta}}</div>
        <div class="descripcion"><b>Descripción: </b>{{descripcion}}</div>
    </div>

    <div class="cantidad">{{cantidad}}</div>
    <div class="precio"><b>{{formatter(precio)}} MXN</b></div>

</div>
</template>

<script>
import {
    reactive,
    defineComponent,
    onMounted
} from 'vue'
import {
    api
} from "boot/axios";

export default defineComponent({

    name: 'ItemCompra',
    props: {
        id: {
            type: Number,
            required: true
        },
        imagenMaceta: {
            type: String,
            required: true
        },
        nombreMaceta: {
            type: String,
            required: true
        },
        descripcion: {
            type: String,
            required: true
        },
        cantidad: {
            type: Number,
            required: true
        },
        precio: {
            type: Number,
            required: true
        },
        macetaId: {
            type: Number,
            required: true
        }
    },
    setup(props) {

        const state = reactive({
            material: "",
            color: "",
            forma: ""
        });

        onMounted(async () => {
            //Obtener la maceta
            var id = props.macetaId;
            await api.get('/Maceta/Personalizada/ID/' + id, {
                    headers: {
                        Authorization: 'Bearer ' + localStorage.getItem("token"),
                    }
                })
                .then(response => {
                    console.log(response.data.payload[0]);
                    state.material = response.data.payload[0].material;
                    state.color = response.data.payload[0].color;
                    state.forma = response.data.payload[0].forma;
                })
        })

        //Formatear el precio
        function formatter(val) {
            return new Intl.NumberFormat('es-MX', {
                style: 'currency',
                currency: 'MXN',
                minimumFractionDigits: 1
            }).format(val);
        }

        //Obtener imagen de la maceta
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
            obtenerImagenUrl
        }
    }

})
</script>

<style lang="scss" scoped>
#item {

    display: grid;
    grid-template-columns: 0.1fr 0.5fr 1fr 0.3fr 0.5fr;
    background-color: #f5f5f5;
    align-items: center;
    border-radius: 5px;
    padding: 1rem;
    margin-bottom: 0.5rem;
    width: 50vw;

    .cantidad {
        text-align: center;
    }

    .precio {
        text-align: center;
    }
}

img {
    width: 7rem;
    height: 7rem;
    object-fit: cover;
    border-radius: 5px;
}
</style>
