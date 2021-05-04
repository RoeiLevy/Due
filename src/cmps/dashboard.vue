<template>
  <div class="dashboard">
    <div class="stats">
      <h5><strong>Board Members</strong> : {{ board.members.length }}</h5>
      <h5><strong>Tasks Count</strong> : {{ taskCount }}</h5>
      <h5><strong>Done Tasks Count</strong> : {{ doneCount }}</h5>
    </div>
    <div class="charts">
      <div class="canvas-wrapper">
        <h3>Tasks Status Count</h3>
        <chart :board="board"></chart>
      </div>

      <div class="canvas-wrapper">
        <h3>Members Tasks Count</h3>
        <doughnut :board="board"></doughnut>
      </div>
    </div>
  </div>
</template>

<script>
import chart from "./chart";
import doughnut from "./doughnut";

export default {
  props: ["board"],
  computed: {
    taskCount() {
      return this.board.groups.reduce((acc, group) => {
        return acc + group.tasks.length;
      }, 0);
    },
    doneCount() {
      return this.board.groups.reduce((acc, group) => {
        return (
          acc +
          group.tasks.filter((task) => {
            if (!task.status) return;
            return task.status.title.toLowerCase() === "done";
          }).length
        );
      }, 0);
    },
  },
  components: {
    chart,
    doughnut,
  },
};
</script>
