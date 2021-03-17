<template>
  <div class="board-list">
    <ul v-if="boards">
      <li v-for="board in boards" :key="board._id">
        <board-preview :board="board" />
      </li>
    </ul>
  </div>
</template>

<script>
import boardPreview from "../cmps/board-preview.vue";
export default {
  data() {
    return {
    //   boards: null,
    };
  },
  computed: {
    boards() {
      return this.$store.getters.boards;
    },
  },
  created() {
      this.$store.dispatch('loadBoards')
  },
  components: {
    boardPreview,
  },
};
</script>
