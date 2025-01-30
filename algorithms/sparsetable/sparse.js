class SparseTable {
    #arr
    #parsedMinData = {}
    constructor(arr){
        if (arr.length === 0){
            throw new Error('Необходим массив с данными')
        }
        this.#arr = arr
        Object.freeze(this.#arr)
        this.#prepare()
    }

    getArr(){
        return this.#arr
    }
    getParsed(){
        return this.#parsedMinData
    }
    /**
     * 
     * @param {string} range ренж индексов, в которых мы ищем минимальное значение. Указывается от n:(до)m
     */
    getMin(range){
        let [from, to] = this.#parseRange(range)
        if (Number(from) > this.#arr.length - 1){
            from = '0'
        }
        if (to >= this.#arr.length){
                to = String(this.#arr.length - 1)
        }
        let length = (to - from) + 1
        let keys = Object.keys(this.#parsedMinData)
        if (keys.includes(String(length))){
            if (length === 1){
                return this.#parsedMinData[length][`${from}`]
            }
            return this.#parsedMinData[length][`${from}:${to}`]
        }
        else {
            let requeredRange
            for (let i = 0, j = 1; i < keys.length; i++,j++ ){
                if (length > keys[i] && length < keys[j]){
                    requeredRange = keys[i]
                }
            }
            let firstRange = this.#parsedMinData[requeredRange][`${from}:${Number(from) + Number(requeredRange)-1}`]
            let secondRange = this.#parsedMinData[requeredRange][`${to - requeredRange + 1}:${to}`]
            return firstRange < secondRange ? firstRange : secondRange
        }
    }
    #parseRange(str){
        return str.split(':')
    }
    #prepare(){
        let arrLength = this.#arr.length
        let indexesCount = Math.ceil(Math.log2(arrLength))
        for (let i = 0, j = 1; i <= indexesCount; i++){
            if (!this.#parsedMinData[j]){
                this.#parsedMinData[j] = {}
            }
            this.#setLevel(j)
            if (j >= 2){
                j *= 2
            }
            if (j === 1){
                j = 2
            }
        }
    }
    #setLevel(rangeStep){
        if(rangeStep === 1){
            for(let i = 0; i < this.#arr.length; i++){
                this.#parsedMinData[rangeStep][i] = this.#arr[i]
            }
        }
        else {
            for (let i = 0, j = rangeStep - 1; i < this.#arr.length; i++, j++){
                if (j >= this.#arr.length){
                    return
                }
                let min1
                let min2
                if (rangeStep === 2){
                    min1 = this.#parsedMinData[rangeStep/2][`${i}`]
                    min2 = this.#parsedMinData[rangeStep/2][`${j}`]
                }
                else {
                    min1 = this.#parsedMinData[rangeStep/2][`${i}:${Math.floor((j+i)/2)}`]
                    min2 = this.#parsedMinData[rangeStep/2][`${Math.floor((j+i)/2)+1}:${j}`]
                }
                this.#parsedMinData[rangeStep][`${i}:${j}`] = min1 > min2 ? min2 : min1            
            }
        }
    }
}

module.exports = SparseTable