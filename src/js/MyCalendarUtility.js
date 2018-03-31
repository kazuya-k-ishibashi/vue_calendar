import startOfMonth    from "date-fns/start_of_month"
import startOfWeek     from "date-fns/start_of_week"
import lastDayOfMonth  from "date-fns/last_day_of_month"
import lastDayOfWeek   from "date-fns/last_day_of_week"
import addDays         from "date-fns/add_days"
import isSameDay       from "date-fns/is_same_day"
import isBefore        from "date-fns/is_before"


export const Weekday = Object.freeze({
    SUNDAY      : { id: 0, ja: "日", en: "sunday"    },
    MONDAY      : { id: 1, ja: "月", en: "monday"    },
    TUESDAY     : { id: 2, ja: "火", en: "tuesday"   },
    WEDNESDAY   : { id: 3, ja: "水", en: "wednesday" },
    THURSDAY    : { id: 4, ja: "木", en: "thursday"  },
    FRIDAY      : { id: 5, ja: "金", en: "friday"    },
    SATURDAY    : { id: 6, ja: "土", en: "saturday"  }
})

export const createWeekListOfMonth = function(
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

export default {
    Weekday,
    createWeekListOfMonth
}
