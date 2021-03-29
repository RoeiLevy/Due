<template>
  <div class="header">
    <div class="flex column top-navigation">
      <div class="logo-wrapper">
        <router-link to="/">
          <img class="logo" src="@/assets/final.png" />
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
        <div class="btn-surface">
          <div @click.self="toggleNotification" class="icon-wrapper">
            <board-notifications v-if="isNotificationsOpen">
            </board-notifications>
            <el-badge
              @click.native="toggleNotification"
              v-show="!hidden"
              :value="newNotifications"
              class="item notification-badage"
            >
            </el-badge>
            <font-awesome-icon
              @click="toggleNotification"
              class="header-icon"
              icon="bell"
            />
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
import boardNotifications from "../cmps/board-notifications";

export default {
  data() {
    return {
      newNotifications: 1,
      hidden: false,
    };
  },
  methods: {
    toBoardList() {
      this.$router.push("/board");
    },
    toggleNotification() {
      this.$store.commit("openNotifications");
      this.$store.commit("toggleCloseScreen");
    },
  },
  computed: {
    isNotificationsOpen() {
      return this.$store.getters.isNotificatiosOpen;
    },
    isCloseScreen() {
      return this.$store.getters.isCloseScreen;
    },
    notifications() {
      if (!this.$store.getters.boardActivities) return;
      const filteredNotifications = this.$store.getters.boardActivities.filter(
        (a) => {
          if (a.byMember) {
            if (a.byMember._id !== this.loggedInUser._id) return a;
          }
        }
      );
      return filteredNotifications;
    },
    currBoard() {
      return this.$store.getters.boardForDisplay.activities;
    },
    loggedInUser() {
      return this.$store.getters.loggedInUser;
    },
  },
  watch: {
    isCloseScreen(newValue) {
      if (!newValue) {
        this.$store.commit("closeNotifications");
      }
    },
    notifications: function (newVal, oldVal) {
      if (!oldVal || !newVal) return;
      if (newVal.length > oldVal.length) {
        this.hidden = false;
        this.newNotifications++;
      }
    },
    isNotificationsOpen: function (newVal, oldVal) {
      if (newVal) {
        this.hidden = true;
        this.newNotifications = 0;
      }
    },
    newNotifications: function () {
      if (this.newNotifications === 0) {
        this.hidden = true;
      }
    },
  },
  created() {
    if (this.newNotifications === 0) this.hidden = true;
  },
  components: {
    avatar,
    boardNotifications,
  },
};
</script>
