<template lang="pug">
  div.component-root
    calendar(date="2018-02-01")
</template>

<script>
import Calendar from "@/components/Calendar"


export default {
    data() {
        return {
        }
    },
    components: {
        Calendar
    }
}
</script>

<style lang="stylus">
</style>
