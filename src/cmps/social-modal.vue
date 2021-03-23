<template>
  <div class="social-modal">
    <el-tabs v-model="activeTab">
      <el-tab-pane label="Members" name="member" class="members">
        <span>Board Members</span>
        <div class="member" v-for="member in members" :key="member.id">
          <el-avatar :size="30" :src="member.imgUrl"></el-avatar>
          {{ member.fullname }}
        </div>
      </el-tab-pane>
      <el-tab-pane label="Invite" name="invite">
        <el-input placeholder="Email of wanted member" v-model="email">
        </el-input>
        <el-button @click="addMember" type="primary">Add Member</el-button>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import Avatar from "vue-avatar";

export default {
  props: ["members"],
  data() {
    return {
      activeTab: "member",
      email: "",
    };
  },
  methods: {
    addMember() {
      this.$emit("addMember", this.email);
      this.email = "";
    },
  },
  components: {
    Avatar
  }
};
</script>
