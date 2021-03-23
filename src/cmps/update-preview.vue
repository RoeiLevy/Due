<template>
  <div class="update-preview">
    <div class="update-header">
      <div class="username-wrapper flex">
        <avatar :username="comment.byMember.fullname"></avatar>
        <h5 class="fullname">{{ comment.byMember.fullname }}</h5>
      </div>
      <div class="update-time-wrapper">
        <h5 class="update-time">{{ createdAt }}</h5>
      </div>
    </div>
    <div v-html="comment.txt" class="update-txt-wrapper"></div>
  </div>
</template>

<script>
import Avatar from "vue-avatar";
import moment from "moment";

export default {
  props: ["comment"],
  computed: {
    createdAt() {
      return moment(this.comment.createdAt).fromNow();
    },
  },
  components: {
    Avatar,
  },
};
</script>

