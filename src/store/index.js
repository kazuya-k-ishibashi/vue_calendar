import Vue      from "vue"
import Vuex     from "vuex"
import calendar from "@/store/calendar"


const isDebugging = process.env.NODE_ENV !== 'production'

Vue.use(Vuex)

export default new Vuex.Store(Object.assign({
    strict: isDebugging
}, calendar))
