<template>
  <div class="tag-group-priorities">
    <span class="tag-group__title">Labels</span>
    <draggable
      v-if="!editMode"
      class="priorities"
      v-model="prioritiesToEdit"
      @start="drag = true"
      @end="drag = false"
    >
      <div
        v-for="priority in prioritiesToEdit"
        :key="priority.id"
        @click="setPriority(priority)"
        :style="{ 'background-color': priority.color }"
        effect="dark"
        style="text-transform: capitalize"
        class="priority-btn"
      >
        <h4>{{ priority.title }}</h4>
      </div>
    </draggable>
    <draggable
      v-else
      class="edit-priorities"
      v-model="prioritiesToEdit"
      @start="drag = true"
      @end="drag = false"
    >
      <div
        class="priority-edit-container"
        v-for="(priority, idx) in prioritiesToEdit"
        :key="priority.id"
      >
        <el-color-picker v-model="prioritiesToEdit[idx].color"></el-color-picker>
        <el-input
          v-model="prioritiesToEdit[idx].title"
          closable
          @close="deletePriority(priority.id)"
          style="text-transform: capitalize"
          :style="{ 'border-left-color': priority.color }"
          effect="light"
          class="priority-edit"
        />
        <el-button
          class="delete-priority-btn"
          type="text"
          @click="deletePriority(priority.id)"
        >
          <font-awesome-icon class="header-icon remove-btn" icon="trash" />
        </el-button>
      </div>
      <div @click="startAdding()" v-if="!isAddingPriority" class="new-priority-btn">
        New Priority
      </div>
      <div v-else>
        <form class="priority-edit-container" @submit.prevent="addPriority()">
          <el-color-picker v-model="newPriority.color"></el-color-picker>
          <el-input
            ref="addInput"
            v-model="newPriority.title"
            closable
            @close="stopAdding()"
            effect="light"
            class="priority-edit"
          />
          <el-button
            native-type="submit"
            type="success"
            icon="el-icon-check"
            class="new-priority-add-btn"
          ></el-button>
        </form>
      </div>
    </draggable>
    <div class="priority-footer">
      <el-button
        v-if="!editMode"
        class="button-new-tag"
        size="small"
        @click="editMode = true"
        >Add/Edit Priorities</el-button
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
      newPriority: {
        id: utilService.makeId(),
        color: "",
        title: "",
      },
      isAddingPriority: false,
      editMode: false,
      prioritiesToEdit: null,
    };
  },
  methods: {
    deletePriority(priorityId) {
      const idx = this.prioritiesToEdit.findIndex((s) => s.id === priorityId);
      this.prioritiesToEdit.splice(idx, 1);
    },
    setPriority(priority) {
      this.$emit("setPriority", { ...priority });
    },
    addPriority() {
      console.log("added priority");
      this.isAddingPriority = false;
      if (!this.newPriority.color) this.newPriority.color = "#808080";
      this.prioritiesToEdit.push(this.newPriority);
      this.newPriority = {
        color: "",
        title: "",
      };
    },
    startAdding() {
      this.isAddingPriority = true;
      setTimeout(() => {
        this.$refs.addInput.focus();
      }, 0);
    },
    stopAdding() {
      this.isAddingPriority = false;
      this.newPriority = {
        color: "",
        title: "",
      };
    },
    async applyChanges() {
      this.editMode = false;
      const savedPriorities = await this.$store.dispatch(
        "savePriorities",
        this.prioritiesToEdit
      );
      this.prioritiesToEdit = savedPriorities;
    },
  },
  computed: {
    priorities() {
      return this.$store.getters.priorities;
    },
  },
  created() {
    this.prioritiesToEdit = JSON.parse(
      JSON.stringify(this.$store.getters.priorities)
    );
  },
  components: {
    draggable,
  },
};
</script>
