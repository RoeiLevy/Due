<template>
  <div @click="addMember" class="add-member-preview">
    <avatar :size="40" :username="member.fullname"></avatar>
    <h3>{{ member.fullname }}</h3>
  </div>
</template>

<script>
import Avatar from "vue-avatar";

export default {
  props: ["member"],
  data() {
    return {};
  },
  methods: {
    addMember() {
        this.$emit('addMember', this.member)
    }
  },
  components: {
    Avatar,
  },
};
</script>
