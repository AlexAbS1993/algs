class DP_Element {
    from
    sum
    value
    constructor(value){
        this.value = value
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