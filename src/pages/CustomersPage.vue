<template>
  <q-page class="flex-center q-ma-md">
    <div class="text-center text-h4 text-weight-bold">
      Cliente
    </div>
    <div style="min-width: 90vw">
      <q-list bordered separator>
        <q-item class="q-py-md" clickable v-ripple v-for="item in globalStore.customersList" :key="item.Empresa"
          @click="selectedCustomer(item)">
          <q-item-section>{{ item.Empresa }} </q-item-section>
          <q-item-section avatar>
            <q-icon color="primary" name="login" />
          </q-item-section>
        </q-item>
      </q-list>
    </div>
  </q-page>
</template>
<script>
import { useGlobalStore } from 'src/stores/global'

export default {
  setup() {
    const globalStore = useGlobalStore();
    globalStore.getAllCustomers();
    function selectedCustomer(item) {
      globalStore.setCustomer(item.Empresa)
    }
    return {
      globalStore,
      selectedCustomer
    }
  }
}

</script>
