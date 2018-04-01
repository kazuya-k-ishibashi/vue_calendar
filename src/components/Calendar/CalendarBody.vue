<template lang="pug">
  div.calendar-body
    div.week-header
      div.day(v-for="day in Weekday" :class="day.en")
        span {{ day.ja }}
    div.weeks(v-for="week in weekList")
      date-chip(v-for="date in week" :date="date")
</template>

<script>
import { mapState, mapGetters } from "vuex"
import isSameMonth from "date-fns/is_same_month"
import isSameDay   from "date-fns/is_same_day"
import formatDate  from "date-fns/format"
import DateChip    from "@/components/Calendar/DateChip"
import { Weekday } from "@/utils/MyCalendarUtility"


export default {
    components: {
        DateChip
    },
    data() {
        return {
            Weekday,
        }
    },
    computed: Object.assign({
        },
        mapState([
            "today",
            "calendarDate"
        ]),
        mapGetters([
            "weekList"
        ]
    ))
};
</script>

<style lang="stylus">
  .week-header, .weeks
    display: flex

  .today
    background-color: yellow

</style>
