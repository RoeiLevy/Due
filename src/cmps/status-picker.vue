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
        @close="deleteStatus(status.id)"
        @click="setStatus(status)"
        :style="{ 'background-color': status.color }"
        effect="dark"
      >
        <h4>{{ status.title }}</h4>
      </el-tag>
    </draggable>
    <div class="status-footer">
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
        <el-button @click="addStatus" type="primary">Add Status</el-button>
      </div>
      <el-button
        v-else
        class="button-new-tag"
        size="small"
        @click="editMode = true"
        >+ New Tag</el-button
      >
    </div>
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
  </div>
</template>

<script>
import draggable from "vuedraggable";
import { utilService } from "../services/util.service";
export default {
  data() {
    return {
      newStatus: {
        id: utilService.makeId(),
        color: "",
        title: "",
      },
      editMode: false,
    };
  },
  methods: {
    deleteStatus(statusId) {
      this.$emit("deleteStatus", statusId);
    },
    setStatus(status) {
      this.$emit("setStatus", { ...status });
    },
    addStatus() {
      this.editMode = false;
      this.$emit("addStatus", this.newStatus);
      this.newStatus = {
        color: "",
        title: "",
      };
    },
  },
  computed: {
    statuses() {
      return this.$store.getters.statuses;
    },
  },
  components: {
    draggable,
  },
};
</script>
