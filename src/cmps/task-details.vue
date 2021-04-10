<template>
  <el-drawer
    class="flex justify-start"
    :visible.sync="drawer"
    :direction="'rtl'"
    :before-close="closeDetails"
  >
    <div class="activity-task-title">
      <h2 v-if="task">{{ task.title }}</h2>
    </div>

    <el-tabs v-if="task" v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="Updates" name="updates">
        <updates
          v-if="isUpdatesClicked"
          :comments="task.comments"
          @addComment="addComment"
        />
      </el-tab-pane>
      <el-tab-pane label="Activity Log" name="activity">
        <activity-log :activities="board.activities" />
      </el-tab-pane>
    </el-tabs>
  </el-drawer>
</template>

<script>
import activityLog from "./activity-log";
import updates from "./updates";

export default {
  props: ["drawer", "board"],
  data() {
    return {
      activeName: "updates",
    };
  },
  methods: {
    handleClick(tab, event) {},
    closeDetails() {
      const taskId = this.$route.params.taskId;
      if (taskId) this.$router.go(-1);
      this.$store.commit({ type: "toggleIsDetails" });
    },
    async getTaskActivities(taskId) {
      try {
        const activitiesToShow = await this.$store.dispatch({
          type: "getTaskActivities",
          taskId,
        });
        this.activities = activitiesToShow;
      } catch (err) {
        console.log("err:", err);
      }
    },
    async addComment(newComment) {
      try {
        const groupId = this.$route.params.groupId;
        const editedTask = JSON.parse(JSON.stringify(this.task));
        if (!editedTask["comments"]) editedTask.comments = [];
        editedTask.comments.unshift(newComment);

        const taskToShow = await this.$store.dispatch({
          type: "saveTask",
          task: editedTask,
          groupId,
        });
      } catch (err) {
        console.log("err:", err);
      }
    },
  },
  computed: {
    boardId() {
      return this.$route.params.boardId;
    },
    isUpdatesClicked() {
      return this.activeName === "updates" && this.task;
    },
    task() {
      if (!this.drawer) return;
      const taskId = this.$route.params.taskId;
      const groupId = this.$route.params.groupId;

      const groupIdx = this.board.groups.findIndex((g) => g.id === groupId);
      const taskIdx = this.board.groups[groupIdx].tasks.findIndex(
        (t) => t.id === taskId
      );
      const taskToShow = this.board.groups[groupIdx].tasks[taskIdx];
      return taskToShow;
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

<style>
</style>