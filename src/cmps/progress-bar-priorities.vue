<template>
  <div class="progress">
    <div
      class="box"
      v-for="(priority, idx) in groupPriorities"
      :key="idx"
      :style="{
        'background-color': groupPriorities[idx].color,
        width: getData[idx],
      }"
      :title="groupPriorities[idx].title + ': ' + getData[idx]"
    >
      <div class="popover">
        <h5>{{ groupPriorities[idx].title }}</h5>
        {{ getData[idx] }}
      </div>
    </div>
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
          if (map.includes({ title: "Empty", color: "#f7f8fa" }));
          else map.push({ title: "Empty", color: "#f7f8fa" });
        } else map.push(task.priority);
      });
      return map;
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
      map = map.map((count) => (count = (Math.floor((count / all) * 100)) + "%"));
      // console.log('map:', map)
      return map;
    },
  },
};
</script>