<template>
  <div class="header">
    <div class="flex column top-navigation">
      <div class="logo-wrapper">
        <router-link to="/">
          <img class="logo" src="@/assets/imgs/logo.png" />
        </router-link>
      </div>
      <div class="btn-surface">
        <div @click="toBoardList" class="icon-wrapper">
          <font-awesome-icon class="header-icon" icon="th-large" />
        </div>
      </div>

      <div class="btn-surface">
        <div class="icon-wrapper">
          <font-awesome-icon class="header-icon" icon="bell" />
        </div>
      </div>

      <div class="btn-surface">
        <div class="icon-wrapper">
          <font-awesome-icon class="header-icon" icon="inbox" />
        </div>
      </div>
    </div>

    <div class="flex column bottom-navigation">
      <div class="btn-surface">
        <div class="icon-wrapper">
          <font-awesome-icon class="header-icon" icon="calendar-check" />
        </div>
      </div>
      <div class="btn-surface">
        <div class="icon-wrapper">
          <font-awesome-icon class="header-icon" icon="user-plus" />
        </div>
      </div>
      <div class="btn-surface">
        <div class="icon-wrapper">
          <font-awesome-icon class="header-icon" icon="search" />
        </div>
      </div>
      <div class="btn-surface">
        <div class="icon-wrapper">
          <avatar></avatar>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import avatar from "./avatar";
export default {
  methods: {
    toBoardList() {
      this.$router.push("/board");
    },
  },
  components: {
    avatar,
  },
};
</script>
