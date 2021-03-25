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
      <el-tag
        v-for="status in statusesToEdit"
        :key="status.id"
        @click="setStatus(status)"
        :style="{ 'background-color': status.color }"
        effect="dark"
        style="text-transform: capitalize"
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
      <div
        class="status-edit-container"
        v-for="(status, idx) in statusesToEdit"
        :key="status.id"
      >
        <el-color-picker v-model="statusesToEdit[idx].color"></el-color-picker>
        <el-input
          v-model="statusesToEdit[idx].title"
          closable
          @close="deleteStatus(status.id)"
          style="text-transform: capitalize"
          :style="{ 'border-left-color': status.color }"
          effect="light"
          class="status-edit"
        />
        <el-button
          class="delete-status-btn"
          type="text"
          @click="deleteStatus(status.id)"
        >
          <font-awesome-icon class="header-icon remove-btn" icon="trash" />
        </el-button>
      </div>
      <div @click="startAdding()" v-if="!isAddingStatus" class="new-status-btn">
        New Status
      </div>
      <div v-else>
        <form class="status-edit-container" @submit.prevent="addStatus()">
          <el-color-picker v-model="newStatus.color"></el-color-picker>
          <el-input
            ref="addInput"
            v-model="newStatus.title"
            closable
            @close="stopAdding()"
            effect="light"
            class="status-edit"
          />
          <el-button
            native-type="submit"
            type="success"
            icon="el-icon-check"
            class="new-status-add-btn"
          ></el-button>
        </form>
      </div>
    </draggable>
    <div class="status-footer">
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
      isAddingStatus: false,
      editMode: false,
      statusesToEdit: null,
    };
  },
  methods: {
    deleteStatus(statusId) {
      const idx = this.statusesToEdit.findIndex((s) => s.id === statusId);
      this.statusesToEdit.splice(idx, 1);
    },
    setStatus(status) {
      this.$emit("setStatus", { ...status });
    },
    addStatus() {
      console.log("added status");
      this.isAddingStatus = false;
      if (!this.newStatus.color) this.newStatus.color = "#808080";
      this.statusesToEdit.push(this.newStatus);
      this.newStatus = {
        color: "",
        title: "",
      };
    },
    startAdding() {
      this.isAddingStatus = true;
      setTimeout(() => {
        this.$refs.addInput.focus();
      }, 0);
    },
    stopAdding() {
      this.isAddingStatus = false;
      this.newStatus = {
        color: "",
        title: "",
      };
    },
    async applyChanges() {
      this.editMode = false;
      const savedStatuses = await this.$store.dispatch(
        "saveStatuses",
        this.statusesToEdit
      );
      this.statusesToEdit = savedStatuses;
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
  },
  components: {
    draggable,
  },
};
</script>
