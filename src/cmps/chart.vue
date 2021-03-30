<script>
import { Bar } from "vue-chartjs";

export default {
  extends: Bar,
  props: ["board"],
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
    const data = {
      labels: this.board.statuses.map((s) => s.title),
      datasets: [
        {
          label: "Tasks Status Chart",
          backgroundColor: this.board.statuses.map((s) => s.color),
          data: this.getData(),
          barThickness: 20,
        },
      ],
    };
    const options = {
      legend: {
        display: false,
      },
      tooltips: {
        titleFontSize: 15,
        bodyFontSize: 10,
      },
      scales: {
        xAxes: [
          {
            ticks: {
              fontSize: 10,
            },
          },
        ],
        yAxes: [
          {
            ticks: {
              stepSize: 1,
              beginAtZero: true,
              fontSize: 15,
            },
          },
        ],
      },
    };
    this.renderChart(data, options);
  },
};
</script>