<template>
  <section class="workspace">
    <div class="workspace-menu-container">
      <el-menu
        @select="toggleCollapse"
        class="el-menu-vertical-demo"
        @open="handleOpen"
        @close="handleClose"
        :collapse="isCollapse"
      >
        <el-menu-item index="2">
          <i class="workspace-icon el-icon-menu"></i>

          <span slot="title">{{ boardTitle() }}</span>
        </el-menu-item>
      </el-menu>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      isCollapse: true,
    };
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    toggleCollapse() {
      this.isCollapse = !this.isCollapse;
    },
    boardTitle() {
      return this.isCollapse ? "Board List" : "Close Board List";
    },
    
  },
};
</script>