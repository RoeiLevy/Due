<template>
  <div class="notifications">
    <div class="notifications-container">
      <notification-preview
        :notification="notification"
        v-for="(notification, idx) in notifications"
        :key="idx"
      />
    </div>
  </div>
</template>

<script>
import notificationPreview from "./notification-preview";

export default {
  props: ["notifications"],
  data() {
    return {
     
    };
  },
  methods: {
    
  },
  components: {
      notificationPreview
  },
};
</script>
