<template lang="pug">
  div.calendar-header

    div.prev-month
      button.sub-month-button(
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
      button.add-month-button(
        @click="addMonth"
        :title="formatYearAndMonth(nextMonth)") ＞
    
</template>

<script>
import { mapGetters, mapActions } from "vuex"
import formatDate from "date-fns/format"
import { range }  from "@/utils/MyArrayUtility"


export default {
    data() {
        return {}
    },
    computed: Object.assign(
        {
            calendarYearOptions() {
                const year = this.calendarYear
                return range(year - 5, year + 5)
            },
            calendarMonthOptions() {
                return range(0, 11)
            }
        },
        mapGetters([
            "calendarYear",
            "calendarMonth",
            "prevMonth",
            "nextMonth"
        ])
    ),
    methods: Object.assign(
        {
            formatYearAndMonth(
                    dateOrYear  /* :Date      | number */,
                    month       /* :undefined | number */) /* :string */ {
                const date = (dateOrYear instanceof Date)
                        ? dateOrYear
                        : new Date(dateOrYear, month, 1)
                return formatDate(date, "YYYY年M月")
            },
            changeYear(event) {
                this.$store.dispatch("changeYear", event.target.value)
            },
            changeMonth(event) {
                this.$store.dispatch("changeMonth", event.target.value)
            }
        },
        mapActions([
            "subMonth",
            "addMonth"
        ])
    )
};
</script>

<style lang="stylus" scoped>
  .prev-month, .next-month
    width: 25%

  .sub-month-button,
  .add-month-button
    width: 3em
    margin: auto

  .calendar-year-and-month
    width: 50%

    &>span
      margin: auto

</style>
