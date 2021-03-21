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
      <el-tag
        v-if="!isAdding"
        @click="isAdding = !isAdding"
        effect="dark"
        style="{ 'background-color':gray }"
      >
        New Status
      </el-tag>
      <!-- <el-tag
        v-else
        @click="isAdding = !isAdding"
        :style="{ 'background-color': status.color }"
        effect="dark"
      >
        {{ status.title }}
      </el-tag> -->
      <div v-else>
        <el-input placeholder="Please input" v-model="newStatus.title"></el-input>
        <el-color-picker
          v-model="newStatus.color"
          size="mini"
        ></el-color-picker>
      </div>
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
      isAdding:false
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
