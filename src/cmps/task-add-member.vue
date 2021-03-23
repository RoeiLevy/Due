<template>
  <div class="task-add-member-modal">
    <h3>People</h3>
    <div v-if="members" class="task-members-list">
      <member-preview v-for="member in members" :member="member" :key="member._id" />
    </div>
  </div>
</template>

<script>
import { utilService } from "../services/util.service";
import MemberPreview from "./member-preview.vue";

export default {
  data() {
    return {
      newStatus: {
        id: utilService.makeId(),
        color: "",
        title: "",
      },
      editMode: false,
    };
  },
  methods: {
    deleteStatus(statusId) {
      this.$emit("deleteStatus", statusId);
    },
    setStatus(status) {
      this.$emit("setStatus", { ...status });
    },
    addStatus() {
      this.editMode = false;
      this.$emit("addStatus", this.newStatus);
      this.newStatus = {
        color: "",
        title: "",
      };
    },
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
