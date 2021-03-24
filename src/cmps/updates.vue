<template>
  <div class="updates">
    <div class="new-update-form">
      <text-editor @sendComment="addComment" />
    </div>
    <div class="updates-container">
      <update-preview
        :comment="comment"
        v-for="(comment, idx) in comments"
        :key="idx"
      />
    </div>
  </div>
</template>

<script>
import updatePreview from "./update-preview";
import textEditor from "./text-editor.vue";

export default {
  props: ["comments"],
  data() {
    return {
      newComment: {
        txt: "",
        createdAt: null,
        byMember: this.$store.getters.loggedInUser,
      },
    };
  },
  methods: {
    addComment(content) {
      this.newComment.createdAt = Date.now();
      this.newComment.txt = content;
      this.newComment.byMember = this.$store.getters.loggedInUser
      const commentToAdd = JSON.parse(JSON.stringify(this.newComment));
      this.$emit("addComment", commentToAdd);
      this.setEmptyComment();
    },
    setEmptyComment() {
      this.newComment = {
        txt: "",
        createdAt: null,
        byMember: null
      };
    },
  },
  components: {
    updatePreview,
    textEditor,
  },
};
</script>
