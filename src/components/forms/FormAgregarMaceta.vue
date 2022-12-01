<template>
<q-dialog v-model="state.promptLocal" persistent>
    <q-card style="min-width: 450px">
        <q-card-section>
            <div class="text-h5">Agregar Producto</div>
        </q-card-section>

        <q-form @submit.prevent="onSubmit" class="q-gutter-md form-holder">
            <div class="foto" id="foto-maceta" @mouseout="state.subIcon = false" @mouseover="state.subIcon = true">
                <img id="img-maceta" src="https://www.gravatar.com/avatar/{{ md5(Auth::user()->email) }}?d=identicon&s=200" alt="imagen default" />
                <q-icon name="upload" color="grey" size="4rem" class="sub-icon" v-show="state.subIcon" @click="uploadFoto" />
                <input type="file" id="file-upload" style="display: none" accept="image/*" @change="alterFoto" />
            </div>

            <q-card-section class="q-pt-none">
                <q-input filled v-model="state.nombreMaceta" label="Nombre del producto" hint="Ej: Jarrón de cerámica" maxlength="70" lazy-rules :rules="[
                     (val) =>
                        (val && val.length > 0) || 'Por favor, escribe algo',
                     (val) =>
                        (val && val.length < 70) ||
                        'El nombre debe tener menos de 70 caracteres',
                  ]" />
            </q-card-section>

            <q-card-section class="q-pt-none">
                <q-input filled v-model="state.descripcionMaceta" label="Descripción del producto" hint="Ej: Pieza elaborada con cerámica y pintada de colores brillantes" maxlength="70" lazy-rules :rules="[
                     (val) =>
                        (val && val.length > 0) || 'Por favor, escribe algo',
                     (val) =>
                        (val && val.length < 70) ||
                        'El nombre debe tener menos de 500 caracteres',
                  ]" />
            </q-card-section>

            <q-card-section class="q-pt-none">
                <q-select filled v-model="state.nombreMaterial" hint="Ej: Cerámica" :options="state.opcionesMateriales" label="Tipo" />
            </q-card-section>

            <q-card-section class="q-pt-none">
                <q-input filled v-model.lazy="state.precio" v-money="state.money" label="Precio" hint="Ej: 280.00" maxlength="20" lazy-rules :rules="[
                     (val) =>
                        (val && val.length > 9) || 'Por favor, escribe algo',
                     (val) =>
                        (val && val.length < 70) ||
                        'Introduce una cantidad menor',
                  ]" />
            </q-card-section>

            <q-card-actions align="right" class="text-primary q-pt-none">
                <q-btn flat label="Cancelar" color="primary" v-close-popup @click="cerrarAgregado" />
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
import {
    ref
} from "vue";
import {
    VMoney
} from 'v-money'

export default {
    name: "FormAgregarMaceta",
    directives: {
        money: VMoney
    },
    setup(props, context) {
        const state = reactive({
            maceta: null,
            nombreMaceta: null,
            descripcionMaceta: null,
            nombreMaterial: null,
            imagenMaceta: null,
            promptLocal: true,
            opcionesMateriales: [],
            subIcon: false,
            foto: "",
            precio: 0,
            money: {
                decimal: '.',
                thousands: ',',
                prefix: '$ ',
                suffix: ' MXN',
                precision: 2,
                masked: false,
                min: 0.00
            }
        });

        const $q = useQuasar();

        onMounted(async () => {
            getMateriales();
        });

        //Cargar materiales disponibles
        async function getMateriales() {
            await api.get("/Material").then((res) => {
                res.data.payload.forEach((m) => {
                    state.opcionesMateriales.push({
                        value: m.materialId,
                        label: m.nombreMaterial,
                    });
                });
            });
        }

        async function onSubmit() {

            //Formatear el precio
            var precioBD = String(state.precio);
            precioBD = precioBD.substring(2);
            precioBD = precioBD.split(" ");
            state.precio = precioBD[0].replace(",", "");

            //POST de la maceta
            if (state.foto != "") {
                const response = await api({
                    url: "/Maceta",
                    method: "POST",
                    data: {
                        nombreMaceta: state.nombreMaceta,
                        descripcion: state.descripcionMaceta,
                        materialID: state.nombreMaterial.value,
                        precio: state.precio,
                        imagenMaceta: state.foto == "" ? null : state.foto,
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
                        message: "Producto agregado exitosamente",
                    });
                    context.emit("actualizarMacetas", true);
                    context.emit("cerrarDialog", true);
                } else if (response && response.status === 201) {
                    $q.notify({
                        color: "warning",
                        textColor: "black",
                        icon: "warning",
                        message: "Ya existe un producto con ese nombre.",
                    });
                } else {
                    $q.notify({
                        color: "red-5",
                        textColor: "white",
                        icon: "warning",
                        message: "Ocurrió un problema. Intentálo de nuevo.",
                    });
                }
            } else {
                $q.notify({
                    color: "warning",
                    textColor: "black",
                    icon: "warning",
                    message: "Agrega una imagen.",
                });
            }
        }

        //Cargar foto
        function uploadFoto() {
            let fileupload = document.getElementById("file-upload");
            let holder = document.getElementById("foto-maceta");
            let img = document.getElementById("img-maceta");

            holder.onclick = () => fileupload.click();
            fileupload.onchange = () =>
                (img.src = URL.createObjectURL(fileupload.files[0]));
        }

        //Convertir Base64
        function getBase64(file) {
            return new Promise(function (resolve, reject) {
                var reader = new FileReader();
                reader.onload = () => resolve(reader.result);
                reader.onerror = reject;
                reader.readAsDataURL(file);
            });
        }

        //Formatear foto
        async function alterFoto(event) {
            let result = await getBase64(event.target.files[0]);
            state.foto = result;
        }

        function cerrarAgregado() {
            context.emit("cerrarDialog", true);
        }

        return {
            state,
            onSubmit,
            cerrarAgregado,
            getBase64,
            alterFoto,
            uploadFoto,
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
