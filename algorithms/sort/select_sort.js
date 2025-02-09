/**
 * Сортировка выбором работает исключительно с числами больше 0
 */
class SelectSort{
    dictionary = {}
    max = -Infinity
    sort(arr){
        this.defineMax(arr)
    }
    defineMax(arr){
        this.max = Math.max.apply(this, arr)
        return this.max
    }
}

module.exports = SelectSort