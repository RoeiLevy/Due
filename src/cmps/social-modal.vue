<template>
  <div class="social-modal">
    <el-tabs v-model="activeTab">
      <el-tab-pane label="Members" name="member" class="members">
        <h3 v-if="!members || !members.length">No Members</h3>
        <div v-else class="members-list">
          <div class="member" v-for="member in members" :key="member._id">
            <avatar :username="member.fullname" :size="30" :src="member.img"></avatar>
            {{ member.fullname }}
          </div>
        </div>
      </el-tab-pane>
      
      <el-tab-pane label="Invite" name="invite">
        <el-input maxlength=200 size=small class="email-input" placeholder="Member Email" v-model="email">
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
  created() {
    console.log(this.members);
  }
};
</script>
