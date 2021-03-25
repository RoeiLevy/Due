<template>
  <div class="progress">
    <div
      class="box"
      v-for="(status, idx) in groupStatuses"
      :key="idx"
      :style="{
        'background-color': groupStatuses[idx].color,
        width: getData[idx]
      }"
    ></div>
  </div>
</template>

<script>
export default {
  props: ["group"],
  computed: {
    statuses() {
      return this.$store.getters.statuses;
    },
    groupStatuses() {
      const map = [];
      this.group.tasks.forEach((task) => {
        if (map.includes(task.status)) return;
        else if (!task.status) {
          if (map.includes({ title: "Empty", color: "#f7f8fa" }));
          else map.push({ title: "Empty", color: "#f7f8fa" });
          // if (map.includes({ color: "gray" }) return;
          // else return map.push({ color: "gray" });
        } else map.push(task.status);
      });
      map.pop();
      // console.log("map:", map);
      return map;
    },
    getData() {
      const all = this.group.tasks.length;
      var map = this.groupStatuses.reduce((map, status) => {
        map[status.title] = map[status.title] ? map[status.title] : 0;
        return map;
      }, {});
      console.log("map:", map);
      this.group.tasks.forEach((task) => {
        if (!task.status) map.Empty++;
        else map[task.status.title]++;
      });
      map = Object.values(map);
      map=map.map(count=>count=(count/all)*100+'%');
      console.log('map:', map)
      return map;
      //   const count = this.group.tasks.reduce((acc, task) => {
      //     if (task.status && task.status.color === status.color) return acc++;
      //   }, 0);
      //   console.log("count:", count);
      //   return count;
    },
    // map() {
    //   const map = [];
    //   this.group.tasks.forEach((task) => {
    //     if (map.includes(task.status)) return;
    //     if (!task.status) return map.push({ color: "gray" });
    //     map.push(task.status);
    //   });
    //   map.forEach((s) => {
    //     s.count = this.group.tasks.reduce((acc, task) => {
    //       return acc++;
    //     }, 0);
    //   });
    //   console.log("map:", map);
    //   return map;
    // },
  },
};
</script>