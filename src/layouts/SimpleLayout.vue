<template>
<q-layout view="lHh Lpr lFf">
    <q-header elevated>
        <q-toolbar class="header">
            <div id="logo" @click="this.$router.push('/')">
                Mèxic
            </div>
        </q-toolbar>
    </q-header>

    <q-page-container>
        <router-view />
    </q-page-container>
</q-layout>
</template>

<script>
import {
    defineComponent
} from 'vue'

export default defineComponent({
    name: 'SimpleLayout',

    components: {},

    setup() {

        return {}
    }
})
</script>

<style lang="scss">
.header {
    display: flex;
    justify-content: space-between;
    align-items: center;

    #logo {
        font-size: 1.5em;
        font-weight: bold;
        color: #fff;
        text-transform: uppercase;
        letter-spacing: 1px;
        transition: all 0.5s ease-in-out;

        &:hover{
          transform: scale(1.05, 1.05);
          cursor:pointer;
        }
    }
}
</style>
