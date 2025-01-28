class Heap {
    #arr = []
    #defineFn = (data) => data
    heapify(data){
        this.#arr = [...data]
        for (let i = data.length -1; i >= 0; i--){
            // Корретный I определяется с целью вычисления родителей и соседей, 
            // так как в heap нумерация индексов начинается с 1 и следует по формуле parent=v left=2v right=2v+1
            let correctI = i+1
            this.#siftDown(correctI)
        }
    }
    /**
     * Метод #siftUp позволяет поднять элемент в heap. Если элемент является самым меньшим в паре, то он проталкивается вверх.
     * После элемент, с которым он поменялся местами, проталкивается ниже
     * @param {number} i индекс элемента в списке heap. Для index в array i - 1 
     * @returns 
     */
    #siftUp(i){
        if (i === 1){
            return
        }       
        let parent = Math.floor(i/2)
        if(this.#arr[i-1] < this.#arr[parent - 1]){
            let temp = this.#arr[parent-1]
            this.#arr[parent-1] = this.#arr[i-1]
            this.#arr[i-1] = temp
            return this.#siftUp(parent)
        }
        else{
            return
        }    
        }
    #siftDown(i){
        let length = this.#arr.length
        if (i*2 > length){
            return
        }
        let leftChildren = i*2
        let rightChildren = i*2+1
        let min = this.#arr[leftChildren - 1] < (this.#arr[rightChildren-1] !== undefined ? this.#arr[rightChildren-1] : Infinity) ? leftChildren : rightChildren
        if(this.#arr[i - 1] < this.#arr[min - 1]){
            return
        }
        let temp = this.#arr[min - 1]
        this.#arr[min - 1] = this.#arr[i - 1]
        this.#arr[i - 1] = temp 
        return this.#siftDown(min)
    }
    getMin(){
        return this.#arr[0]
    }
    extractMin(){
        let min = this.getMin()
        this.#arr[0] = this.#arr[this.#arr.length - 1]
        this.#arr.pop()
        this.#siftDown(1)
        return min
    }
    defineCompareMeasure(fn){

    }
    toArray(){
        return this.#arr
    }
    heapSort(){
        let result = []
        while(this.#arr.length > 0){
            result.push(this.extractMin())
        }
        return result
    }
}

module.exports = Heap