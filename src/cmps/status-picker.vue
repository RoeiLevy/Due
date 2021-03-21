<template>
  <div class="tag-group">
    <span class="tag-group__title">Labels</span>
    <draggable
      class="statuses"
      v-model="statuses"
      @start="drag = true"
      @end="drag = false"
    >
      <el-tag
        v-for="status in statuses"
        :key="status.id"
        closable
        @close="deleteStatus"
        @click="setStatus(status)"
        :style="{ 'background-color': status.color }"
        effect="dark"
      >
        {{ status.title }}
      </el-tag>
      <button v-if="editMode=false" @click="editMode=true">Add/Edit Statuses</button>
      <button v-else @click="editMode=false">Apply</button>
    </draggable>
  </div>
</template>

<script>
import draggable from "vuedraggable";
export default {
  data() {
    return {
      statuses: this.$store.getters.statuses,
      newStatus: {
        color: "",
        title: "",
      },
      editMode:false
    };
  },
  methods: {
    deleteStatus() {},
    setStatus(status) {
      this.$emit("setStatus", { ...status });
    },
  },
  components: {
    draggable,
  },
};
</script>
