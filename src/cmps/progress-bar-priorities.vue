<template>
  <div class="progress">
    <div
      class="box"
      v-for="(priority, idx) in groupPriorities"
      :key="idx"
      :style="{
        'background-color': priority.color,
        width: getData[idx],
      }"
      :title="groupPriorities[idx].title + ': ' + getData[idx]"
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
      var priorities = this.group.tasks.reduce((acc, task) => {
        if (!task.priority) acc.push({ title: "Empty", color: "gray" });
        else
          acc.push({ title: task.priority.title, color: task.priority.color });
        return acc;
      }, []);
      const uniquePriorities = [
        ...new Map(
          priorities.map((priority) => [priority.title, priority])
        ).values(),
      ];
      return uniquePriorities;
    },
    getData() {
      const all = this.group.tasks.length;
      var map = this.groupPriorities.reduce((map, priority) => {
        map[priority.title] = map[priority.title] ? map[priority.title] : 0;
        return map;
      }, {});
      this.group.tasks.forEach((task) => {
        if (!task.priority) map.Empty++;
        else map[task.priority.title]++;
      });
      map = Object.values(map);
      map = map.map((count) => (count = Math.floor((count / all) * 100) + "%"));
      return map;
    },
  },
};
</script>