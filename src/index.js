import Vue      from "vue"
import Calendar from "@/components/Calendar"
import store    from "@/store"


new Vue({
    el: "calendar",
    store,
    template: "<calendar />",
    components: {
        Calendar
    }
})
