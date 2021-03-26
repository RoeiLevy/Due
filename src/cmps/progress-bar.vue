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
        } else map.push(task.status);
      });
      return map;
    },
    getData() {
      const all = this.group.tasks.length;
      var map = this.groupStatuses.reduce((map, status) => {
        map[status.title] = map[status.title] ? map[status.title] : 0;
        return map;
      }, {});
      this.group.tasks.forEach((task) => {
        if (!task.status) map.Empty++;
        else map[task.status.title]++;
      });
      map = Object.values(map);
      map=map.map(count=>count=(count/all)*100+'%');
      return map;
    },
  },
};
</script>