<template>
  <div class="add-member-preview">
    <avatar :size="40" :username="member.fullname"></avatar>
    <h3>{{ member.fullname }}</h3>
  </div>
</template>

<script>
import Avatar from "vue-avatar";

export default {
    props: ['member'],
  data() {
    return {

    }
  },
  components: {
    Avatar,
  },
};
</script>
