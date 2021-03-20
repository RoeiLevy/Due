<template>
  <div class="updates">
    <div class="new-update-form">
      <input type="text" placeholder="Write an update..." />
    </div>

    <div class="updates-container">
        <update-preview />
    </div>
  </div>
</template>

<script>

import updatePreview from "./update-preview";
import UpdatePreview from './update-preview.vue';
export default {
  props: ["comments"],
  components: {
      updatePreview
  }
};
</script>

    UpdatePreview