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

    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="Updates" name="updates">
        <updates
          v-if="isUpdatesClicked"
          :comments="task.comments"
          @addComment="addComment"
        />
      </el-tab-pane>
      <el-tab-pane label="Activity Log" name="activity">
        <activity-log :activities="activities" />
      </el-tab-pane>
    </el-tabs>
  </el-drawer>
</template>

<script>
import activityLog from "./activity-log";
import updates from "./updates";

export default {
  props: ["drawer"],
  data() {
    return {
      task: null,
      activities: null,
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
    async getTask(taskId, groupId) {
      try {
        const taskToShow = await this.$store.dispatch({
          type: "getTask",
          taskId,
          groupId,
        });
        this.task = taskToShow;
      } catch (err) {
        console.log("err:", err);
      }
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
        this.task = editedTask;

        const taskToShow = await this.$store.dispatch({
          type: "saveTask",
          task: JSON.parse(JSON.stringify(this.task)),
          groupId,
        });

        this.$store.dispatch({
          type: "sendActivity",
          txt: `Added a comment to "${this.task.title}"`,
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
  },
  components: {
    activityLog,
    updates,
  },
  created() {},
  watch: {
    $route(to, from) {
      const taskId = this.$route.params.taskId;
      const groupId = this.$route.params.groupId;
      if (taskId) {
        this.getTask(taskId, groupId);
        this.getTaskActivities(taskId);
      }
    },
  },
};
</script>

<style>
</style>