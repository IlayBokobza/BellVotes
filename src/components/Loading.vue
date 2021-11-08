<template>
  <div class="loading">
    <img src="../assets/loading.gif" alt="">
  </div>
</template>

<script>
export default {
  name: "Loading",
};
</script>

<style lang="scss">
.loading {
  width: 100vw;
  height: 100vh;
  position: fixed;
  z-index: 100;
  top: 0;
  left: 0;
  background: #000000af;
  display: grid;
  place-items: center;
}
</style>