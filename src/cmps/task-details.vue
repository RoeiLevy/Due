<template>
  <el-drawer
    title="task details"
    :visible.sync="drawer"
    :direction="'rtl'"
    :before-close="closeActivities"
  >
    <span>Hi, there!</span>
  </el-drawer>
</template>

<script>
export default {
  props: ["drawer"],
  data() {
    return {
    };
  },
  methods: {
      closeActivities() {
          this.$store.commit({ type: 'toggleActivities'})
      }
  }
};
</script>

<style>
</style>