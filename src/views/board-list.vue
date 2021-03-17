<template>
  <div class="board-list">
    <ul v-if="boards">
      <li v-for="board in boards" :key="board._id" @click="showBoard(board._id)">
        <board-preview :board="board" />
      </li>
      <li @click="newBoard">
          Add a new board!
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
  methods:{
      showBoard(boardId){
          this.$router.push(`/board/${boardId}`);
      },
      newBoard(){
          
      }
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
