<template>
  <el-drawer
    class="flex justify-start"
    :visible.sync="drawer"
    :direction="'rtl'"
    :before-close="closeActivities"
  >
    <div class="activity-task-title">
      <h2 v-if="board">{{ board.title }} Log</h2>
    </div>

    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="Activity" name="activity">
        <activity-log :activities="board.activities" />
      </el-tab-pane>
      <el-tab-pane label="Updates" name="updates">
        <!-- <updates
        v-if="board"
          :comments="task.comments"
          @addComment="addComment"
        /> -->
      </el-tab-pane>
    </el-tabs>
  </el-drawer>
</template>

<script>
import activityLog from "./activity-log";
import updates from "./updates";

export default {
  props: ["drawer", 'board'],
  data() {
    return {
      task: null,
      activities: null,
      activeName: "activity",
    };
  },
  methods: {
    handleClick(tab, event) {
    },
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
    $route(to, from) {
    },
  },
};
</script>

<style>
</style>