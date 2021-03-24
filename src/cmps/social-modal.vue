<template>
  <div class="social-modal">
    <el-tabs v-model="activeTab">
      <el-tab-pane label="Members" name="member" class="members">
        <h2 v-if="!members.length">No Members</h2>
        <div v-if="members" class="members-list">
          <h2>Board Members</h2>
          <div class="member" v-for="member in members" :key="member._id">
            <avatar :size="30" :src="member.imgUrl"></avatar>
            {{ member.fullname }}
          </div>
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
    Avatar,
  },
};
</script>
