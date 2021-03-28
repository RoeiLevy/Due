<template>
<div>
  <div @click="closeScreen" v-if="isOpen" class="close-screen-2"></div>
</div>
</template>

<script>
export default {
    name: 'close-screen',
    methods: {
        closeScreen() {
            this.$store.commit('toggleCloseScreen')
            this.$emit('close')
        }
    },
    computed: {
        isOpen() {
            return this.$store.getters.isCloseScreen
        }
    }

}
</script>

<style>
    .close-screen-2 {
        position: fixed;
        height: 100vh;
        width: 100vw;
        z-index: 10;
        background-color: rgba(0, 0, 0, 0.144);
    }

    .close-screen-2:hover {
        cursor: pointer;
    }
</style>