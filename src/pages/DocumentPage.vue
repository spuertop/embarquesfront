<template>
  <q-page class="flex-center q-pa-md">
    <div class="text-center text-h4 text-weight-bold">
      Cliente {{ globalStore.customer }}
      <hr>
    </div>
    <div class="q-pa-md">
      <span>Número de Albarán de Entrega</span>
      <q-input v-model="numae" @keyup.enter="searchae" filled autofocus hint="Pistolear AE a cargar o descargar" />
    </div>
    <!-- <pre>{{ globalStore.aeinfo }}</pre> -->
  </q-page>
</template>
<script>
import { useGlobalStore } from "src/stores/global";
import { ref } from '@vue/reactivity';
import { useQuasar } from 'quasar';

export default {
  setup() {
    const globalStore = useGlobalStore();
    globalStore.aeinfo = '';
    globalStore.aedocument = '';
    const $q = useQuasar();
    const numae = ref('');
    async function searchae() {
      let value = numae.value.trim();
      if (value) {
        let query = {
          albaran: numae.value,
          empresa: globalStore.customer
        }
        let error = await globalStore.getDeliveryInfo(query)
        if (error) {
          numae.value = '';
          $q.notify({
            type: 'negative',
            message: error,
            position: 'center',
            timeout: 10000,
            actions: [
              { label: '', icon: 'close', color: 'white', handler: () => { } }
            ]
          })
        } else {
          globalStore.aedocument = numae.value
        }

      }
    }
    return {
      globalStore,
      numae,
      searchae
    }
  }
}
</script>
