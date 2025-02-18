const TurtleV1 = require("../../algorithms/dp/Turtle/_turtle")
const MapForTurtle = require("../../algorithms/dp/Turtle/map")

describe('Задачка с черепашкой находит количество возможных путей и самый оптимиальный путь', () => {
    let mini_map = MapForTurtle.createRandomMap(3, 3)
    let middle_map =  MapForTurtle.createRandomMap(6, 6)
    let large_map = MapForTurtle.createRandomMap(10, 10)
    test('Задача может выдавать верное количество путей для любого поля', () => {
        let turtle = new TurtleV1(mini_map)
        let turtle_max = new TurtleV1(large_map)
        let turtle_middle = new TurtleV1(middle_map)
        turtle.calculateCountOfWaysFromStartToFinal()
        turtle_max.calculateCountOfWaysFromStartToFinal()
        turtle_middle.calculateCountOfWaysFromStartToFinal()
        expect(turtle.getResult(turtle.operations.count_ways)).toEqual({count:6})
        expect(turtle_max.getResult(turtle.operations.count_ways)).toEqual({count:48620})
        expect(turtle_middle.getResult(turtle.operations.count_ways)).toEqual({count:252})
    })
   
})