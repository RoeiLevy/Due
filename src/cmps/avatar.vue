<template>
  <div class="avatar" :style="{ 'background-color': color }">
    <img
      :title="loggedInUser.fullname"
      v-if="loggedInUser && loggedInUser.img"
      :src="loggedInUser.img"
    />
    <span :title="loggedInUser.fullname" v-else-if="loggedInUser">{{
      initials
    }}</span>
    <span v-else title="guest">G</span>
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
