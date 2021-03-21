<template>
  <div class="social-modal">
      <span>Board Members</span>
      <el-input placeholder="Enter name or email"></el-input>
      <div class="member" v-for="member in members" :key="member.id">
        <el-avatar
          :size="30"
          :src="member.imgUrl"
        ></el-avatar>
        {{member.fullname}}
        

      </div>

  </div>
</template>

<script>
export default {
  props:['members']
}
</script>
