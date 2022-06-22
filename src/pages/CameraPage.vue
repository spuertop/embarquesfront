<template>
  <q-page class="flex-center q-pa-md">
    <div class="text-center text-h5 text-weight-bold">
      <q-icon name="photo_camera" />
      Fotografiar {{ globalStore.customer }}
      <q-icon name="photo_camera" />
    </div>
    <div class="text-center">
      <q-radio v-model="action" class='text-grey-5' checked-icon="task_alt" unchecked-icon="panorama_fish_eye"
        val="load" label="Cargar" @click="this.$router.push({ path: '/readings', query: { action: 'load' } })" />
      <q-radio v-model="action" class='text-grey-5' checked-icon="task_alt" unchecked-icon="panorama_fish_eye"
        val="download" label="Descargar"
        @click="this.$router.push({ path: '/readings', query: { action: 'download' } })" />
      <q-radio v-model="action" class="text-primary" checked-icon="task_alt" unchecked-icon="panorama_fish_eye"
        val="photo" label="Fotografiar" />
    </div>
    <div class="q-pa-sm" style="font-size: 20px">
      <div class="row items-center">
        <div class="col-3">Albarán</div>
        <div class="col">
          <q-input dense square outlined standout="text-black" v-model="globalStore.aedocument" disable />
        </div>
      </div>
    </div>
    <!-- CAMARA -->
    <div class="flex flex-center q-ma-sm web-camera-container">
      <q-spinner-hourglass v-show="isCameraOpen && isLoading" color="accent" size="4em" />
      <div class="video" v-if="isCameraOpen" v-show="!isLoading">
        <!-- <video v-show="!isPhotoTaken" ref="camera" autoplay :height="322.5" :width="430"></video> -->
        <video v-show="!isPhotoTaken" ref="camera" autoplay :height="322.5" :width="430"></video>
        <canvas v-show="isPhotoTaken" id="photoTaken" ref="canvas" :height="322.5" :width="430"></canvas>
      </div>
    </div>
    <!-- <div class="camera-button">
      <button type="button" class="button is-rounded"
        :class="{ 'is-primary': !isCameraOpen, 'is-danger': isCameraOpen }" @click="toggleCamera">
        <span v-if="!isCameraOpen">Abrir cámara</span>
        <span v-else>Cerrar cámara</span>
      </button>
    </div> -->
    <div v-if="isCameraOpen && !isLoading && !isPhotoTaken">
      <q-icon @click="takePhoto" name="photo_camera"></q-icon>
    </div>
    <div v-if="isCameraOpen && !isLoading && isPhotoTaken">
      <q-icon name="cancel" color="negative" @click="takePhoto" />
    </div>
    <div v-if="isPhotoTaken && isCameraOpen" class="camera-download">
      <a id="downloadPhoto" download="my-photo.jpg" role="button" @click="downloadImage">

        <q-icon name="check_circle" color="positive" />
      </a>
      <!-- <a id="downloadPhoto" download="my-photo.jpg" class="button" role="button" @click="downloadImage">
        Guardar foto
      </a> -->
    </div>
  </q-page>
</template>

<script>
import { useGlobalStore } from "src/stores/global";
import { ref } from '@vue/reactivity';

export default {
  setup() {
    const globalStore = useGlobalStore();
    const action = ref('photo');
    const isCameraOpen = ref(false)
    const isPhotoTaken = ref(false)
    const isShotPhoto = ref(false)
    const isLoading = ref(false)
    const camera = ref(null)
    const canvas = ref(null)

    function toggleCamera() {
      if (isCameraOpen.value) {
        isCameraOpen.value = false;
        isPhotoTaken.value = false;
        isShotPhoto.value = false;
        stopCameraStream();
      } else {
        isCameraOpen.value = true;
        createCameraElement();
      }
    }
    toggleCamera();

    function createCameraElement() {
      isLoading.value = true;
      const constraints = (window.constraints = {
        audio: false,
        video: true
      });
      navigator.mediaDevices
        .getUserMedia(constraints)
        .then(stream => {
          isLoading.value = false;
          camera.value.srcObject = stream;
        })
        .catch(error => {
          isLoading.value = false;
          alert('Some errors', error)
        })
    }

    function stopCameraStream() {
      let tracks = camera.value.srcObject.getTracks();
      tracks.forEach(track => {
        track.stop();
      });
    }

    function takePhoto() {
      if (!isPhotoTaken.value) {
        isShotPhoto.value = true;
        const FLASH_TIMEOUT = 50;
        setTimeout(() => {
          isShotPhoto.value = false;
        }, FLASH_TIMEOUT);
      }
      isPhotoTaken.value = !isPhotoTaken.value;
      const context = canvas.value.getContext('2d');
      //context.drawImage(camera.value, 0, 0, 450, 337.5);
      context.drawImage(camera.value, 0, 0, 430, 322.5);
    }
    function downloadImage() {
      const download = document.getElementById("downloadPhoto");
      const canvas = document.getElementById("photoTaken").toDataURL("image/jpeg")
        .replace("image/jpeg", "image/octet-stream");
      download.setAttribute("href", canvas);
    }


    return {
      globalStore, isCameraOpen, isPhotoTaken, isShotPhoto, isLoading,
      action,
      toggleCamera,
      takePhoto, downloadImage,
      camera, canvas
    }
  }
}


</script>
<style lang="scss" scoped>
.capture {
  max-width: 89vw;
  max-height: 91vh;
}

.web-camera-container {
  border: 1px solid #ccc;
  border-radius: 4px;
  height: 92vw;

  .camera-box {
    .camera-shutter {
      opacity: 0;
      width: 250px;
      height: 337.5px;
      background-color: #fff;
      position: absolute;
    }
  }

  .camera-shoot {
    margin: 1rem 0;

    button {
      height: 60px;
      width: 60px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 100%;

      img {
        height: 35px;
        object-fit: cover;
      }
    }
  }

  @keyframes preload {
    0% {
      opacity: 1
    }

    50% {
      opacity: .4
    }

    100% {
      opacity: 1
    }
  }
}
</style>
