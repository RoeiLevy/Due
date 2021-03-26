<template>
  <div class="avatar-container">
    <el-badge type=info v-if="extraMembers" :value="extraMembers" class="members-badage"> </el-badge>
    <avatar
      class="member-avatar"
      v-for="member in membersToShow"
      :key="member._id"
      :size="30"
      :username="member.fullname"
      :src="member.imgUrl"
    ></avatar>
  </div>
</template>

<script>
    import Avatar from 'vue-avatar'
export default {
  props: ["members"],
  computed: {
    membersToShow() {
      if (this.members.length > 3) {
        return this.members.slice(0, 3);
      } else return this.members
    },
    extraMembers() {
        if  (this.members.length > 3) {
            return `+ ${this.members.length - 3}` 
        } else return false
    }
  },
  components: {
      Avatar
  }
};
</script>
