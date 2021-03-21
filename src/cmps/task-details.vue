<template>
  <el-drawer
    class="flex justify-start"
    :visible.sync="drawer"
    :direction="'rtl'"
    :before-close="closeActivities"
  >
    <div class="activity-task-title">
      <h2 v-if="task">{{ task.title }}</h2>
    </div>

    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="Updates" name="updates">Updates</el-tab-pane>
      <el-tab-pane label="Activity Log" name="activity">Activity Log</el-tab-pane>
    </el-tabs>

    <!-- <nav class="activity-menu flex">
      <div class="updates-btn-wrapper">
        <button>Updates</button>  
      </div>  
      <div class="activity-btn-wrapper">
        <button>Activity Log</button>
      </div>
    </nav> -->
    <updates v-if="isUpdatesClicked" :comments="task.comments" @addComment="addComment" />
    <!-- <activity-log /> -->
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
      activeName: "updates",
    };
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
      console.log(this.activeName);
    },
    closeActivities() {
      const taskId = this.$route.params.taskId;
      if (taskId) this.$router.go(-1);
      this.$store.commit({ type: "toggleActivities" });
    },
    async getTask(taskId, groupId) {
      try {
        const taskToShow = await this.$store.dispatch({
          type: "getTask",
          taskId,
          groupId,
        });
        this.task = taskToShow;
        console.log("task in details", this.task);
      } catch (err) {
        console.log("err:", err);
      }
    },
    async addComment(newComment) {
      try {
        console.log("newComment:", newComment);
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

        console.log("task in details", this.task);
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
      return this.activeName === 'updates' && this.task
    }
  },
  components: {
    activityLog,
    updates,
  },
  created() {},
  watch: {
    $route(to, from) {
      console.log(to);
      const taskId = this.$route.params.taskId;
      const groupId = this.$route.params.groupId;
      if (taskId) this.getTask(taskId, groupId);
    },
  },
};
</script>

<style>
</style>