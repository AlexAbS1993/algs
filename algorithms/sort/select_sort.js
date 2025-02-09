/**
 * Сортировка выбором работает исключительно с числами больше 0
 */
class SelectSort{
    dictionary = {}
    max = -Infinity
    sort(arr){
        this.#validate(arr)
        this.defineMax(arr)
    }
    defineMax(arr){
        this.max = Math.max.apply(this, arr)
        return this.max
    }
    #validate(arr){
        const requiredType = 'number'
        if (!arr.every(n => typeof n === requiredType)){
            throw new Error('Все элементы массива должны быть числами')
        }
        if(!arr.every(n => n >= 0)){
            throw new Error('Все числа должны быть больше нуля')
        }
    }
}

module.exports = SelectSort