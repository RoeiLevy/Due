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
    <updates v-if="task" :comments="task.comments" @addComment="addComment" />
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
    };
  },
  methods: {
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
        console.log('newComment:', newComment)
        const groupId = this.$route.params.groupId;
        const editedTask = JSON.parse(JSON.stringify(this.task))
        if (!editedTask['comments']) editedTask.comments = []
        editedTask.comments.unshift(newComment)
        this.task = editedTask

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