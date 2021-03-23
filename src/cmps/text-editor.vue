<template>
  <div class="text-editor flex column">
    <vue-editor placeholder="Add a comment..." v-model="content"></vue-editor>
    <el-button class="add-comment-btn" @click="saveContent" type="primary"
      >Update</el-button
    >
  </div>
</template>
 
<script>
import { VueEditor } from "vue2-editor";

export default {
  name: "text-editor",
  data() {
    return {
      content: "",
    };
  },
  methods: {
    saveContent() {
      const newContent = JSON.parse(JSON.stringify(this.content));
      this.$emit("sendComment", newContent);
      this.content = "";
    },
  },
  components: {
    VueEditor,
  },
};
</script>
