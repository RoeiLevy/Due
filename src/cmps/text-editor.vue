<template>
  <div id="app">
<<<<<<< HEAD
    <!-- <button @click="saveContent"></button> -->
=======
>>>>>>> 3da0ae283e4ba981f2c61c8fca5a34bab614f2fe
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
