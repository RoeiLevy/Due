<template>
  <div class="single-activity">
    <div class="activity-box">
      <div class="activity-time-wrapper">
        <h4>{{ createdAt }}</h4>
      </div>
      <div class="activity-user-txt-wrapper">
        <avatar :size=30 :src="this.activity.byMember.img" :username="username"></avatar>
        <h3>{{ activity.txt }}</h3>
      </div>
    </div>
  </div>
</template>

<script>
import Avatar from "vue-avatar";
import moment from "moment";

export default {
  props: ["activity"],
  computed: {
    username() {
      return this.activity.byMember.fullname;
    },
    createdAt() {
      return moment(this.activity.createdAt).fromNow();
    },
  },
  components: {
    Avatar,
  },
};
</script>
