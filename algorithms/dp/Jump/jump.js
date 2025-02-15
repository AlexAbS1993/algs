const JumpingV1 = require("./jumping")

// Фасад для класса Jump. Оригинальная версия используется для тестирования, и в ней все методы публичные. Здесь же только один публичный метод
class Jump {
    #jumping
    constructor(ladder){
        this.#jumping = new JumpingV1(ladder)
    }
    calculate(){
        this.#jumping.calculate()
    }
    getResult(command){
        return command.print(this.#jumping.getResult())
    }
}

module.exports = Jump