<script>
import { Bar } from "vue-chartjs";

export default {
  extends: Bar,
  props: ["board"],
  data() {
    return {
      // board: this.$store.getters.boardForDisplay,
    };
  },
  methods: {
    getData() {
      var map = this.board.statuses.reduce((map, status) => {
        map[status.title] = map[status.title] ? map[status.title] : 0;
        return map;
      }, {});
      this.board.groups.forEach((group) => {
        group.tasks.forEach((task) => {
          if (task.status) map[task.status.title]++;
        });
      });
      return Object.values(map);
    },
  },
  mounted() {
    console.log('hi');
      this.renderChart({
        labels: this.board.statuses.map((s) => s.title),
        datasets: [
          {
            label: "Status Column",
            backgroundColor: this.board.statuses.map((s) => s.color),
            data: this.getData(),
          },
        ],
      });
  },
};
</script>