<template>
  <div class="activity-log">
    <div class="activities-container">
    <activity-preview v-for="activity in activities" :key="activity.id" :activity="activity" />
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
};
</script>

