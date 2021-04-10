<template>
  <div class="kanban">
    <draggable
      v-model="boardToEdit.statuses"
      @change="saveBoard"
      v-bind="dragOptions"
    >
      <transition-group type="transition">
        <div
          class="kanban-item"
          v-for="status in boardToEdit.statuses"
          :key="status.id"
          :style="{ 'background-color': status.color }"
        >
          <h3>{{ status.title }} / {{ taskMap[status.title].length }}</h3>
          <ul>
            <li v-for="task in taskMap[status.title]" :key="task.id">
              {{ task.title }}
            </li>
          </ul>
        </div>
      </transition-group>
    </draggable>
  </div>
</template>

<script>
import draggable from "vuedraggable";

export default {
  props: ["board"],
  data() {
    return {
      boardToEdit: { ...this.board },
    };
  },
  methods: {
    async saveBoard() {
      await this.$store.dispatch({
        type: "saveBoard",
        boardToSave: this.boardToEdit,
      });
    },
  },
  computed: {
    dragOptions() {
      return {
        animation: 200,
        group: "description",
        disabled: false,
        ghostClass: "ghost",
      };
    },
    taskMap() {
      var map = this.boardToEdit.statuses.reduce((map, status) => {
        map[status.title] = map[status.title] ? map[status.title] : [];
        return map;
      }, {});
      this.boardToEdit.groups.forEach((group) => {
        group.tasks.forEach((task) => {
          if (task.status) map[task.status.title].push(task);
        });
      });
      return map;
    },
  },
  components: {
    draggable,
  },
};
</script>
