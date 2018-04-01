<template lang="pug">
  div.date-chip.date(:class=`[
      className.weekday(date),
      className.isToday(date, today),
      className.isThisMonth(date, calendarDate),
  ]`)
    span {{ date.getDate() }}
</template>

<script>
import { mapState } from "vuex"
import isSameMonth  from "date-fns/is_same_month"
import isSameDay    from "date-fns/is_same_day"
import { Weekday }  from "@/utils/MyCalendarUtility"


const className = {
    weekday(date /* :Date */) /* :string */ {
        return Object.getOwnPropertyNames(Weekday)
                .map(key => Weekday[key])
                .find(day => day.id === date.getDay())
                .en
    },
    isToday(date /* Date */, today /* :Date */) /* :string */ {
        return (isSameDay(date, today))
                ? "today"
                : ""
    },
    isThisMonth(
            date         /* :Date */,
            calendarDate /* :Date */) /* :string */ {
        return isSameMonth(date, calendarDate)
                ? "this-month"
                : "not-this-month"
    },
}

export default {
    props: {
        date: {
            type: Date,
            required: true
        }
    },
    data() {
        return {
            className
        }
    },
    computed: Object.assign(
        {},
        mapState([
            "today",
            "calendarDate"
        ])
    )
};
</script>

<style lang="stylus">
</style>
