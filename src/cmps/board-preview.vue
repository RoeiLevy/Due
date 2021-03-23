<template>
  <div class="board">
    <h3>{{ board.title }}</h3>
    <h3>{{ board.createdBy.fullname }}</h3>
    <h3>{{ getTime }}</h3>
  </div>
</template>

<script>
import moment from "moment";

export default {
  props: ["board"],
  computed: {
    getTime() {
      return moment(this.board.createdAt).fromNow();
    },
  },
};
</script>
