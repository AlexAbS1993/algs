const MapForTurtle = require("../../algorithms/dp/Turtle/map")
const fs = require('fs')
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
        test('Сущность может использовать статические методы для создания карты по уже подготовленному массиву', () => {
            let map = MapForTurtle.createMapFromArray([[1, 5], [2, 5], [-10, 0]])
            expect(map.point(1, 2).value).toBe(5)
        })
        test('Сущность использует статический метод для создания карты с рандомными данными', () => {
            let map = MapForTurtle.createRandomMap(3, 3)
            let writeStream = fs.createWriteStream(__dirname + '/snapshots' + '/map.json')
            writeStream.write(JSON.stringify(map.getMap()))
            expect(typeof map.point(1, 1).value).toBe('number')
        })
        describe('Отказоустойчивость при неправильных аргументах работает выбрасыванием исключения', () => {
            describe('Система выдаёт ошибку, если переданы неверные параметры в конструктор', () => {
                test('Ошибка при передаче отрицательного значения', () => {
                    try{
                        new MapForTurtle(-1, 1)
                    }
                    catch(e){
                        expect(e.message).toMatch('положительным')
                    }
                })
                test('Ошибка при отсутствии передаваемого значения', () => {
                    try{
                       new MapForTurtle(4)
                    }
                    catch(e){
                        expect(e.message).toMatch('аргументов')
                    }
                })
                test('Ошибка при неправильном типе передаваемых данных', () => {
                    try{
                        new MapForTurtle(4, true)
                    }
                    catch(e){
                        expect(e.message).toMatch('числом')
                    }
                })
            })
            describe('Выдаются ошибки при передаче неверных данных в методы работы с map', () => {
                test('Выдается ошибка, если пользователь пытается получить данные, которых не существует', () => {
                    try{
                        map.point(10, 10)
                    }
                    catch(e){
                        expect(e.message).toMatch('не существует')
                    }
                })
            })
        })
    }
)