<template>
<div id="maceta" @click="this.$router.push(`/producto/${id}`)">

    <div class="img-holder">
        <img :src="imagen" alt="imagen de la maceta">
        <div class="label material bg-secondary">{{material}}</div>
    </div>

    <div class="info">
        <div class="wrapper">
            <div class="titulo">{{nombre}}</div>
            <div class="precio">{{formatter(precio)}} MXN</div>
        </div>

        <div class="descripcion">{{descripcion}}</div>
    </div>

</div>
</template>

<script>
import {
    defineComponent
} from 'vue'

export default defineComponent({

    name: 'Maceta',
    props: {
        id: {
            type: Number,
            required: true
        },
        imagen: {
            type: String,
            required: true
        },
        nombre: {
            type: String,
            required: true
        },
        descripcion: {
            type: String,
            required: true
        },
        precio: {
            type: Number,
            required: true
        },
        material: {
            type: String,
            required: true
        },
    },
    setup() {

        //Formatear el precio
        function formatter(val) {
            return new Intl.NumberFormat('es-MX', {
                style: 'currency',
                currency: 'MXN',
                minimumFractionDigits: 2
            }).format(val);
        }

        return {
            formatter
        }
    }

})
</script>

<style lang="scss" scoped>
#maceta {
    display: flex;
    flex-flow: column nowrap;
    align-items: center;
    background-color: #f5f5f5;
    border-radius: 10px;
    padding: 1rem;
    margin-top: 0.5rem;
    transition: transform 0.3s ease-in-out;

    &:hover {
        cursor: pointer;
        transform: scale(1.03, 1.03);
        background-color: #e6e6e6;
    }
}

.img-holder {

    img {
        width: 13rem;
        height: 13rem;
        object-fit: cover;
        border-radius: 5%;
    }

    .label {
        font-size: 0.75rem;
        padding: 0.1rem 0.5rem;
        border-radius: 0 0 5px 5px;
        text-align: center;
        font-weight: bold;
        position: relative;
        top: -1rem;
    }

}

.info {
    .wrapper {
        display: flex;
        flex-flow: column nowrap;
        align-items: center;
    }

    .titulo {
        font-size: 1.2rem;
        font-weight: bold;
        color: #333;
        text-align: center;
    }

    .precio {
        font-size: 1.3rem;
        font-weight: bold;
        color: #c5a241;
    }

    .descripcion {
        color: rgb(97, 96, 96);
        text-align: center;
        margin-top: 0.5rem;
    }
}
</style>
