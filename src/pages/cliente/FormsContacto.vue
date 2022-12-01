<template>
<q-page>

    <div class="tools q-pb-xl">
        <div class="titulo">Contacto</div>
    </div>

    <h4 class="fit row justify-center q-pb-md text-primary">¿Quieres una meceta personalizada según tus necesidades? Completa el formulario para hacer tu pedido.</h4>

    <form class="container" @submit.prevent="enviarCorreo">
        <div class="box">

            <q-input filled type="text" v-model="state.nombre" label="Nombre" hint="Ej. Juan" maxlength="50" lazy-rules :rules="[
               (val) =>
                  (val && val.length > 0) || 'Este campo no puede estar vacío',
               (val) =>
                  (val && val.length < 50) ||
                  'El nombre debe tener menos de 50 caracteres',
            ]" />

            <q-input filled type="text" v-model="state.apellidos" label="Apellidos" hint="Ej. Pérez González" maxlength="50" lazy-rules :rules="[
               (val) =>
                  (val && val.length > 0) || 'Este campo no puede estar vacío',
               (val) =>
                  (val && val.length < 50) ||
                  'Los apellidos deben tener menos de 50 caracteres',
            ]" />

        </div>
        <div class="box">

            <q-input filled type="email" v-model="state.correo" label="Correo" hint="Ej. juan.perez@gmail.com" maxlength="50" lazy-rules :rules="[
               (val) =>
                  (val && val.length > 0) || 'Este campo no puede estar vacío',
               (val) =>
                  val.includes('@') || 'Por favor, escriba un correo válido',
               (val) =>
                  (val && val.length < 50) ||
                  'El correo debe tener menos de 50 caracteres',
            ]" />

            <q-input filled type="tel" mask="phone" v-model="state.telefonoMail" label="Teléfono" hint="Ej. (818) 323 - 8328" lazy-rules :rules="[
               (val) =>
                  (val && val.length > 0) || 'Este campo no puede estar vacío',
                  (val) =>
                    (val && val.length == 16) || 'El número de teléfono debe tener 10 dígitos',
            ]" />

        </div>
        <div class="box-descripcion">
            <q-input filled type="textarea" v-model="state.descripcionMail" maxlength="501" autogrow label="Descripción" lazy-rules :rules="[
               (val) =>
                  (val && val.length > 0) || 'Este campo no puede estar vacío',
               (val) =>
                  (val && val.length < 500) ||
                  'El correo debe tener menos de 500 caracteres',
            ]" />
        </div>

        <div class="fit row justify-center q-pb-md">
            <q-btn type="submit" color="primary" padding=".8rem 4rem" label="Enviar" />
        </div>
    </form>

    <h4 class="fit row justify-center q-pb-md text-primary">O también puedes mandar un mensaje de WhatsApp</h4>

    <form class="container" @submit.prevent="enviarWA">

        <div class="fit row justify-center q-pt-md">

            <div class="box-descripcion">
                <q-input filled type="textarea" v-model="state.descripcionWA" maxlength="501" autogrow label="Descripción" lazy-rules :rules="[
               (val) =>
                  (val && val.length > 0) || 'Este campo no puede estar vacío',
               (val) =>
                  (val && val.length < 500) ||
                  'El correo debe tener menos de 500 caracteres',
            ]" />
            </div>

        </div>

        <div class="fit row justify-center q-pb-md">
            <q-btn type="submit" color="primary" padding=".8rem 2rem" label="Abrir WhatsApp" />
        </div>

    </form>

</q-page>
</template>

<script>
import {
    api
} from "boot/axios";
import {
    reactive
} from "vue";
import {
    useQuasar
} from 'quasar';
import settings from '../../config'

export default {
    name: "GestionMacetas",
    setup(props, context) {
        document.title = "Contacto";

        const $q = useQuasar();

        const state = reactive({
            nombre: "",
            correo: "",
            telefonoMail: null,
            telefonoWA: null,
            apellidos: "",
            descripcionMail: "",
            descripcionWA: ""
        });

        async function enviarCorreo() {
            //Validaciones
            if (
                state.nombre == "" ||
                state.correo == "" ||
                state.telefonoMail == "" ||
                state.apellidos == "" ||
                state.descripcionMail == ""
            ) {
                $q.notify({
                    color: "red-5",
                    textColor: "white",
                    icon: "warning",
                    message: "Por favor, llena todos los campos.",
                });
                return;
            }

            if (state.telefonoMail.length < 16) {
                $q.notify({
                    color: "red-5",
                    textColor: "white",
                    icon: "warning",
                    message: "Corrige los campos en rojo.",
                });
                return;
            }

            $q.loading.show();

            //POST del formulario
            const response = await api({
                url: "/Forms",
                method: "POST",
                data: {
                    nombre: state.nombre,
                    apellidos: state.apellidos,
                    telefono: state.telefonoMail,
                    correo: state.correo,
                    descripcion: state.descripcionMail
                },
            });
            //Mensaje de retroalimentación
            if (response.status == 200) {
                $q.loading.hide();
                $q.notify({
                    color: "green-4",
                    textColor: "white",
                    icon: "check",
                    message: "En breve, alguien se pondrá en contacto con usted.",
                });
            }
        }

        //Mandar formulario de WhatsApp
        function enviarWA() {
            if (
                state.descripcionWA == ""
            ) {
                $q.notify({
                    color: "red-5",
                    textColor: "white",
                    icon: "warning",
                    message: "Por favor, llena todos los campos.",
                });
                return;
            }

            //Obtener número del archivo de configuración
            var tel = `${settings["numero"]}`
            tel = tel.replace(/[^a-zA-Z0-9]/g, '');
            var url = "https://api.whatsapp.com/send?phone=" + tel + "&text=" + state.descripcionWA;

            //Abrir ventana de WhatsApp
            window.open(url, "_blank");

        }

        return {
            state,
            enviarCorreo,
            enviarWA
        };
    },
};
</script>

<style lang="scss" scoped>
h4 {
    margin: 0;
    padding: 0;
    margin-top: 1rem;
    font-weight: 400;
    font-size: 22px;
}

.container {
    display: flex;
    flex-flow: column nowrap;
    align-items: center;
    border-radius: 10px;
    background-color: #f4f4f4;
    padding: 1rem 0 0.5rem 0;
    margin-top: 0.5rem;

}

.box {
    position: relative;
    width: 80%;
    padding: 10px;
    margin: 1%;
    text-align: center;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;

    input {
        width: 100%;
    }
}

.box-descripcion {
    position: relative;
    width: 80%;
    padding: 10px;
    margin: 1%;
    text-align: center;
    display: grid;
    grid-template-columns: 1fr;
}

textarea {
    resize: none;
}
</style>
