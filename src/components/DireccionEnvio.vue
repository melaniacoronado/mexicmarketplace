<template>
<form class="form-holder">

    <div class="content">

        <div class="q-pb-md">
            <q-input disable filled type="text" v-model="state.nombre" label="Nombre" />

        </div>

        <div class="q-pb-md">
            <q-input disable filled type="text" v-model="state.apellidos" label="Apellidos" />

        </div>

        <div class="q-pb-md">
            <q-input disable filled type="email" v-model="state.correo" label="Correo" />
        </div>

        <div class="q-pb-md">
            <q-input disable filled type="text" mask="phone" v-model="state.telefono" label="Teléfono" />
        </div>

        <div>
            <q-input :disable="state.disable" filled type="text" v-model="state.calle" label="Calle" maxlength="50" lazy-rules :rules="[
               (val) =>
                  (val && val.length > 0) || 'Este campo no puede estar vacío',
               (val) =>
                  (val && val.length < 50) ||
                  'El nombre debe tener menos de 50 caracteres',
            ]" />
        </div>

        <div>
            <q-input :disable="state.disable" filled type="text" v-model="state.numero" label="Número" maxlength="5" mask="#####" lazy-rules :rules="[
               (val) =>
                  (val && val.length > 0) || 'Este campo no puede estar vacío',
               (val) =>
                  (val && val.length < 6) ||
                  'El nombre debe tener menos de 6 caracteres',
            ]" />
        </div>

        <div>
            <q-input :disable="state.disable" filled type="text" v-model="state.colonia" label="Colonia" maxlength="50" lazy-rules :rules="[
               (val) =>
                  (val && val.length > 0) || 'Este campo no puede estar vacío',
               (val) =>
                  (val && val.length < 50) ||
                  'El nombre debe tener menos de 50 caracteres',
            ]" />
        </div>

        <div>
            <q-input :disable="state.disable" filled type="text" v-model="state.ciudad" label="Ciudad" maxlength="50" lazy-rules :rules="[
               (val) =>
                  (val && val.length > 0) || 'Este campo no puede estar vacío',
               (val) =>
                  (val && val.length < 50) ||
                  'El nombre debe tener menos de 50 caracteres',
            ]" />
        </div>

        <div>
            <q-input :disable="state.disable" filled type="text" v-model="state.estado" label="Estado" maxlength="50" lazy-rules :rules="[
               (val) =>
                  (val && val.length > 0) || 'Este campo no puede estar vacío',
               (val) =>
                  (val && val.length < 50) ||
                  'El nombre debe tener menos de 50 caracteres',
            ]" />
        </div>

        <div>
            <q-input :disable="state.disable" filled type="text" v-model="state.codigoPostal" label="Código postal" maxlength="5" mask="#####" lazy-rules :rules="[
               (val) =>
                  (val && val.length > 0) || 'Este campo no puede estar vacío',
               (val) =>
                  (val && val.length == 5) ||
                  'El código postal debe tener 5 caracteres',
            ]" />
        </div>
    </div>
    <div class="fit row justify-center q-pt-sm">
        <div>
            <q-btn v-if="state.mostrarEditar" flat color="primary" @click="editarDireccion" label="Editar" />
            <q-btn v-if="state.mostrarGuardar" flat color="primary" @click="guardarDireccion" label="Guardar" />
        </div>
    </div>

</form>
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

export default {
    name: "DireccionEnvio",
    setup(props, context) {

        const $q = useQuasar();

        const state = reactive({

            nombre: localStorage.getItem("nombreCliente"),
            apellidos: localStorage.getItem("apellidosCliente"),
            correo: localStorage.getItem("emailCliente"),
            telefono: localStorage.getItem("telefonoCliente"),
            calle: "",
            numero: "",
            colonia: "",
            ciudad: "",
            estado: "",
            codigoPostal: "",
            direccionID: null,
            disable: false,
            cont: 0,
            mostrarGuardar: true,
            mostrarEditar: false,
            modificacion: false
        });

        onMounted(async () => {

            //Obtener dirección de envío si que ya existe una
            var response = await api.get("/Checkout/Direccion/Cliente/" + localStorage.getItem("clienteID"), {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem("token"),
                }
            });
            if (response != null) {
                state.disable = true;
                state.mostrarGuardar = false;
                state.mostrarEditar = true;
                state.modificacion = true;
                state.direccionID = response.data.payload.direccionId;
                state.calle = response.data.payload.calle;
                state.numero = response.data.payload.numero;
                state.colonia = response.data.payload.colonia;
                state.ciudad = response.data.payload.ciudad;
                state.estado = response.data.payload.estado;
                state.codigoPostal = response.data.payload.codigoPostal;
                localStorage.setItem("direccionID", state.direccionID);
                context.emit("infoDireccionCompleta", false);
            }

        });

        function guardarDireccion() {
            //Validaciones
            if (
                state.calle == "" ||
                state.numero == "" ||
                state.colonia == "" ||
                state.ciudad == "" ||
                state.estado == "" ||
                state.codigoPostal == ""
            ) {
                $q.notify({
                    color: "red-5",
                    textColor: "white",
                    icon: "warning",
                    message: "Por favor, llena todos los campos.",
                });
                return;
            }

            if (
                state.codigoPostal.length != 5
            ) {
                $q.notify({
                    color: "red-5",
                    textColor: "white",
                    icon: "warning",
                    message: "Corrige los campos en rojo.",
                });
                return;
            }

            state.disable = true;
            var clienteID = parseInt(localStorage.getItem("clienteID"));

            //POST de la dirección
            if (!state.modificacion) {
                api.post("/Checkout/Direccion", {
                    direccionId: 0,
                    calle: state.calle,
                    numero: state.numero,
                    colonia: state.colonia,
                    ciudad: state.ciudad,
                    estado: state.estado,
                    codigoPostal: state.codigoPostal,
                    clienteId: clienteID
                }, {
                    headers: {
                        Authorization: 'Bearer ' + localStorage.getItem("token"),
                    }
                }).then(response => {
                    state.cont++;
                    localStorage.setItem("direccionID", response.data.payload.direccionId);
                    state.mostrarGuardar = false;
                    state.mostrarEditar = true;
                    context.emit("infoDireccionCompleta", false);
                    $q.notify({
                        message: "Dirección guardada exitosamente.",
                        color: "positive",
                        icon: "check"
                    });
                }).catch(error => {
                    $q.notify({
                        message: "Error al guardar la dirección. Inténtalo de nuevo.",
                        color: "negative",
                        icon: "error"
                    });
                });

            } else {
                api.post("/Checkout/Direccion", {
                    direccionId: state.direccionID,
                    calle: state.calle,
                    numero: state.numero,
                    colonia: state.colonia,
                    ciudad: state.ciudad,
                    estado: state.estado,
                    codigoPostal: state.codigoPostal,
                    clienteId: clienteID
                }, {
                    headers: {
                        Authorization: 'Bearer ' + localStorage.getItem("token"),
                    }
                }).then(response => {
                    localStorage.setItem("direccionID", state.direccionID);
                    state.cont++;
                    state.mostrarGuardar = false;
                    state.mostrarEditar = true;
                    context.emit("infoDireccionCompleta", false);
                    $q.notify({
                        message: "Dirección actualizada exitosamente.",
                        color: "positive",
                        icon: "check"
                    });
                }).catch(error => {
                    $q.notify({
                        message: "Error al guardar la dirección. Inténtalo de nuevo.",
                        color: "negative",
                        icon: "error"
                    });
                });

            }

        }

        function editarDireccion() {
            state.disable = false;
            state.mostrarEditar = false;
            state.mostrarGuardar = true;
            context.emit("infoDireccionCompleta", true);
        }

        return {
            state,
            editarDireccion,
            guardarDireccion
        };

    }

}
</script>

<style lang="scss" scoped>
.form-holder {
    padding: 0;
    margin: 0;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    .content {
        display: grid;
        width: 50rem;
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
