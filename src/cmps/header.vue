<template>
  <div class="header">
    <div class="flex column top-navigation">
      <div class="logo-wrapper">
        <router-link to="/">
          <img class="logo" src="@/assets/imgs/logo.png" />
        </router-link>
      </div>
      <el-tooltip
        class="item"
        effect="dark"
        content="Board List"
        placement="right"
      >
        <div class="btn-surface">
          <div @click="toBoardList" class="icon-wrapper">
            <font-awesome-icon class="header-icon" icon="th-large" />
          </div>
        </div>
      </el-tooltip>

      <el-tooltip
        class="item"
        effect="dark"
        content="Notifications"
        placement="right"
      >
        <div @click="toggleNotification" class="btn-surface">
          <board-notifications v-if="isNotificatiosOpen" />
          <div class="icon-wrapper">
            <font-awesome-icon class="header-icon" icon="bell" />
          </div>
        </div>
      </el-tooltip>

      <el-tooltip class="item" effect="dark" content="Inbox" placement="right">
        <div class="btn-surface">
          <div class="icon-wrapper">
            <font-awesome-icon class="header-icon" icon="inbox" />
          </div>
        </div>
      </el-tooltip>
    </div>

    <div class="flex column bottom-navigation">
      <el-tooltip
        class="item"
        effect="dark"
        content="Calendar"
        placement="right"
      >
        <div class="btn-surface">
          <div class="icon-wrapper">
            <font-awesome-icon class="header-icon" icon="calendar-check" />
          </div>
        </div>
      </el-tooltip>
      <el-tooltip
        class="item"
        effect="dark"
        content="Invite Member"
        placement="right"
      >
        <div class="btn-surface">
          <div class="icon-wrapper">
            <font-awesome-icon class="header-icon" icon="user-plus" />
          </div>
        </div>
      </el-tooltip>
      <el-tooltip class="item" effect="dark" content="Search" placement="right">
        <div class="btn-surface">
          <div class="icon-wrapper">
            <font-awesome-icon class="header-icon" icon="search" />
          </div>
        </div>
      </el-tooltip>
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
import boardNotifications from "../cmps/board-members";

export default {
  data() {
    return {};
  },
  methods: {
    toBoardList() {
      this.$router.push("/board");
    },
    toggleNotification() {
      this.$store.commit("toggleNotifications");
      this.$store.commit("toggleCloseScreen");
    },
  },
  computed: {
    isNotificatiosOpen() {
      return this.$store.getters.isNotificatiosOpen;
    },
    isCloseScreen() {
      return this.$store.getters.isCloseScreen;
    },
  },
  watch: {
    isCloseScreen(newValue) {
      // console.log(`close screen is now opened: ${newValue}`);
      if (!newValue) {
        this.$store.commit("toggleNotifications");
      }
    },
  },
  components: {
    avatar,
    boardNotifications,
  },
};
</script>
