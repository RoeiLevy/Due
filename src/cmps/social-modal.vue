<template>
  <div class="social-modal">
    <el-tabs v-model="activeTab">
      <el-tab-pane label="Members" name="member" class="members">
        <span>Board Members</span>
        <!-- <el-input placeholder="Enter name or email"></el-input> -->
        <div class="member" v-for="member in members" :key="member.id">
          <el-avatar :size="30" :src="member.imgUrl"></el-avatar>
          {{ member.fullname }}
        </div>
      </el-tab-pane>
      <el-tab-pane label="Invite" name="invite">
        <el-input placeholder="Email of wanted member" v-model="email">
        </el-input>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
export default {
  props: ["members"],
  data() {
    return {
      activeTab: "Members",
    };
  },
};
</script>
