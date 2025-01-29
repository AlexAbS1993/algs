class SparseTable {
    #arr
    #parsedMinData = {}
    constructor(arr){
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