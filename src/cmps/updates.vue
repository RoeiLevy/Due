<template>
  <div class="updates">
    <div class="new-update-form">
      <input type="text" placeholder="Write an update..." />
    </div>
    <text-editor/>
    <div class="updates-container">
        <!-- <update-preview v-for="comment in comments"  /> -->
    </div>
  </div>
</template>

<script>

import updatePreview from "./update-preview";
import textEditor from "./text-editor.vue";


export default {
  props: ["comments"],
  components: {
      updatePreview,
      textEditor
  }
};
</script>
