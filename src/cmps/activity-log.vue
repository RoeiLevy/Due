<template>
  <div class="activity-log">
    <div v-if="activities" class="activities-container">
      <h3 v-if="!activities || !activities.length">No Activities</h3>
      <activity-preview
        v-for="activity in activitiesToShow"
        :key="activity.id"
        :activity="activity"
      />
    </div>
  </div>
</template>

<script>
import activityPreview from "./activity-preview";

export default {
  props: ["activities"],
  components: {
    activityPreview,
  },
  computed: {
    activitiesToShow() {
      const taskId = this.$route.params.taskId;
      if (taskId) {
        const taskActivities = this.activities.filter((a) => {
          if (a.task) return a.task.id === taskId;
        });
        return taskActivities;
      } else {
        return this.activities;
      }
    },
  },
  created() {},
};
</script>

