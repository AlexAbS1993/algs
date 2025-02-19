class TurtleV1 {
    operations = {
        count_ways: 'count_ways',
        valueable_way: 'valueable_way'
    }
    #map
    #dp_count_ways = []
    #dp_valuable_way = []
    #count_ways_result
    #valueable_way_result
    constructor(map){
        this.#map = map
    }
    // getCountOfWaysFromTo(from = [1, 1], to = [this.map.getMap().length, this.map.getMap()[0].length]){

    // }
    calculateCountOfWaysFromStartToFinal(){
        // Инициализируется dp
        this.#initialize_dp_count_ways()
        // Создаем базовый случай первой row и первого column
        this.#base_for_count()
        // Далее идем по rows и просматриваем каждый вариант с collumns по количеству возможных вариантов прохода
        this.#enumeration_for_count()
        // Возвращением значение из последней ячейки dp
        this.#create_count_way_result()
    }
    #initialize_dp_count_ways(){
        const {rows, collumns} = this.#map.getInfo()
        for (let i = 0; i < rows; i++){
            if(!this.#dp_count_ways[i]){
                this.#dp_count_ways[i] = []
            }
            for (let j = 0; j < collumns; j++){
                this.#dp_count_ways[i].push({count: 0})
            }
        }
    }
    #base_for_count(){
        const {rows, collumns} = this.#map.getInfo()
        this.#dp_count_ways[0][0].count = 0
        for (let i = 1; i < collumns; i++){
            this.#dp_count_ways[0][i].count = 1
        }
        for (let i = 1; i < rows; i++){
            this.#dp_count_ways[i][0].count = 1
        }
    }
    #enumeration_for_count(){
        const {rows, collumns} = this.#map.getInfo()
        for(let i = 1; i < rows; i++){
            for (let j = 1; j < collumns; j++){
                this.#dp_count_ways[i][j].count = this.#dp_count_ways[i-1][j].count + this.#dp_count_ways[i][j-1].count
            }
        }
    }
    #create_count_way_result(){
        const {rows, collumns} = this.#map.getInfo()
        this.#count_ways_result = {
            count:  this.#dp_count_ways[rows - 1][collumns - 1].count
        }
    }
    calculateTheMostValuableWay(){
        // инициализировать dp
        this.#initialize_dp_most_valuable()
        // создать базовый случай
        this.#base_for_valueable()
        // пройти пересчётом
        this.#enumeration_for_valueable()
        // создать отчёт
        this.#create_valueable_result()
    }
    #initialize_dp_most_valuable(){
        const {rows, collumns} = this.#map.getInfo()
        for (let i = 0; i < rows; i++){
            if(!this.#dp_valuable_way[i]){
                this.#dp_valuable_way[i] = []
            }
            for (let j = 0; j < collumns; j++){
                this.#dp_valuable_way[i].push({currentValue: this.#map.point(i+1, j+1).value, from: null, sum: null, index: {i, j}} )
            }
        }
    }
    #base_for_valueable(){
        const {rows, collumns} = this.#map.getInfo()
        this.#dp_valuable_way[0][0].sum = this.#dp_valuable_way[0][0].currentValue
        for (let i = 1; i < collumns; i++){
            this.#dp_valuable_way[0][i].from = this.#dp_valuable_way[0][i-1]
            this.#dp_valuable_way[0][i].sum = this.#dp_valuable_way[0][i-1].sum + this.#dp_valuable_way[0][i].currentValue
        }
        for (let i = 1; i < rows; i++){
            this.#dp_valuable_way[i][0].from = this.#dp_valuable_way[i-1][0]
            this.#dp_valuable_way[i][0].sum = this.#dp_valuable_way[i-1][0].sum + this.#dp_valuable_way[i][0].currentValue
        }
    }
    #enumeration_for_valueable(){
        const {rows, collumns} = this.#map.getInfo()
        for(let i = 1; i < rows; i++){
            for (let j = 1; j < collumns; j++){
                let max = this.#dp_valuable_way[i-1][j].sum > this.#dp_valuable_way[i][j-1].sum ?  this.#dp_valuable_way[i-1][j] :  this.#dp_valuable_way[i][j-1] 
                this.#dp_valuable_way[i][j].sum =  this.#dp_valuable_way[i][j].currentValue + max.sum
                this.#dp_valuable_way[i][j].from = max
            }
        }
    }
    #create_valueable_result(){
        const {rows, collumns} = this.#map.getInfo()
        let from = this.#dp_valuable_way[rows - 1][collumns - 1]
        const result = {path: [], sum: this.#dp_valuable_way[rows - 1][collumns - 1].sum}
        while (from){
            result.path.push(from)
            from = from.from
        }
        result.path = result.path.reverse()
        this.#valueable_way_result = result
    }
    getResult(task, print){
        switch(task){
            case this.operations.count_ways: {      
                return print ? print.execute(this.#count_ways_result) : this.#count_ways_result
            }
            case this.operations.valueable_way: {
                return print ?  print.execute(this.#valueable_way_result) : this.#valueable_way_result
            }
            default: {
                throw new Error('Нет такой операции')
            }
        }
    }
}

module.exports = TurtleV1