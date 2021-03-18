<template>
  <div class="task flex">
    <!-- <h4 v-if="task">{{ task.title }}</h4> -->
      <input v-if="editMode" v-model="taskToEdit.title"
      @keyup.enter="editMode=false">
            <div v-else>
        <label @click="editMode = true;"> {{ taskToEdit.title }} </label>
      </div>

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

