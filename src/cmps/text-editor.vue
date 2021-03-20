<template>
  <div id="app">
    <vue-editor v-model="content"></vue-editor>
    <button @click="saveContent">Save Update</button>
  </div>
</template>
 
<script>
import { VueEditor } from "vue2-editor";

export default {
  name: "text-editor",
  components: {
    VueEditor,
  },

  data() {
    return {
      content: "<h3>Initial Content</h3>",
    };
  },

  methods: {
    handleSavingContent() {
      // You have the content to save
      console.log(this.content);
    },
  },
};
</script>
