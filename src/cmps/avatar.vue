<template>
  <div class="avatar" :style="{ 'background-color': color }">
    <img
      @click="isMenuOpen = !isMenuOpen"
      :title="loggedInUser.fullname"
      v-if="loggedInUser && loggedInUser.img"
      :src="loggedInUser.img"
    />
    <span
      @click="isMenuOpen = !isMenuOpen"
      :title="loggedInUser.fullname"
      v-else-if="loggedInUser"
      >{{ initials }}</span
    >
    <span @click="go('login')" v-else title="guest">G</span>
    <div v-if="isMenuOpen" class="menu">
      <header>
        <img src="@/assets/imgs/logo.png" class="logo" />
        {{ loggedInUser.fullname }}
      </header>
      <button @click="go('profile')">
        Profile
        <font-awesome-icon class="header-icon" icon="user" />
      </button>
      <button>
        <button @click="logout" class="logout-btn">Logout</button>
        <font-awesome-icon class="header-icon" icon="sign-out-alt" />
      </button>
    </div>
  </div>
</template>

<script>
import { utilService } from "../services/util.service";
export default {
  data() {
    return {
      user: null,
      isMenuOpen: false,
    };
  },
  methods: {
    go(path) {
      this.$router.push(path);
    },
    async logout() {
      await this.$store.dispatch("logout");
      this.$router.push("/login");
      try {
      } catch (err) {}
    },
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
