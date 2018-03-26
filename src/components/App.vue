<template lang="pug">
  div.root
    div.header
      div.prev-month
        button.change-prev-month-button(
          @click="changePrevMonth"
          :title="formatYearAndMonth(prevMonth)") ＜

      div.calendar-year-and-month
        span
          select.calendar-year(v-model="calendarYear")
            option(v-for="year in calendarYearOptions"
                :value="year") {{ year }}
          span 年
          select.calendar-month(v-model="calendarMonth")
            option(v-for="month in calendarMonthOptions"
                :value="month") {{ month + 1 }}
          span 月

      div.next-month
        button.change-next-month-button(
          @click="changeNextMonth"
          :title="formatYearAndMonth(nextMonth)") ＞
    
    div.body
      div.week-header
        div.day(v-for="day in weekday" :class="day.en")
          span {{ day.ja }}
      div.week(v-for="week in weekList")
        div.date(v-for="date in week"
            :class="[className.weekday(date), className.isThisMonth(date, calendarDate)]")
          span {{ date.getDate() }}

    //- div(v-for="week in weeks")
</template>

<script>
import startOfMonth    from "date-fns/start_of_month"
import startOfWeek     from "date-fns/start_of_week"
import lastDayOfMonth  from "date-fns/last_day_of_month"
import lastDayOfWeek   from "date-fns/last_day_of_week"
import addDays         from "date-fns/add_days"
import addMonths       from "date-fns/add_months"
import subMonths       from "date-fns/sub_months"
import isBefore        from "date-fns/is_before"
import isSameDay       from "date-fns/is_same_day"
import isSameMonth     from "date-fns/is_same_month"
import formatDate      from "date-fns/format"
import { range }       from "@/js/MyArrayUtility"


const today = new Date()

const weekday = Object.freeze({
    SUNDAY      : { id: 0, ja: "日", en: "sunday"    },
    MONDAY      : { id: 1, ja: "月", en: "monday"    },
    TUESDAY     : { id: 2, ja: "火", en: "tuesday"   },
    WEDNESDAY   : { id: 3, ja: "水", en: "wednesday" },
    THURSDAY    : { id: 4, ja: "木", en: "thursday"  },
    FRIDAY      : { id: 5, ja: "金", en: "friday"    },
    SATURDAY    : { id: 6, ja: "土", en: "saturday"  }
})

export default {
    data() {
        return {
            today,
            weekday,
            calendarYear : today.getFullYear(),
            calendarMonth: today.getMonth(),
            className: {
                isThisMonth(date /* :Date */, calendarDate /* :Date */)
                        /* :string */ {
                    return isSameMonth(date, calendarDate)
                            ? "this-month"
                            : "not-this-month"
                },
                weekday(date /* :Date */) {
                    return Object.getOwnPropertyNames(weekday)
                            .map(key => weekday[key])
                            .find(day => day.id === date.getDay())
                            .en
                }
            }
        }
    },
    computed: {
        calendarDate() {
            return new Date(this.calendarYear, this.calendarMonth, 1)
        },
        weekList() {
            return createWeekList(this.calendarDate)
        },
        calendarYearOptions() {
            return range(
                    this.calendarYear - 5,
                    this.calendarYear + 5)
        },
        calendarMonthOptions() {
            return range(0, 11)
        },
        prevMonth() {
            return subMonths(this.calendarDate, 1)
        },
        nextMonth() {
            return addMonths(this.calendarDate, 1)
        },
    },
    methods: {
        formatYearAndMonth(
                dateOrYear  /* :Date | number */,
                month       /* :undefined | number */) /* :string */ {
            const date = (dateOrYear instanceof Date)
                    ? dateOrYear
                    : new Date(dateOrYear, month, 1)
            return formatDate(date, "YYYY年M月")
        },
        isSameMonth,
        changePrevMonth() {
            this.calendarYear  = this.prevMonth.getFullYear()
            this.calendarMonth = this.prevMonth.getMonth()
        },
        changeNextMonth() {
            this.calendarYear  = this.nextMonth.getFullYear()
            this.calendarMonth = this.nextMonth.getMonth()
        },
    }
}


function createWeekList(
        dateOrYear  /* :Date | number */,
        month       /* :undefined | number */)
        /* :Array<Array<Date>> */ {

    const weekList = []

    const _startDayOfMonth = (dateOrYear instanceof Date)
            ? startOfMonth(dateOrYear)
            : new Date(dateOrYear, month, 1)
    const startDayOfStartWeekOfMonth = startOfWeek(_startDayOfMonth)

    const _lastDayOfMonth = lastDayOfMonth(_startDayOfMonth)
    const lastDayOfLastWeekOfMonth = lastDayOfWeek(_lastDayOfMonth)

    let dateOfWeekList = []
    for (let date = startDayOfStartWeekOfMonth;
            isBefore(date, addDays(lastDayOfLastWeekOfMonth, 1));
            date = addDays(date, 1)) {

        dateOfWeekList.push(date)
        if (isSameDay(date, lastDayOfWeek(date))) {
            weekList.push(dateOfWeekList)
            dateOfWeekList = []
        }

    }

    return weekList
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
