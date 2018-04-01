import subMonths from "date-fns/sub_months"
import addMonths from "date-fns/add_months"
import { Weekday, createWeekListOfMonth } from "@/util/MyCalendarUtility"


const today = new Date()

const state = {
    today,
    calendarDate: today
}

const getters = {
    calendarDate : state => state.calendarDate,
    calendarYear : state => state.calendarDate.getFullYear(),
    calendarMonth: state => state.calendarDate.getMonth(),
    prevMonth    : state => subMonths(state.calendarDate, 1),
    nextMonth    : state => addMonths(state.calendarDate, 1),
    weekList     : state => createWeekListOfMonth(state.calendarDate)
}

const mutations = {
    updateCalendarDate(state, payload /* Object */) {
        const { year, month, calendarDate } = payload

        state.calendarDate = (calendarDate instanceof Date)
                ? calendarDate
                : new Date(
                        year  || state.calendarDate.getFullYear(),
                        month || state.calendarDate.getMonth()   , 1)
    }
}

const actions = {
    subMonth({ commit }) {
        commit("updateCalendarDate", {
            calendarDate: getters.prevMonth(state)
        })
    },
    addMonth({ commit }) {
        commit("updateCalendarDate", {
            calendarDate: getters.nextMonth(state)
        })
    },
    changeYear({ commit }, year) {
        commit("updateCalendarDate", { year })
    },
    changeMonth({ commit }, month) {
        commit("updateCalendarDate", { month })
    }
}

export default {
    state,
    getters,
    mutations,
    actions
}
