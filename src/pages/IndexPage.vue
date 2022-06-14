<template>
  <q-page class="flex-center q-ma-md">
    <div class="text-center text-h4 text-weight-bold">
      CONFIRMAR CARGAS
    </div>

    <div style="min-width: 90vw">
      <q-input class="q-my-md" outlined v-model="filteruser" label="Buscar usuario" autofocus />

      <q-list bordered separator>
        <q-item class="q-py-md" clickable v-ripple v-for="item in filteredList" :key="item.Usuario"
          @click="showlogindialog(item)">
          <q-item-section>{{ item.Usuario }} - {{ item.Nombre }}</q-item-section>
          <q-item-section avatar>
            <q-icon color="primary" name="login" />
          </q-item-section>
        </q-item>
      </q-list>
    </div>
    <!-- ENTER PASSWORD -->
    <q-dialog v-model="logindialog" persistent>
      <q-card style="min-width: 90vw">
        <q-card-section>
          <div class="text-h6">Hola {{ holausertxt }}</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-input v-model="pass" autofocus type="password" @keyup.enter="postLogin" placeholder="Contraseña" />
        </q-card-section>

        <q-card-actions align="right" class="text-primary">
          <q-btn no-caps color="secondary" label="Cerrar" v-close-popup />
          <q-btn no-caps color="accent" label="Entrar" @click="postLogin" :disable="pass.length > 3 ? false : true" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
import { useGlobalStore } from "src/stores/global"
import { ref } from '@vue/reactivity';
import { computed } from '@vue/runtime-core';
import { useQuasar } from 'quasar';

export default {
  setup() {
    const globalStore = useGlobalStore();
    const $q = useQuasar();
    globalStore.getAllusers();
    const filteruser = ref('');
    const logindialog = ref(false);
    const holausertxt = ref('');
    const user = ref('');
    const pass = ref('');
    const filteredList = computed(() => {
      let input = filteruser.value.toLowerCase();
      return globalStore.usersList.filter(item =>
        item.Nombre.toLowerCase().includes(input) || item.Usuario.toLowerCase().includes(input))
    })
    function showlogindialog(item) {
      logindialog.value = true;
      holausertxt.value = item.Nombre;
      user.value = item.Usuario;
      pass.value = '';
    }
    async function postLogin() {
      logindialog.value = false;
      const error = await globalStore.postLogIn({ user: user.value, pass: pass.value });
      if (error) {
        $q.notify({
          type: 'negative',
          message: error,
          position: 'center',
          timeout: 10000,
          actions: [
            { label: '', icon: 'close', color: 'white', handler: () => { } }
          ]
        })
      }
    }
    return {
      globalStore,
      filteruser,
      filteredList,
      showlogindialog,
      logindialog,
      holausertxt,
      pass,
      postLogin
    }
  }

}
</script>
