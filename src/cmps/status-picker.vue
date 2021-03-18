<template>
  <div class="tag-group">
    <span class="tag-group__title">Labels</span>
    <draggable
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
    </draggable>
  </div>
</template>

<script>
import draggable from "vuedraggable";
export default {
  data() {
    return {
      statuses: this.$store.getters.statuses,
    };
  },
  methods:{
    deleteStatus(){

    },
    setStatus(status){
      this.$emit('setStatus',{...status})
    }
  },
  components: {
    draggable,
  },
};
</script>
