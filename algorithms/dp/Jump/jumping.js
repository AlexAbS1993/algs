const DP_Element = require("../dp")

class JumpingV1{
    #min_step = 1
    #max_step = 2
    #ladder
    #dp
    #result = {
        max_sum: 0,
        path: ''
    }
    constructor(ladder){
        this.#ladder = ladder 
        this.#dp = this.#dp_create(ladder)
    }
    calculate(){
        this.calculate_base()
        this.cicle_calculate()
        return this.get_result()
    }
    calculate_base(){
        let element = new DP_Element(0, 0)
        element.setSum(0)
        this.#dp[0].push(element)
    }
    cicle_calculate(){
        for (let i = 0; i < this.#ladder.length; i++){
            if(i + this.#min_step < this.#ladder.length){
                this.add_data_to_dp(i, this.#min_step)
            }
            if( i + this.#max_step < this.#ladder.length){
                this.add_data_to_dp(i, this.#max_step)
            }    
        }
    }
    add_data_to_dp(i, step){
        let element = new DP_Element(this.#ladder[i+step], i+step).setFrom(i)
        let sum = this.#defineMaxSum(this.#dp[i])
        element.setSum(sum)
        this.#dp[i+step]
        .push(element)
    }
    #defineMaxSum(dpCell){
        let maxSumElement = {sum: - Infinity}
        dpCell.forEach((el) => {
            maxSumElement = el.sum > maxSumElement.sum ? el : maxSumElement
        })
        return maxSumElement.sum
    }
    get_result(){
        let max_result_path = []
        for (let i = 0; i < this.#dp.length; i++){
            let max = {sum: -Infinity}
            this.#dp[i].forEach((el) => {
                if (el.sum > max.sum){
                    max = el
                }
            })
            max_result_path.push(max)
        }
        this.#result.max_sum = max_result_path[max_result_path.length - 1].sum
        let index = max_result_path.length - 2
        this.#result.path = []
        while(index > 0){
            this.#result.path.push(max_result_path[index])
            index = max_result_path[index].from
        }
        return this.#result
    }
    #dp_create(ladder){
        return ladder.map((_) => {
            return []
        })
    }
    get_dp(){
        return this.#dp
    }
    // print_result(command){
    //     return command.print(this.#result)
    // }
}

module.exports = JumpingV1