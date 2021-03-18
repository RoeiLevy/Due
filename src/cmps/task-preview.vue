<template>
  <div class="task flex">
    <h4>{{ task.title }}</h4>
    <el-avatar
      v-for="member in task.members"
      :key="member._id"
      :size="30"
      :src="member.imgUrl"
    ></el-avatar>
    <h3 @click="isSelectingStatus = !isSelectingStatus">{{ task.statusId }}</h3>
    <status-picker @setStatus="setStatus" v-if="isSelectingStatus"></status-picker>
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
    };
  },
  methods:{
    setStatus(status){

    }
  },
  created() {},
  components: {
    statusPicker,
  },
};
</script>

