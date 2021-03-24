<template>
  <div @click.stop="toggleMember" class="add-member-preview">
    <div class="member-view">
      <avatar :size="40" :username="member.fullname"></avatar>
      <h3>{{ member.fullname }}</h3>
    </div>

    <div class="check-wrapper">
      <font-awesome-icon
        v-if="!isMemberChosen"
        class="header-icon"
        icon="circle"
      />
      <font-awesome-icon
        v-else
        class="header-icon"
        icon="check-circle"
      />
    </div>
  </div>
</template>

<script>
import Avatar from "vue-avatar";

export default {
  props: ["member", "taskMembers"],
  data() {
    return {};
  },
  methods: {
    toggleMember() {
      this.$emit("toggleMember", this.member);
    },
  },
  computed: {
    isMemberChosen() {
      if (!this.taskMembers) return
      return this.taskMembers.some((m) => m._id === this.member._id);
    },
  },
  components: {
    Avatar,
  },
};
</script>
