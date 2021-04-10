<template>
  <div class="loader-container">
    <img src="../assets/imgs/logo.png" class="loader" />
  </div>
</template>

<script>
export default {};
</script>

<style>
.loader-container {
  position: absolute;
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  animation: fadeOut 3.5s;
}
.loader {
  width: 6%;
  animation: rotate 0.3s linear, fadeOut 0.5s;
  animation-iteration-count: 1;
  transform-style: preserve-3d;
  display: flex;
  position: absolute;
  opacity: 0;
}
@keyframes fadeOut {
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}
@keyframes rotate {
  0% {
    z-index: 5000;
    transform: rotate(0deg);
  }
  50% {
    transform: rotate(360deg);
  }
  51% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>