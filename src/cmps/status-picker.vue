<template>
  <div class="tag-group">
    <span class="tag-group__title">Labels</span>
    <draggable
      v-if="!editMode"
      class="statuses"
      v-model="statusesToEdit"
      @start="drag = true"
      @end="drag = false"
    >
      <!-- closable
        @close="deleteStatus(status.id)" -->
      <el-tag
        v-for="status in statusesToEdit"
        :key="status.id"
        @click="setStatus(status)"
        :style="{ 'background-color': status.color }"
        effect="dark"
        class="status-btn"
      >
        <h4>{{ status.title }}</h4>
      </el-tag>
    </draggable>
    <draggable
      v-else
      class="edit-statuses"
      v-model="statusesToEdit"
      @start="drag = true"
      @end="drag = false"
    >
    <div class="status-edit-container"
        v-for="(status, idx) in statusesToEdit"
        :key="status.id"
    >
      <el-color-picker
        v-model="statusesToEdit[idx].color"
      ></el-color-picker>
      <el-input
        v-model="statusesToEdit[idx].title"
        closable
        @close="deleteStatus(status.id)"
        :style="{ 'border-left-color': status.color }"
        effect="light"
        class="status-edit"
      />
    </div>
      <!-- <h4>{{ status.title }}</h4> -->
      <!-- </el-tag> -->
    </draggable>
    <div class="status-footer">
      <!-- <div v-if="editMode" class="new-status-container flex">
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
        <el-button id="add-status-btn" @click="addStatus" type="primary"
          >Add Status</el-button
        >
      </div> -->
      <el-button
        v-if="!editMode"
        class="button-new-tag"
        size="small"
        @click="editMode = true"
        >Add/Edit Statuses</el-button
      >
      <el-button
        v-else
        class="button-new-tag"
        size="small"
        @click="applyChanges"
        >Apply</el-button
      >
    </div>
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
      statusesToEdit: null,
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
      if (!this.newStatus.color) this.newStatus.color = "gray";
      this.$emit("addStatus", this.newStatus);
      this.newStatus = {
        color: "",
        title: "",
      };
    },
    async applyChanges() {
      const savedStatuses = await this.$store.dispatch(
        "saveStatuses",
        this.statusesToEdit
      );
      console.log("savedStatuses:", savedStatuses);
      this.editMode = false;
      this.statusesToEdit = Object.values(savedStatuses);
    },
  },
  computed: {
    statuses() {
      return this.$store.getters.statuses;
    },
  },
  created() {
    this.statusesToEdit = JSON.parse(
      JSON.stringify(this.$store.getters.statuses)
    );
    this.statusesToEdit = Object.values(this.statusesToEdit);
    console.log(this.statusesToEdit);
  },
  components: {
    draggable,
  },
};
</script>
