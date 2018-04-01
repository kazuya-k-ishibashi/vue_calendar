<template lang="pug">
  div.calendar
    calendar-header
    calendar-body
</template>

<script>
import parse          from "date-fns/parse"
import CalendarHeader from "@/components/Calendar/CalendarHeader"
import CalendarBody   from "@/components/Calendar/CalendarBody"


export default {
    props: {
        "date": {
            type: [ Date, String, Number ],
            require: false
        }
    },
    components: {
        CalendarHeader,
        CalendarBody
    },
    created() {
        if (this.date === undefined) {
            return
        }

        try {
            const date = parseDate(this.date)

            this.$store.commit("updateCalendarDate", {
                calendarDate: date
            })
        } catch (e /* Error */) {
            console.error(e.message)
            return
        }
    }
}

function parseDate(
        date /* :Date | string | number */) /* :Date */ {

    if (date instanceof Date) {
        return date
    }

    switch (typeof date) {
        case "string":
            return parse(date, "YYYY-MM-DD") 
        case "number":
            return new Date(date)
        default:
            throw new TypeError(`date=${ date }`)
    }
}
</script>

<style lang="stylus">
  date-width  = 3em
  date-height = 3em

  .calendar-header
    display: flex
    width  : date-width * 7

  .day, .date
    width : date-width
    height: date-height

    &.sunday
      color: red
    &.saturday
      color: blue

  .date
    // &.this-month
    &.not-this-month
      color: silver     // #C0C0C0

</style>
