<template>
<q-dialog v-model="state.promptLocal" persistent>
    <q-card style="min-width: 450px">
        <q-card-section>
            <div class="text-h5">Editar Tipo de Producto</div>
        </q-card-section>

        <q-form @submit.prevent="onSubmit" class="q-gutter-md form-holder">

            <q-card-section class="q-pt-none">
                <q-input filled v-model="state.nombreMaterial" label="Tipo de producto" hint="Ej: Maceta" maxlength="70" lazy-rules :rules="[
                     (val) =>
                        (val && val.length > 0) || 'Por favor, escribe algo',
                     (val) =>
                        (val && val.length < 70) ||
                        'El nombre debe tener menos de 70 caracteres',
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
    name: "FormEditarMaterial",
    props: ["idSeleccionado"],
    setup(props, context) {
        const state = reactive({
            material: null,
            nombreMaterial: null,
            promptLocal: true,
        });

        const $q = useQuasar();

        onMounted(async () => {
            //Cargar material
            var id = props.idSeleccionado;
            const response = await api.get(`Material/${id}`);
            state.material = response.data.payload;
            state.nombreMaterial = state.material.nombreMaterial;
        });

        async function onSubmit() {
            var id = props.idSeleccionado;

            //PUT del material
            const response = await api({
                url: `/Material/${id}`,
                method: "PUT",
                data: {
                    nombreMaterial: state.nombreMaterial
                },
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem("token"),
                }
            });

            //Mensaje de retroalimentaci??n
            if (response && response.status === 200) {
                $q.notify({
                    color: "green-4",
                    textColor: "white",
                    icon: "cloud_done",
                    message: "Tipo de producto modificado exitosamente",
                });
                context.emit("actualizarMateriales", true);
                context.emit("cerrarDialog", true);
            } else if (response && response.status === 201) {
                $q.notify({
                    color: "warning",
                    textColor: "black",
                    icon: "warning",
                    message: "Ya existe un tipo de producto con ese nombre.",
                });
            } else {
                $q.notify({
                    color: "red-5",
                    textColor: "white",
                    icon: "warning",
                    message: "Ocurri?? un problema. Intent??lo de nuevo.",
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
