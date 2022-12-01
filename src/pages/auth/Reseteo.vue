<template>
<q-page class="flex flex-center">

    <form class="form-holder">

        <p class="titulo q-pb-md">Resetear Contraseña</p>

        <div class="content">
            <div class="campo password q-pb-xl">
                <q-input filled type="password" v-model="state.password" label="Contraseña" hint="La contraseña debe tener más de 8 caracteres, contener 1 letra mayúscula y 1 número" maxlength="50" lazy-rules :rules="[
                (val) =>
                    (val && val.length > 7) ||
                    'La contraseñan debe tener al menos 8 caracteres',
                (val) =>
                    (val && val.length < 50) ||
                    'La contraseñan debe tener menos de 50 caracteres',
                    (val) =>
                (val && val.search(/[A-Z]/) != -1) ||
                    'La contraseña debe tener una letra mayúscula',
                (val) =>
                    (val && val.search(/[0-9]/) != -1) ||
                    'La contraseña debe tener un número',
                ]" />
            </div>

            <div class="campo confirmacion-password">

                <q-input filled type="password" v-model="state.confirmacionPassword" label="Confirmación de contraseña" hint="Ingresa la contraseña de nuevo" maxlength="50" lazy-rules :rules="[
                (val) =>
                    (val && val.length > 7) ||
                    'La contraseñan debe tener al menos 8 caracteres',
                (val) =>
                    (val && val.length < 50) ||
                    'La contraseñan debe tener menos de 50 caracteres',
                    (val) =>
                        val === state.password ||
                        'Las contraseñas no coinciden',
                ]" />
            </div>

            <div class="campo botones">
                <q-btn size="1rem" class="q-px-xl q-py-xs" color="primary" label="ACTUALIZAR" @click="onSubmit" />
                <q-btn flat size="1rem" class="q-px-xl q-py-xs" color="primary" label="CANCELAR" @click="this.$router.go(-1)" />
            </div>

        </div>
    </form>

</q-page>
</template>

<script>
import {
    reactive,
    computed
} from "vue";
import {
    api
} from "boot/axios";
import {
    useQuasar
} from "quasar";
import {
    useRoute,
    useRouter
} from "vue-router";

export default {
    name: "Reseteo",
    setup() {
        document.title = "Resetear Contraseña";

        const route = useRoute();
        const router = useRouter();
        const paramCorreo = computed(() => route.params.correo).value;
        const $q = useQuasar();

        const state = reactive({
            correo: paramCorreo,
            password: "",
            confirmacionPassword: "",
        });

        function onSubmit() {

            if (state.password.length < 8) {
                $q.notify({
                    color: "red-5",
                    textColor: "white",
                    icon: "warning",
                    message: "Corrige los campos en rojo.",
                });
                return;
            }

            if (state.confirmacionPassword.length < 8) {
                $q.notify({
                    color: "red-5",
                    textColor: "white",
                    icon: "warning",
                    message: "Corrige los campos en rojo.",
                });
                return;
            }

            if (state.password !== state.confirmacionPassword) {
                $q.notify({
                    color: "red-5",
                    textColor: "white",
                    icon: "warning",
                    message: "Las contraseñas no coinciden.",
                });
                return;
            }

            $q.loading.show();

            api.post('/Cliente/CambiarPassword', {
                    Correo: state.correo,
                    Password: state.password
                }).then((response) => {
                    $q.notify({
                        color: "green-4",
                        textColor: "white",
                        icon: "check",
                        message: "Contraseña actualizada correctamente.",
                    });
                    router.push("/login");
                })
                .catch((error) => {
                    $q.notify({
                        color: "red-5",
                        textColor: "white",
                        icon: "warning",
                        message: "Ha ocurrido un error. Inténtelo de nuevo.",
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
.form-holder {
    padding: 0;
    margin: 0;
    margin-top: 0.7rem;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    .titulo {
        font-size: 1.5rem;
        font-weight: bold;
        margin-bottom: 1rem;
    }

    .foto {
        display: flex;
        justify-content: center;
        align-items: center;
        margin-bottom: 0.7rem;

        .sub-icon {
            position: fixed;
            opacity: 0.1rem;
            cursor: pointer;
        }

        img {
            width: 7rem;
            height: 7rem;
            border-radius: 25%;
            margin-bottom: 0.7rem;
            transition: all 0.3s ease;

            &:hover {
                transform: scale(1.1);
                cursor: pointer;
            }
        }
    }

    .content {
        display: grid;
        width: 40rem;
        grid-template-columns: 1fr 1fr;
        grid-gap: 0 0.7rem;

        .botones {
            grid-column: 1/-1;
            display: flex;
            gap: 0.7rem;
        }
    }
}
</style>
