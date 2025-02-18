const MapForTurtle = require("../../algorithms/dp/Turtle/map")

describe('Карта создаётся для тестирования алгоритма. Внутрь карты можно было бы включать особые объекты, \n' + 
    'но в этом случае это будут обычные js-объекты с какими-то данными (value)', () => {
        let map = new MapForTurtle(3, 3)
        beforeEach(() => {
            map = new MapForTurtle(3, 3)
        })
        test('map имеет структуру, которую можно узнать из метода getInfo', () => {
            const mapInformation = map.getInfo()
            expect(mapInformation.rows).toBe(3)
            expect(mapInformation.collumns).toBe(3)
            expect(mapInformation.grid).toBe('3x3')
        })
        test('map может предоставлять данные об элементе по методу point', () => {
            expect(map.point(1, 1)).toEqual({value: null})
        })
    }
)