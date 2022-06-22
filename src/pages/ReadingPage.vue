<template>
  <q-page class="flex-center q-pa-md">
    <div class="text-center text-h5 text-weight-bold">
      <q-icon :name="radioIcons" />
      {{ radioText }} {{ globalStore.customer }}
      <q-icon :name="radioIcons" />
    </div>
    <div class="text-center">
      <q-radio v-model="action" :class="action === 'load' ? 'text-primary' : 'text-grey-5'" checked-icon="task_alt"
        unchecked-icon="panorama_fish_eye" val="load" label="Cargar" @click="returnFocus" />
      <q-radio v-model="action" :class="action === 'download' ? 'text-primary' : 'text-grey-5'" checked-icon="task_alt"
        unchecked-icon="panorama_fish_eye" val="download" label="Descargar" @click="returnFocus" />
      <q-radio v-model="action" :class="action === 'photo' ? 'text-primary' : 'text-grey-5'" checked-icon="task_alt"
        unchecked-icon="panorama_fish_eye" val="photo" label="Fotografiar" @click="this.$router.push('/photos')" />
    </div>
    <div class="q-pa-none" style="font-size: 16px">
      <div class="row items-center">
        <div class="col-3">Albarán</div>
        <div class="col">
          <q-input dense v-model="globalStore.aedocument" disable />
        </div>
      </div>
      <div class="row items-center">
        <div class="col-3">Agencia</div>
        <div class="col">
          <q-input dense v-model="globalStore.aeinfo.agencia.CodigoDeServicioDeTransporte" disable />
        </div>
      </div>
      <div class="row items-center">
        <div class="col-3">Barras</div>
        <div class="col">
          <q-input dense v-model="barcode" ref="barcodeinput" @keyup.enter="readBarcode" />
        </div>
      </div>
    </div>
    <div class="q-pa-sm">
      <q-linear-progress :value="progress" rounded stripe size="15px" color="positive" class="q-mt-sm" />

      <q-slide-transition>
        <div v-show="visibleEnd" class="text-center q-pa-sm">
          <span class="text-h5">Todo Cargado
            <q-icon color="positive" name="check_circle" />
          </span>
        </div>
      </q-slide-transition>

      <q-scroll-area class="q-pt-xs" style="height: 38vh; max-width: 95vw;">
        <q-chip size="md" v-for="item in globalStore.aeinfo.lecturas" :key="item.Descripcion"
          :color="item.NroDS ? action === 'load' ? 'positive' : 'primary' : ''" text-color="white">
          {{ item.Descripcion2 }}
        </q-chip>
      </q-scroll-area>
    </div>
    <!-- ALERT ERRORS -->
    <q-dialog persistent v-model="alert" @keyup.enter="playError">
      <q-card>
        <q-card-section>
          <div class="text-h6">Error</div>
        </q-card-section>
        <q-card-section class="bg-negative text-white">
          {{ alertMsg }}
        </q-card-section>
        <q-card-actions align="right">
          <q-btn flat label="ENTENDIDO" color="primary" v-close-popup @click="returnFocus" />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <q-page-sticky position="bottom" :offset="[0, 18]">
      <q-btn style="width: 95vw;" color="accent" text-color="white" label="Cargar otra entrega" no-caps
        @click="nuevaEntrega" />
    </q-page-sticky>
  </q-page>
</template>
<script>
import { useGlobalStore } from "src/stores/global";
import { useRouter } from 'vue-router'
import { ref } from '@vue/reactivity';
import { computed, onMounted } from '@vue/runtime-core';
import { Keyboard } from '@capacitor/keyboard'

export default {
  setup() {
    const router = useRouter();
    const globalStore = useGlobalStore();
    const action = ref('load');
    if (router.currentRoute.value.query.action) {
      action.value = router.currentRoute.value.query.action
    }
    const barcode = ref('');
    const barcodeinput = ref(null);
    const audioError = new Audio('../mixkit-wrong-long-buzzer-954.wav');
    const alert = ref(false);
    const alertMsg = ref('');
    const progress = computed(() => {
      let total = globalStore.aeinfo.lecturas.length;
      let uploads = (globalStore.aeinfo.lecturas.filter(item => item.NroDS === true)).length;
      return uploads / total;
    })
    const radioIcons = computed(() => {
      if (action.value === 'load') {
        return 'upload'
      } else if (action.value === 'download') {
        return 'download'
      } else {
        return 'photo_camera'
      }
    })
    const radioText = computed(() => {
      if (action.value === 'load') {
        return 'Cargando'
      } else if (action.value === 'download') {
        return 'Descargando'
      } else {
        return 'Fotografiar'
      }
    })
    const visibleEnd = computed(() => {
      let total = globalStore.aeinfo.lecturas.length;
      let uploads = (globalStore.aeinfo.lecturas.filter(item => item.NroDS === true)).length;
      if (uploads / total === 1) {
        return true
      } else {
        return false
      }
    })

    Keyboard.addListener('keyboardWillShow', returnFocus);
    Keyboard.addListener('keyboardDidShow', returnFocus);

    function returnFocus() {
      barcode.value = '';
      barcodeinput.value.focus();
      Keyboard.hide();
    }

    async function readBarcode() {
      let ob = { ae: globalStore.aedocument, ud: barcode.value, empresa: globalStore.customer }
      if (checkBarcode(action.value)) {
        if (action.value === 'load') {
          const error = await globalStore.uploadUnit(ob);
          console.log(error);
          returnFocus();
        }
        if (action.value === 'download') {
          const error = await globalStore.downloadUnit(ob);
          console.log(error);
          returnFocus();
        }
        //setEstilos

      }
    }
    function checkBarcode(action) {
      let lecturas = globalStore.aeinfo.lecturas;
      let search = lecturas.filter(item => item.Descripcion === barcode.value);
      if (search.length > 0) { //Si es de este pedido
        let estadoActual = search[0].NroDS;
        if (action === 'load' && estadoActual === true) { //Accion de cargar algo que ya está cargado
          alertMsg.value = 'Esto ya esta cargado.';
          alert.value = true;
          audioError.play();
          return false;
        }
        if (action === 'download' && estadoActual === null) { //Accion de descargar algo que ya está descargado
          alertMsg.value = 'Esto ya está descargado';
          alert.value = true;
          audioError.play();
          return false;
        }
        return true; //It's ok continue
      } else { //No encontrado
        alertMsg.value = 'No pertenece a este pedido.'
        alert.value = true;
        audioError.play();
        return false;
      }
    }
    function playError() {
      audioError.play();
    }
    function nuevaEntrega() {
      globalStore.changeAE();
    }

    onMounted(() => {
      returnFocus();
    })
    return {
      globalStore,
      action,
      radioIcons,
      radioText,
      barcode,
      returnFocus,
      barcodeinput,
      progress,
      readBarcode,
      alert,
      alertMsg,
      playError,
      nuevaEntrega,
      visibleEnd

    }
  }
}
</script>
