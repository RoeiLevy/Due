<template>
  <div class="progress">
    <div
      class="box"
      v-for="(status, idx) in map"
      :key="idx"
      :style="{
        'background-color': status.color,
      }"
    ></div>
  </div>
</template>

<script>
export default {
  props: ["group"],
  methods: {
    getData(status) {
      console.log("status:", status);
      var map = this.statuses.reduce((map, status) => {
        map[status.title] = map[status.title] ? map[status.title] : 0;
        return map;
      }, {});
      this.group.tasks.forEach((task) => {
        if (task.status) {
          map[task.status.title]++;
        }
      });
      return map;
      //   const count = this.group.tasks.reduce((acc, task) => {
      //     if (task.status && task.status.color === status.color) return acc++;
      //   }, 0);
      //   console.log("count:", count);
      //   return count;
    },
  },
  computed: {
    statuses() {
      return this.$store.getters.statuses;
    },
    map() {
      const map = [];
      this.group.tasks.forEach((task) => {
        if (map.includes(task.status)) return;
        if (!task.status) return map.push({ color: "gray" });
        map.push(task.status);
      });
      map.forEach((s) => {
        s.count = this.group.tasks.reduce((acc, task) => {
          return acc++;
        }, 0);
      });
      console.log("map:", map);
      return map;
    },
  },
};
</script>