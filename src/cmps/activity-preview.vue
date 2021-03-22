<template>
  <div class="single-activity"> 
      <div class="activity-box">
          <h3> {{activity.txt}}</h3>
      </div>
  </div>
</template>

<script>
export default {
    props: ['activity'],
    created() {
        console.log(this.activity);
    }
}
</script>
