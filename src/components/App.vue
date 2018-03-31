<template lang="pug">
  div.component-root

    div.header
      div.prev-month
        button.change-prev-month-button(
          @click="subMonth"
          :title="formatYearAndMonth(prevMonth)") ＜

      div.calendar-year-and-month
        span
          select.calendar-year(@change="changeYear")
            option(v-for="year in calendarYearOptions"
                :value="year" :selected="year === calendarYear")
              | {{ year }}
          span 年
          select.calendar-month(@change="changeMonth")
            option(v-for="month in calendarMonthOptions"
                :value="month" :selected="month === calendarMonth")
              | {{ month + 1 }}
          span 月

      div.next-month
        button.change-next-month-button(
          @click="addMonth"
          :title="formatYearAndMonth(nextMonth)") ＞
    
    div.body
      div.week-header
        div.day(v-for="day in Weekday" :class="day.en")
          span {{ day.ja }}
      div.week(v-for="week in weekList")
        div.date(v-for="date in week"
            :class="[className.weekday(date), className.isThisMonth(date, calendarDate)]")
          span {{ date.getDate() }}

</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex"
import isSameMonth from "date-fns/is_same_month"
import formatDate  from "date-fns/format"
import { range }   from "@/js/MyArrayUtility"
import { Weekday } from "@/js/MyCalendarUtility"


const className = {
    isThisMonth(
            date         /* :Date */,
            calendarDate /* :Date */) /* :string */ {
        return isSameMonth(date, calendarDate)
                ? "this-month"
                : "not-this-month"
    },
    weekday(date /* :Date */) {
        return Object.getOwnPropertyNames(Weekday)
                .map(key => Weekday[key])
                .find(day => day.id === date.getDay())
                .en
    }
}

export default {
    data() {
        return {
            Weekday,
            className
        }
    },
    computed: Object.assign({
        calendarYearOptions() {
            const year = this.calendarYear
            return range(year - 5, year + 5)
        },
        calendarMonthOptions() {
            return range(0, 11)
        }
    },
    mapState([
        "calendarDate"
    ]),
    mapGetters([
        "calendarYear",
        "calendarMonth",
        "prevMonth",
        "nextMonth",
        "weekList"
    ])),
    methods: Object.assign({
        formatYearAndMonth(
                dateOrYear  /* :Date      | number */,
                month       /* :undefined | number */) /* :string */ {
            const date = (dateOrYear instanceof Date)
                    ? dateOrYear
                    : new Date(dateOrYear, month, 1)
            return formatDate(date, "YYYY年M月")
        },
        isSameMonth,
        changeYear(event) {
            this.$store.dispatch("changeYear", event.target.value)
        },
        changeMonth(event) {
            this.$store.dispatch("changeMonth", event.target.value)
        }
    }, mapActions([
        "subMonth",
        "addMonth"
    ]))
}

</script>

<style lang="stylus" scoped>
  date-width = 3em
  date-height = 3em

  .header
    display: flex
    width: date-width * 7

    .prev-month, .next-month
      width: @width * .25

    .change-prev-month-button,
    .change-next-month-button
      width: 3em
      margin: auto

    .calendar-year-and-month
      width: @width * .5

      &>span
        margin: auto

  .day, .date
    width: date-width
    height: date-height

    &.sunday
      color: red
    &.saturday
      color: blue

  .date
    // &.this-month
    &.not-this-month
      color: silver     // #C0C0C0

  .week-header, .week
    display: flex

</style>
