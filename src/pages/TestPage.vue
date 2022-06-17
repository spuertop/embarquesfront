<template>
  <pre>{{ devices }}</pre>
  <camera :resolution="{ width: 100, height: 100 }" ref="camera" autoplay></camera>

</template>

<script>
import { defineComponent } from 'vue'
import camera from "simple-vue-camera";

export default defineComponent({
  setup() {
    const devices = camera.value?.devices(["videoinput"]);
    console.log(devices)
    return {
      devices
    }
  },
  components: { camera }
});
</script>
