const Edge = require("../../algorithms/graph/Edge")
const Vercel = require("../../algorithms/graph/Vercel")

describe('Edge является ребром, соединяющим 2 точки', () => {
    const v1 = new Vercel('Moscow')
    const v2 = new Vercel('Krasnodar')
    let edge
    beforeEach(() => {
        edge = new Edge(v1, v2)
    })
    test('Конструктор Edge принимает в себя два объекта Vercel, которые должны быть соединены', () => {
        
        expect(typeof edge.getVercels()).toBe('object')
        expect(Array.isArray(edge.getVercels())).toBe(true)
    })
    test('Edge может быть тонко настроен. Получить настройки можно через метод. Имеются настройки по-умолчанию', () =>{
        const {weight, direction} = edge.getSettings()
        expect(weight).toBe(null)
        expect(direction).toBe('both')
    })
    test('Edge может определять настройки с помощью специальных методов', () => {
        edge.setWeight(1000)
        edge.setWeightMeasure('km')
        edge.setDirection('0to1')
        const {weight, direction, weight_measure} = edge.getSettings()
        expect(weight).toBe(1000)
        expect(direction).toBe('0to1')
        expect(weight_measure).toBe('km')
    })
})