<template>
<<<<<<< HEAD
  <div class="task-wrapper flex">
    <h4 class="task-title">{{ task.title }}</h4>
=======
  <div class="task flex">
    <!-- <h4 v-if="task">{{ task.title }}</h4> -->
      <input v-if="editMode" v-model="taskToEdit.title"
      @keyup.enter="editMode=false">
            <div v-else>
        <label @click="editMode = true;"> {{ taskToEdit.title }} </label>
      </div>

>>>>>>> bbe43f4fb773dff3753438a24030c7254bcc19a8
    <img
      v-for="member in task.members"
      :key="member._id"
      :src="member.imgUrl"
      style="width: 30px"
    />
    <h3 @click="isSelectingStatus=!isSelectingStatus">{{task.statusId}}</h3>
    <status-picker v-if="isSelectingStatus"></status-picker>
    <input type="date" name="due-date" id="due-date" v-model="dueDate" />
  </div>
</template>

<script>
import moment from "moment";
import statusPicker from './status-picker.vue'
export default {
  props: ["task"],
  data() {
    return {
      dueDate: "",
      isSelectingStatus:false,
      editMode: false,
      taskToEdit: null
    };
  },
  created() {
    this.taskToEdit = {...this.task};

  },
  components:{
      statusPicker
  }
};
</script>

