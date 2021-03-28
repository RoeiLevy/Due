<template>
  <div class="calendar">
    <v-calendar
      class="custom-calendar max-w-full"
      :masks="masks"
      :attributes="attributes"
      disable-page-swipe
      is-expanded
    >
      <template v-slot:day-content="{ day, attributes }">
        <div class="day-wrapper">
          <span>{{ day.day }}</span>
          <div class="task">
            <p
              v-for="attr in attributes"
              :key="attr.key"
              :style="{ 'background-color': attr.customData.style }"
            >
              {{ attr.customData.title }}
            </p>
          </div>
        </div>
      </template>
    </v-calendar>
    <div class="groups">
      <p
        v-for="group in board.groups"
        :key="group.id"
        :style="{ 'background-color': group.style.color }"
      >
        {{ group.title }}
      </p>
    </div>
  </div>
</template>


<script>
import vCalendar from "v-calendar/lib/components/calendar.umd";
export default {
  props: ["board"],
  data() {
    return {
      masks: {
        weekdays: "WWW",
      },
    };
  },
  computed: {
    attributes() {
      const map = [];
      var idx = 0;
      this.board.groups.forEach((group) => {
        group.tasks.forEach((task) => {
          if (task.dueDate)
            map.push({
              key: idx++,
              customData: {
                title: task.title,
                style: group.style.color,
              },
              dates: new Date(task.dueDate),
            });
        });
      });
      return map;
    },
  },
  components: {
    vCalendar,
  },
};
</script>