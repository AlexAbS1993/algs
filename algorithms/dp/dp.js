class DP_Element {
    from
    sum
    value
    index
    constructor(value, index){
        this.value = value
        this.index = index
    }
    setSum(prev_sum){
        this.sum = this.value + prev_sum
        return this
    }
    setFrom(from){
        this.from = from
        return this
    }
}

module.exports = DP_Element