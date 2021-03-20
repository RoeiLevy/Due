<template>
  <div class="updates">
    <div class="new-update-form">
      <input type="text" placeholder="Write an update..." />
    </div>

    <div class="updates-container">
        <!-- <update-preview v-for="comment in comments"  /> -->
    </div>
  </div>
</template>

<script>

import updatePreview from "./update-preview";
export default {
  props: ["comments"],
  components: {
      updatePreview
  }
};
</script>
