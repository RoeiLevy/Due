<template>
  <div class="board-notifications">
    <div class="activity-task-title">
      <h3 class="title">Notifications</h3>
    </div>
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane class="notification-tab" label="All" name="all">
        <notifications :notifications="userNotifications" />
      </el-tab-pane>
      <el-tab-pane class="notification-tab" label="Unread" name="unread">
      </el-tab-pane>
      <el-tab-pane
        class="notification-tab"
        label="I was mentioned"
        name="i was mentioned"
      >
      </el-tab-pane>
      <el-tab-pane
        class="notification-tab"
        label="Assigned to me"
        name="assigned to me"
      >
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import notifications from "./notifications";

export default {
  data() {
    return {
      activeName: "all",
    };
  },
  methods: {
    handleClick(tab, event) {},
  },
  computed: {
    board() {
      return this.$store.getters.boardForDisplay;
    },
    loggedInUser() {
      return this.$store.getters.loggedInUser;
    },
    userNotifications() {
      if (!this.board) return;
      const filteredNotifications = this.board.activities.filter((a) => {
        if (a.byMember) {
          if (a.byMember._id !== this.loggedInUser._id) return a;
        }
      });
      return filteredNotifications;
    },
  },
  components: {
    notifications,
  },
  created() {},
  watch: {
    $route(to, from) {},
  },
};
</script>

