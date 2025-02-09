class SelectSort{
    dictionary = {}
    max = -Infinity
    sort(arr){
        this.defineMax(arr)
    }
    defineMax(arr){
        this.max = Math.max.apply(this, arr)
        return this
    }
}

module.exports = SelectSort