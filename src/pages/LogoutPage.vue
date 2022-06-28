<template>
  <h1></h1>
</template>
<script>
import { useGlobalStore } from "src/stores/global";
export default {
  setup() {
    const globalStore = useGlobalStore();
    globalStore.logOut();
    return {
      globalStore
    }
  }
}
</script>
