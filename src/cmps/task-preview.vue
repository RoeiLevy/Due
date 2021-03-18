<template>
  <div class="task-wrapper flex">
    <input
      v-if="editMode"
      v-model="taskToEdit.title"
      @keyup.enter="updateTask"
    />
    <div v-else>
      <label class="task-title" @click="editMode = true">
        {{ taskToEdit.title }}
      </label>
    </div>

    <el-avatar
      v-for="member in task.members"
      :key="member._id"
      :size="30"
      :src="member.imgUrl"
    ></el-avatar>
    <h3 @click="isSelectingStatus = !isSelectingStatus">{{ task.statusId }}</h3>
    <status-picker
      @setStatus="setStatus"
      v-if="isSelectingStatus"
    ></status-picker>
    <input type="date" name="due-date" id="due-date" v-model="dueDate" />
  </div>
</template>

<script>
import moment from "moment";
import statusPicker from "./status-picker.vue";
export default {
  props: ["task"],
  data() {
    return {
      dueDate: "",
      isSelectingStatus: false,
      editMode: false,
      taskToEdit: null,
    };
  },
  methods: {
    setStatus(status) {},
     updateTask() {
       console.log('test')
       this.editMode = false;
          this.$emit('updateTask', this.taskToEdit);
        },
  },
  created() {
    this.taskToEdit = { ...this.task };
  },
  components: {
    statusPicker,
  },
};
</script>

