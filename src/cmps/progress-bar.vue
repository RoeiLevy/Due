<template>
  <div class="progress">
    <div
      class="box"
      v-for="(status, idx) in groupStatuses"
      :key="idx"
      :style="{
        'background-color': status.color,
        width: getData[idx],
      }"
      :title="groupStatuses[idx].title + ': ' + getData[idx]"
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
      var statuses = this.group.tasks.reduce((acc, task) => {
        if (!task.status)
          acc.push({ title: 'Empty', color: 'gray' });
        else acc.push({ title: task.status.title, color: task.status.color });
        return acc;
      }, []);
      const uniqueStatuses = [
        ...new Map(statuses.map((status) => [status.title, status])).values(),
      ];
      return uniqueStatuses;
    },
    getData() {
      const taskCount = this.group.tasks.length;
      var map = this.groupStatuses.reduce((map, status) => {
        map[status.title] = 0;
        return map;
      }, {});
      this.group.tasks.forEach((task) => {
        if (!task.status) map.Empty++;
        else map[task.status.title]++;
      });
      map = Object.values(map);
      map = map.map((count) => (count = (count / taskCount) * 100 + "%"));
      return map;
    },
  },
};
</script>