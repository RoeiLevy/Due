<template>
  <div class="avatar" :style="{ 'background-color': color }">
    <img v-if="loggedInUser.img" :src="loggedInUser.img" />
    <span v-else>{{ initials }}</span>
  </div>
</template>

<script>
import { utilService } from "../services/util.service";
export default {
  data() {
    return {
      user: null,
    };
  },
  computed: {
    color() {
      return utilService.getRandomColor();
    },
    initials() {
      var user = this.$store.getters.loggedInUser;
      user = user.fullname.split(" ");
      if (user.length === 1) return user[0].charAt(0).toUpperCase();
      user =
        user[0].charAt(0).toUpperCase() +
        user[user.length - 1].charAt(0).toUpperCase();
      return user;
    },
    loggedInUser() {
      return this.$store.getters.loggedInUser;
    },
  },
};
</script>
