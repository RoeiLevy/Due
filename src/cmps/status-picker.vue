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
      <div v-if="editMode" class="flex">
        <el-input
          class="input-new-tag"
          v-model="newStatus.title"
          size="mini"
          @keyup.enter.native="addStatus"
        >
        </el-input>
        <el-color-picker
          v-model="newStatus.color"
          size="mini"
        ></el-color-picker>
      <el-button @click="addStatus" type="primary"
        >Add Status</el-button
      >
      </div>
      <el-button
        v-else
        class="button-new-tag"
        size="small"
        @click="editMode = true"
        >+ New Tag</el-button
      >
      <!-- <div v-if="!editMode">
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
      </div>
      <div v-else>
        <el-tag
          v-for="status in statuses"
          :key="status.id"
          closable
          @close="deleteStatus"
          @click="setStatus(status)"
          style="{border-left:5px solid}"
          :style="{ 'border-left-color': status.color }"
        >
        edit
        </el-tag>
      </div>
      <button v-if="!editMode" @click="editMode = true">
        Add/Edit Statuses
      </button>
      <button v-else @click="editMode = false">Apply</button> -->
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
      editMode: false,
    };
  },
  methods: {
    deleteStatus() {},
    setStatus(status) {
      this.$emit("setStatus", { ...status });
    },
    addStatus() {
      console.log("adding");
      this.$emit("addStatus", this.newStatus);
      this.newStatus = {
        color: "",
        title: "",
      };
    },
  },
  components: {
    draggable,
  },
};
</script>
