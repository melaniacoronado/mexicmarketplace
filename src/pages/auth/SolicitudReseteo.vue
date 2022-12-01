<template>
<q-page class="flex flex-center">
    <q-form @submit="onSubmit" class="reseteo-form">
        <h5 class="text-primary">Recuperar Contraseña</h5>

        <div class="linea bg-primary"></div>

        <q-input filled type="email" v-model="state.correo" label="Correo" hint="Ej. juan.perez@gmail.com" lazy-rules :rules="[
               (val) =>
                  (val && val.length > 0) || 'Este campo no puede estar vacío',
               (val) =>
                  val.includes('@') || 'Por favor, escriba un correo válido',
            ]" />

        <div class="botones q-pt-md">
            <q-btn size="1rem" class="q-px-xl q-py-xs" color="primary" label="RECUPERAR" @click="onSubmit" />
            <q-btn flat size="1rem" class="q-px-xl q-py-xs" type="reset" color="primary" label="REGRESAR" @click="this.$router.push('/login')" />
        </div>
    </q-form>
</q-page>
</template>

<script>
import {
    reactive
} from "vue";
import {
    api
} from "boot/axios";
import {
    useQuasar
} from "quasar";
import {
    useRouter
} from "vue-router";

export default {
    name: "SolicitudReseteo",
    setup() {
        document.title = "Recuperar Contraseña";
        const $q = useQuasar();
        const router = useRouter();

        const state = reactive({
            correo: "",
        });

        async function onSubmit() {
            if (state.correo == "") {
                $q.dialog({
                    title: "Error",
                    message: "Por favor, llene todos los campos",
                    color: "negative"
                });
                return;
            }

            $q.loading.show();

            //POST de la solicitud de reseteo
            api.post(`Cliente/Reseteo/${state.correo}`)
                .then(() => {
                    $q.notify({
                        color: "green-4",
                        textColor: "white",
                        icon: "check",
                        message: "Se ha enviado un correo con las instrucciones para recuperar su contraseña",
                    });
                    router.push("/login");
                })
                .catch((err) => {
                    $q.notify({
                        color: "red-5",
                        textColor: "white",
                        icon: "warning",
                        message: "No existe una cuenta de usuario asociada al correo proporcionado.",
                    });
                })
                .finally(() => {
                    $q.loading.hide();
                });
        }

        return {
            state,
            onSubmit,
        };
    },
};
</script>

<style lang="scss" scoped>
.reseteo-form {
    display: flex;
    flex-flow: column nowrap;
    gap: 1.4rem;

    width: 80vw;
    margin: 5rem auto;

    h5 {
        margin: 0;
        font-weight: bold;
    }

    .linea {
        width: 4rem;
        height: 2px;
    }

    .botones {
        display: flex;
        gap: 0.7rem;
    }
}

@media screen and (min-width: 1100px) {
    .reseteo-form {
        width: 50vw;
    }
}
</style>
