<template>
  <div class="text-editor flex column">
    <vue-editor
      useCustomImageHandler
      @image-added="handleImageAdded"
      placeholder="Add a comment..."
      v-model="content"
    ></vue-editor>
    <el-button class="add-comment-btn" @click="saveContent" type="primary"
      >Update</el-button
    >
  </div>
</template>
 
<script>
import { VueEditor } from "vue2-editor";
import { utilService } from "../services/util.service";

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
    async handleImageAdded(file, Editor, cursorLocation, resetUploader) {
      const newURL = await utilService.uploadImg(file);
      var formData = new FormData();
      formData.append("file", file);
      Editor.insertEmbed(cursorLocation, "image", newURL);
      resetUploader();
    },
  },
  components: {
    VueEditor,
  },
};
</script>
