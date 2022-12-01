<template>
<q-page class="flex flex-center">
    <q-form @submit.prevent="onSubmit" @reset="onClean" class="login-form">
        <h5 class="text-primary">Iniciar Sesión</h5>

        <div class="linea bg-primary"></div>

        <q-input filled type="email" v-model="state.correo" label="Correo" hint="Ej. juan.perez@gmail.com" lazy-rules :rules="[
               (val) =>
                  (val && val.length > 0) || 'Este campo no puede estar vacío',
               (val) =>
                  val.includes('@') || 'Por favor, escriba un correo válido',
            ]" />

        <q-input filled type="password" v-model="state.password" label="Contraseña" hint="contraseña123" lazy-rules :rules="[
               (val) =>
                  (val && val.length > 0) || 'Este campo no puede estar vacío',
            ]" />

        <router-link to="/solicitud_reseteo" class="text-primary">
            ¿Olvidaste tu contraseña?
        </router-link>

        <router-link to="/crear_cuenta" class="text-primary">
            Crear cuenta
        </router-link>

        <div class="botones">
            <q-btn size="1rem" class="q-px-xl q-py-xs" color="primary" label="ACCEDER" type="submit" />
            <q-btn flat size="1rem" class="q-px-xl q-py-xs" type="reset" color="primary" label="LIMPIAR" />
        </div>
    </q-form>
</q-page>
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
import {
    useRouter
} from "vue-router";
import jwt_decode from "jwt-decode";
export default {
    name: "Login",
    setup() {
        document.title = "Iniciar Sesión";
        const $q = useQuasar();
        const router = useRouter();

        const state = reactive({
            correo: "",
            password: "",
        });

        onMounted(() => {});

        //Limpiar los campos
        function onClean() {
            state.correo = "";
            state.password = "";
        }

        async function onSubmit() {
            //Validaciones
            if (state.correo == "" || state.password == "") {
                $q.notify({
                    color: "red-5",
                    textColor: "white",
                    icon: "warning",
                    message: "Por favor, llena todos los campos.",
                });
                return;
            }

            $q.loading.show();

            //POST del login
            const response = await api.post("Cliente/Login", {
                    correo: state.correo,
                    password: state.password,
                })
                .catch(() => {
                    $q.notify({
                        color: "red-5",
                        textColor: "white",
                        icon: "warning",
                        message: "Credenciales incorrectas.",
                    });
                    return;
                })
                .finally(() => {
                    $q.loading.hide();
                });

            if (response.status === 201)
                router.push({
                    name: "Reseteo",
                    params: {
                        correo: state.correo
                    },
                });

            if (response.status != 200) return;

            //Guardar los items necesarios en localStorage
            localStorage.setItem("clienteID", response.data.payload.clienteId);
            localStorage.setItem("emailCliente", response.data.payload.emailCliente);
            localStorage.setItem("nombreCliente", response.data.payload.nombreCliente);
            localStorage.setItem("apellidosCliente", response.data.payload.apellidoCliente);
            localStorage.setItem("telefonoCliente", response.data.payload.telefonoCliente);
            localStorage.setItem("token", response.data.payload.token);

            var decoded = jwt_decode(response.data.payload.token);
            localStorage.setItem("auth", decoded.auth);

            window.dispatchEvent(new CustomEvent('token-localstorage-changed', {
                detail: {
                    storage: localStorage.getItem('token')
                }
            }));

            window.dispatchEvent(new CustomEvent('nombre-localstorage-changed', {
                detail: {
                    storage: localStorage.getItem('nombreCliente')
                }
            }));

            $q.notify({
                color: "green-4",
                textColor: "white",
                icon: "check",
                message: "Inicio de sesión exitoso.",
            });

            location.replace("/");
        }
        return {
            state,
            onClean,
            onSubmit
        }

    }
}
</script>

<style lang="scss">
.login-form {
    display: flex;
    flex-flow: column nowrap;
    gap: 1.4rem;
    max-width: 90%;

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
    .login-form {
        width: 50vw;
    }
}
</style>
