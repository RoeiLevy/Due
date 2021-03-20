<template>
  <el-drawer
    class="flex justify-start"
    :visible.sync="drawer"
    :direction="'rtl'"
    :before-close="closeActivities"
  >
    <div class="activity-task-title">
      <h2>task title</h2>
    </div>

    <nav class="activity-menu flex">
      <div class="updates-btn-wrapper">
        <button>Updates</button>
      </div>
      <div class="activity-btn-wrapper">
        <button>Activity Log</button>
      </div>
    </nav>
  <updates />
  <!-- <activity-log /> -->
  </el-drawer>
</template>

<script>
import activityLog from "./activity-log";
import updates from "./updates";

export default {
  props: ["drawer", "task"],
  data() {
    return {};
  },
  methods: {
    closeActivities() {
      this.$store.commit({ type: "toggleActivities" });
    },
  },
  components: {
    activityLog,
    updates
  },
};
</script>

<style>
</style>