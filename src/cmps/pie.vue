<script>
import { Pie } from "vue-chartjs";

export default {
  extends: Pie,
  props: ["board"],
  methods: {
    getData() {
      var map = this.board.members.reduce((map, member) => {
        map[member.fullname] = map[member.fullname] ? map[member.fullname] : 0;
        return map;
      }, {});
      this.board.groups.forEach((group) => {
        group.tasks.forEach((task) => {
          if (task.members) {
            task.members.forEach((member) => {
              map[member.fullname]++;
            });
          }
        });
      });
      const arr = [];
      for (const member in map) {
        arr.push(member);
      }
      return Object.values(map);
    },
  },
  mounted() {
    const data = {
      labels: this.board.members.map((m) => m.fullname),
      datasets: [
        {
          backgroundColor: this.board.statuses.map((s) => s.color),
          data: this.getData(),
        },
      ],
    };
    const options = {
      tooltips: {
        titleFontSize: 20,
        bodyFontSize: 15,
      },
    };
    this.renderChart(data, options);
  },
};
</script>