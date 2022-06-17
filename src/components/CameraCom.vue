<template>
  <camera :resolution="{ width: 375, height: 812 }" autoplay>
    <button>I'm on top of the video</button>
  </camera>
</template>
<script>
import { defineComponent } from "vue";
import Camera from "simple-vue-camera";

export default defineComponent({
  components: {
    Camera,
  },
});
</script>
