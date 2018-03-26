export const range = function(
        begin /* :number */,
        end /* :number */,
        interval /* :number */) /* :Array<number> */ {
    const _interval = interval || 1

    const arr = []
    for (let i = begin; i <= end; i += _interval) {
        arr.push(i)
    }
    return arr
}


export default {
    range
}
