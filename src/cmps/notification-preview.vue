<template>
  <div class="notification-preview">
    <div class="avatar-wrapper">
      <avatar :size="60" :username="notification.byMember.fullname" :src="notification.byMember.img"></avatar>
    </div>
    <div class="notification-details">
      <div class="notification-username">
        <h4 class="fullname">{{ notification.byMember.fullname }}</h4>
        <h5 class="notification-time">{{ createdAt }}</h5>
      </div>

      <div class="notification-txt-wrapper">
        <p>{{ notification.txt }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import Avatar from "vue-avatar";
import moment from "moment";

export default {
  props: ["notification"],
  computed: {
    createdAt() {
      return moment(this.notification.createdAt).fromNow();
    },
  },
  components: {
    Avatar,
  },
};
</script>

