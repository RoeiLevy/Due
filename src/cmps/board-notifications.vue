<template>
<div class="board-notifications">
    <div class="activity-task-title">
        <h3>Notifications</h3>
    </div>
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="Activity" name="activity">
        <activity-log :activities="board.activities" />
      </el-tab-pane>
      <el-tab-pane label="Updates" name="updates">
           </el-tab-pane>
    </el-tabs>
</div>
</template>

<script>
import activityLog from "./activity-log";
import updates from "./updates";

export default {
  props: ["board"],
  data() {
    return {
      task: null,
      activities: null,
      activeName: "activity",
    };
  },
  methods: {
    handleClick(tab, event) {},
    closeActivities() {
      this.$store.commit({ type: "toggleIsBoardActivities" });
    },
  },
  computed: {
    boardId() {
      return this.$route.params.boardId;
    },
  },
  components: {
    activityLog,
    updates,
  },
  created() {},
  watch: {
    $route(to, from) {},
  },
};
</script>

