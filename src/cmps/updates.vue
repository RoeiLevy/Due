<template>
  <div class="updates">
    <div class="new-update-form">
      <input type="text" placeholder="Write an update..." />
    </div>
    <text-editor @sendComment="addComment" />
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
  data() {
    return {
         newComment: {
        txt: '',
        createdAt: null,
        byMember: {
          _id: "u101",
          fullname: "Tal Tarablus",
          imgUrl:
            "http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg",
        },
      },
    }
  },
  methods: {
    addComment(content) {
      this.newComment.createdAt = Date.now()
      this.newComment.txt = content
      const commentToAdd = JSON.parse(JSON.stringify(this.newComment))
      this.$emit('addComment', commentToAdd)
      this.setEmptyComment()

    },
    setEmptyComment() {
        this.newComment =  {
        txt: '',
        createdAt: null,
        byMember: {
          _id: "u101",
          fullname: "Tal Tarablus",
          imgUrl:
            "http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg",
        }
      }
    }
  },
  components: {
    updatePreview,
    textEditor,
  },
};
</script>
