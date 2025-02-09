/**
 * Сортировка выбором работает исключительно с числами больше 0
 */
class SelectSort{
    dictionary = {}
    max = -Infinity
    sort(arr){
        this.#validate(arr)
        this.defineMax(arr)
        this.buildDictionary(arr)
        let result = []
        for (let i = 0; i <= this.max; i++){
            if(this.dictionary[i]){
                for (let j = 0; j < this.dictionary[i]; j++){
                    result.push(i)
                }
            }
        }
        this.#setDefault()
        return result
    }
    defineMax(arr){
        this.max = Math.max.apply(this, arr)
        return this.max
    }
    buildDictionary(arr){
        arr.forEach(num => {
            if(!this.dictionary[num]){
                this.dictionary[num] = 1
            }
            else {
                this.dictionary[num] += 1
            }
        })
        return this.dictionary
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
    #setDefault(){
        this.dictionary = {}
        this.max = -Infinity
    }
}

module.exports = SelectSort