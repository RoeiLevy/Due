<template>
<div class="loader-container">
  <img src="../assets/imgs/logo.png" class="loader" />
</div>
</template>

<script>
export default {};
</script>

<style>
.loader-container{
    position: absolute;
    /* z-index: -1; */
    width: 100vw;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
}
.loader {
  width: 30%;
  animation: rotate 2.5s linear, fadeOut 2.5s ;
  animation-iteration-count: 1;
  transform-style: preserve-3d;
  display: flex;
  /* align-self: center; */
  z-index: 5000;
  position: absolute;
  opacity: 0;
  /* top: 30%; */
}
@keyframes fadeOut {
    0% {
        opacity: 1;
    }
    100% {
        opacity: 0;
    display: none;
    }
}
@keyframes rotate {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>