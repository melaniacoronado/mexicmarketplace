<template>
<q-dialog v-model="state.promptLocal" persistent>
    <q-card style="min-width: 450px">
        <q-card-section>
            <div class="text-h5">Editar Color</div>
        </q-card-section>

        <q-form @submit.prevent="onSubmit" class="q-gutter-md form-holder">
            <q-card-section class="q-pt-none">
                <q-input filled v-model="state.nombreColor" label="Nombre del color" hint="Ej: Azul" maxlength="70" lazy-rules :rules="[
                     (val) =>
                        (val && val.length > 0) || 'Por favor, escribe algo',
                     (val) =>
                        (val && val.length < 70) ||
                        'El nombre debe tener menos de 70 caracteres',
                  ]" />
            </q-card-section>

            <q-card-section class="q-pt-none">
                <q-input filled v-model="state.codigoColor" label="Código del color" hint="Ej: FFD822" maxlength="6" lazy-rules :rules="[
                     (val) =>
                        (val && val.length > 0) || 'Por favor, escribe algo',
                     (val) =>
                        (val && val.length == 6) ||
                        'El nombre debe tener 6 caracteres',
                  ]" />
            </q-card-section>

            <q-card-actions align="right" class="text-primary q-pt-none">
                <q-btn flat label="Cancelar" color="primary" v-close-popup @click="cerrarEdicion" />
                <q-btn label="Aceptar" type="submit" color="primary" />
            </q-card-actions>
        </q-form>
    </q-card>
</q-dialog>
</template>

<script>
import {
    reactive
} from "@vue/reactivity";
import {
    onMounted
} from "@vue/runtime-core";
import {
    api
} from "boot/axios";
import {
    useQuasar
} from "quasar";

export default {
    name: "FormEditarColor",
    props: ["idSeleccionado"],
    setup(props, context) {
        const state = reactive({
            color: null,
            nombreColor: null,
            codigoColor: null,
            promptLocal: true
        });

        const $q = useQuasar();

        onMounted(async () => {
            //Cargar color
            var id = props.idSeleccionado;
            const response = await api.get(`Color/${id}`);
            state.color = response.data.payload;
            state.nombreColor = state.color.nombreColor;
            state.codigoColor = state.color.codigoColor;
        });

        async function onSubmit() {
            var id = props.idSeleccionado;

            //PUT del color
            const response = await api({
                url: `/Color/${id}`,
                method: "PUT",
                data: {
                    nombreColor: state.nombreColor,
                    codigoColor: state.codigoColor
                },
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem("token"),
                }
            });

            //Mensaje de retroalimentación
            if (response && response.status === 200) {
                $q.notify({
                    color: "green-4",
                    textColor: "white",
                    icon: "cloud_done",
                    message: "Color modificado exitosamente",
                });
                context.emit("actualizarColores", true);
                context.emit("cerrarDialog", true);
            } else if (response && response.status === 201) {
                $q.notify({
                    color: "warning",
                    textColor: "black",
                    icon: "warning",
                    message: "Ya existe un color con ese nombre.",
                });
            } else {
                $q.notify({
                    color: "red-5",
                    textColor: "white",
                    icon: "warning",
                    message: "Ocurrió un problema. Intentálo de nuevo.",
                });
            }
        }

        function cerrarEdicion() {
            context.emit("cerrarDialog", true);
        }

        return {
            state,
            onSubmit,
            cerrarEdicion,
        };
    },
};
</script>

<style lang="scss" scoped>
.form-holder {
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
}
</style>
