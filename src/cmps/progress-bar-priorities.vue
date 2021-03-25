<template>
  <div class="progress">
    <div
      class="box"
      v-for="(priority, idx) in groupPriorities"
      :key="idx"
      :style="{
        'background-color': groupPriorities[idx].color,
        width: getData[idx]
      }"
    ></div>
  </div>
</template>

<script>
export default {
  props: ["group"],
  computed: {
    priorities() {
      return this.$store.getters.priorities;
    },
    groupPriorities() {
      const map = [];
      this.group.tasks.forEach((task) => {
        if (map.includes(task.priority)) return;
        else if (!task.priority) {
          if (map.includes({ title: "Empty", color: "gray" }));
          else map.push({ title: "Empty", color: "gray" });
          // if (map.includes({ color: "gray" }) return;
          // else return map.push({ color: "gray" });
        } else map.push(task.priority);
      });
      map.pop();
      // console.log("map:", map);
      return map;
    },
    getData() {
      const all = this.group.tasks.length;
      var map = this.groupPriorities.reduce((map, priority) => {
        map[priority.title] = map[priority.title] ? map[priority.title] : 0;
        return map;
      }, {});
      console.log("map:", map);
      this.group.tasks.forEach((task) => {
        if (!task.priority) map.Empty++;
        else map[task.priority.title]++;
      });
      map = Object.values(map);
      map=map.map(count=>count=(count/all)*100+'%');
      console.log('map:', map)
      return map;
      //   const count = this.group.tasks.reduce((acc, task) => {
      //     if (task.priority && task.priority.color === priority.color) return acc++;
      //   }, 0);
      //   console.log("count:", count);
      //   return count;
    },
    // map() {
    //   const map = [];
    //   this.group.tasks.forEach((task) => {
    //     if (map.includes(task.priority)) return;
    //     if (!task.priority) return map.push({ color: "gray" });
    //     map.push(task.priority);
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