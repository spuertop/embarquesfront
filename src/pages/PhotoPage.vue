<template>
  <q-page class="flex-center q-pa-md">
    <div class="text-center text-h5 text-weight-bold">
      <q-icon name="photo_camera" />
      Fotografiar {{ globalStore.customer }}
      <q-icon name="photo_camera" />
    </div>
    <div class="text-center" style="font-size: 16px">
      <q-radio v-model="action" class='text-grey-5' checked-icon="task_alt" unchecked-icon="panorama_fish_eye"
        val="load" label="Cargar" @click="this.$router.push({ path: '/readings', query: { action: 'load' } })" />
      <q-radio v-model="action" class='text-grey-5' checked-icon="task_alt" unchecked-icon="panorama_fish_eye"
        val="download" label="Descargar"
        @click="this.$router.push({ path: '/readings', query: { action: 'download' } })" />
      <q-radio v-model="action" class="text-primary" checked-icon="task_alt" unchecked-icon="panorama_fish_eye"
        val="photo" label="Fotografiar" />
    </div>
    <div class="q-pa-sm" style="font-size: 16px">
      <div class="row items-center">
        <div class="col-3">Albarán</div>
        <div class="col">{{ globalStore.aedocument }}</div>
      </div>
      <div class="row items-center q-pt-sm">
        <div class="col-12 flex justify-center">
          <q-btn style="width: 100vw;" icon="photo_camera" color="primary" label="Hacer Foto" @click="captureImage" />
        </div>
      </div>
    </div>

    <q-carousel animated v-model="slide" arrows navigation infinite control-type="regular" control-color="primary"
      navigation-position="top" style="height:50vh;">
      <q-carousel-slide v-for="item in globalStore.photoList" :key="item.id" :name="item.id"
        class="no-margin no-padding">
        <q-img :src="item.src" contain sizes="(max-width: 600px) 480px, 800px" />
      </q-carousel-slide>
    </q-carousel>

    <!-- FOOTER -->
    <q-page-sticky position="bottom" :offset="[0, 18]">
      <q-btn style="width: 95vw;" color="accent" text-color="white" label="Cargar otra entrega" no-caps
        @click="nuevaEntrega" />
    </q-page-sticky>
  </q-page>
</template>
<script>
import { useGlobalStore } from "src/stores/global";
import { ref } from '@vue/reactivity';
import { Camera, CameraResultType } from '@capacitor/camera'

export default {
  setup() {
    const globalStore = useGlobalStore();
    globalStore.getPhotos();
    const action = ref('photo');
    const imageSrc = ref('');
    const slide = ref(1);

    function nuevaEntrega() {
      globalStore.changeAE();
    }
    async function captureImage() {
      const image = await Camera.getPhoto({
        quality: 75,
        allowEditing: false,
        //resultType: CameraResultType.Uri,
        resultType: CameraResultType.Base64,
        source: "CAMERA",
        correctOrientation: true
      })
      imageSrc.value = "data:image/jpeg;base64, " + image.base64String
      console.log(image.base64String)
      await globalStore.uploadPhoto(image.base64String);
      globalStore.getPhotos();
    }

    return {
      globalStore,
      action,
      nuevaEntrega,
      imageSrc,
      captureImage,
      slide

    }
  }
}

</script>
