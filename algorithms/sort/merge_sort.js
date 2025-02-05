class MergeSort{
    sort(arr){

    }
    merge(a1, a2){
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
}

module.exports = MergeSort