class QuickSort{
    sort(arr){
        this.#validate(arr)
        if (arr.length <= 1){
            return arr
        }
        else {
            let {left, rigth, center } = this.#pivotSplit(arr)
            return this.merge(this.sort(left), center, this.sort(rigth))
        }
    }
    #pivotSplit(arr){
        let pivot = arr[Math.ceil(arr.length/2) - 1]
        let left = []
        let rigth = []
        let center = []
        for(let i = 0; i < arr.length; i++){
            if (arr[i] === pivot){
                center.push(arr[i])
                continue
            }
            if (arr[i] < pivot){
                left.push(arr[i])
                continue
            }
            else {
                rigth.push(arr[i])
                continue
            }
        }
        return {
            left, rigth, center
        }
    }
    merge(...args){
        let result = this.#merge(args[0], args[1])
        let next_fn_point = 2
        while(next_fn_point < args.length){
            result = this.#merge(result, args[next_fn_point])
            next_fn_point++
        }
        return result
    }
    #merge(a1, a2){
        let mergedArray = []
        let i = 0, j =0
        while(i < a1.length || j < a2.length){
            if (i >= a1.length){
                mergedArray.push(a2[j])
                j++
                continue
            }
            if (j >= a2.length){
                mergedArray.push(a1[i])
                i++
                continue
            }
            if(a2[j] <= a1[i]){
                mergedArray.push(a2[j])
                j++
                continue
            }
            else {
                mergedArray.push(a1[i])
                i++
                continue
            }
        }
        return mergedArray
    }
    #validate(arr){
        let firstItemTypeFromArr = typeof arr[0]
        if (!arr.every(item => typeof item === firstItemTypeFromArr)){
            throw new Error('Данные в массиве должны быть одного типа')
        }
    }
}

module.exports = QuickSort