<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn flat dense round icon="menu" aria-label="Menu" @click="toggleLeftDrawer" />

        <q-toolbar-title>
          Embarques
        </q-toolbar-title>

        <div></div>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered>
      <q-list>
        <q-item-label header>
          Menú opciones
        </q-item-label>

        <EssentialLink v-for="link in essentialLinks" :key="link.title" v-bind="link" />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent, ref } from 'vue'
import EssentialLink from 'components/EssentialLink.vue'
import { useGlobalStore } from "src/stores/global"

const linksList = [
  {
    title: 'Inicio',
    caption: 'Ir al inicio, cambiar de usuario',
    icon: 'home',
    link: '/'
  },
  {
    title: 'Empresas',
    caption: 'Cambiar la empresa actual',
    icon: 'business_center',
    link: '/customers'
  },
  {
    title: 'Salir',
    caption: 'logout',
    icon: 'logout',
    link: '/logout'
  }

]

export default defineComponent({
  name: 'MainLayout',

  components: {
    EssentialLink
  },

  setup() {
    const globalStore = useGlobalStore();
    const leftDrawerOpen = ref(false)

    return {
      essentialLinks: linksList,
      leftDrawerOpen,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value
      },
      globalStore
    }
  }
})
</script>
