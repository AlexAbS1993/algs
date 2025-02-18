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
        let {rows, collumns} = this.#map.getInfo()
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
        let {rows, collumns} = this.#map.getInfo()
        this.#dp_count_ways[0][0].count = 0
        for (let i = 1; i < collumns; i++){
            this.#dp_count_ways[0][i].count = 1
        }
        for (let i = 1; i < rows; i++){
            this.#dp_count_ways[i][0].count = 1
        }
    }
    #enumeration_for_count(){
        let {rows, collumns} = this.#map.getInfo()
        for(let i = 1; i < rows; i++){
            for (let j = 1; j < collumns; j++){
                this.#dp_count_ways[i][j].count = this.#dp_count_ways[i-1][j].count + this.#dp_count_ways[i][j-1].count
            }
        }
    }
    #create_count_way_result(){
        let {rows, collumns} = this.#map.getInfo()
        this.#count_ways_result = {
            count:  this.#dp_count_ways[rows - 1][collumns - 1].count
        }
    }
    calculateTheMostValuableWay(){

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