<template>
<q-page class="flex flex-center">
    <q-form @submit="onSubmit" @reset="onClean" class="login-form">
        <h5 class="text-primary">Crear cuenta</h5>

        <div class="linea bg-primary"></div>

        <q-input filled type="text" v-model="state.nombreCliente" label="Nombre" hint="Ej. Juan" maxlength="50" lazy-rules :rules="[
               (val) =>
                  (val && val.length > 0) || 'Este campo no puede estar vacío',
               (val) =>
                  (val && val.length < 50) ||
                  'El nombre debe tener menos de 50 caracteres',
            ]" />

        <q-input filled type="text" v-model="state.apellidoCliente" label="Apellidos" hint="Ej. Pérez González" maxlength="50" lazy-rules :rules="[
               (val) =>
                  (val && val.length > 0) || 'Este campo no puede estar vacío',
               (val) =>
                  (val && val.length < 50) ||
                  'Los apellidos deben tener menos de 50 caracteres',
            ]" />

        <q-input filled type="text" mask="phone" v-model="state.telefonoCliente" label="Teléfono" hint="Ej. (818) 323 - 8328" lazy-rules :rules="[
               (val) =>
                  (val && val.length > 0) || 'Este campo no puede estar vacío',
               (val) =>
                  (val && val.length == 16) || 'El número de teléfono debe tener 10 dígitos',
            ]" />

        <q-input filled type="email" v-model="state.emailCliente" label="Correo" hint="Ej. juan.perez@gmail.com" maxlength="50" lazy-rules :rules="[
               (val) =>
                  (val && val.length > 0) || 'Este campo no puede estar vacío',
               (val) =>
                  val.includes('@') || 'Por favor, escriba un correo válido',
               (val) =>
                  (val && val.length < 50) ||
                  'El correo debe tener menos de 50 caracteres',
            ]" />

        <q-input filled type="date" v-model="state.fechaNacimiento" label="Fecha de nacimiento" mask="##/##/####" stack-label hint="Ej. 10/02/1999" lazy-rules :rules="[
               (val) =>
                  (val && val.length > 0) || 'Este campo no puede estar vacío',
               (val) =>
                  (val && val.length == 10) ||
                  'La fecha debe tener el formato dd/mm/aaaa',
            ]" />

        <q-input filled type="password" v-model="state.password" label="Contraseña" hint="La contraseña debe tener más de 8 caracteres, contener 1 letra mayúscula y 1 número" maxlength="50" lazy-rules :rules="[
               (val) =>
                  (val && val.length > 7) ||
                  'La contraseña debe tener al menos 8 caracteres',
               (val) =>
                  (val && val.length < 50) ||
                  'La contraseña debe tener menos de 50 caracteres',
                (val) =>
                  (val && val.search(/[A-Z]/) != -1) ||
                  'La contraseña debe tener una letra mayúscula',
                (val) =>
                  (val && val.search(/[0-9]/) != -1) ||
                  'La contraseña debe tener un número',
            ]" />

        <div class="botones">
            <q-btn size="1rem" class="q-px-xl q-py-xs" color="primary" label="Crear cuenta" @click="onSubmit" />
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
export default {
    name: "CrearCuenta",
    setup() {
        document.title = "Crear Cuenta";
        const $q = useQuasar();
        const router = useRouter();

        const state = reactive({
            nombreCliente: "",
            apellidoCliente: "",
            telefonoCliente: "",
            emailCliente: "",
            fechaNacimiento: "",
            password: "",
        });

        onMounted(() => {});

        //Limpiar los campos
        function onClean() {
            nombreCliente = "";
            apellidoCliente = "";
            telefonoCliente = "";
            emailCliente = "";
            fechaNacimiento = "";
            password = "";
        }

        async function onSubmit() {
            //Validaciones
            if (
                state.nombreCliente == "" ||
                state.apellidoCliente == "" ||
                state.telefonoCliente == "" ||
                state.emailCliente == "" ||
                state.fechaNacimiento == "" ||
                state.password == ""
            ) {
                $q.notify({
                    color: "red-5",
                    textColor: "white",
                    icon: "warning",
                    message: "Por favor, llena todos los campos.",
                });
                return;
            }

            if (state.password.length < 8) {
                $q.notify({
                    color: "red-5",
                    textColor: "white",
                    icon: "warning",
                    message: "Corrige los campos en rojo.",
                });
                return;
            }

            if (state.telefonoCliente.length < 16) {
                $q.notify({
                    color: "red-5",
                    textColor: "white",
                    icon: "warning",
                    message: "Corrige los campos en rojo.",
                });
                return;
            }

            const data = {
                nombreCliente: state.nombreCliente,
                apellidoCliente: state.apellidoCliente,
                telefonoCliente: state.telefonoCliente,
                emailCliente: state.emailCliente,
                fechaNacimiento: state.fechaNacimiento,
                password: state.password,
            };

            $q.loading.show();

            //POST del usuario
            const response = await api
                .post("Cliente/Agregar", {
                    nombreCliente: state.nombreCliente,
                    apellidoCliente: state.apellidoCliente,
                    telefonoCliente: state.telefonoCliente,
                    emailCliente: state.emailCliente,
                    fechaNacimiento: state.fechaNacimiento,
                    password: state.password,
                })
                .catch((error) => {
                    $q.notify({
                        color: "red-5",
                        textColor: "white",
                        icon: "warning",
                        message: "Ocurrió un problema. Intentálo de nuevo.",
                    });
                    return;
                })
                .finally(() => {
                    $q.loading.hide();
                });

            if (response.status == 201) {
                $q.notify({
                    color: "warning",
                    textColor: "black",
                    icon: "warning",
                    message: "Ya existe un cuenta asociada al correo proporcionado.",
                });
            }

            if (response.status != 200) return;

            $q.notify({
                color: "green-4",
                textColor: "white",
                icon: "check",
                message: "Cuenta creada exitosamente.",
            });

            // Delay de 2 segundos
            setTimeout(() => {
                iniciarSesion();
            }, 2000);

        }

        //Iniciar sesión
        async function iniciarSesion() {
            const response = await api
                .post("Cliente/Login", {
                    correo: state.emailCliente,
                    password: state.password,
                })
                .catch((error) => {
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

            if (response.status != 200) return;

            //Guardar los items necesarios en localStorage
            localStorage.setItem("clienteID", response.data.payload.clienteId);
            localStorage.setItem("emailCliente", response.data.payload.emailCliente);
            localStorage.setItem("nombreCliente", response.data.payload.nombreCliente);
            localStorage.setItem("apellidosCliente", response.data.payload.apellidoCliente);
            localStorage.setItem("telefonoCliente", response.data.payload.telefonoCliente);
            localStorage.setItem("token", response.data.payload.token);

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

            location.replace("/");
        }

        return {
            state,
            onClean,
            onSubmit,
        };
    },
};
</script>

<style lang="scss" scoped>
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
