<template>
  <div class="task-add-member-modal">
    <h3>People</h3>
    <div v-if="members" class="task-members-list">
      <member-preview @click.native="toggleMember(member)" :taskMembers="taskMembers" @toggleMember="toggleMember" v-for="member in members" :member="member" :key="member._id" />
    </div>
  </div>
</template>

<script>
import MemberPreview from "./member-preview.vue";

export default {
  props: ['taskMembers'],
  data() {
    return {
    };
  },
  methods: {
    toggleMember(member) {
      this.$emit('toggleMember', member)
    }
  },
  computed: {
    members() {
      return this.$store.getters.boardMembers;
    },
  },
  components: {
    MemberPreview,
  },
};
</script>
