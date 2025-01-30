const SparseTable = require("../../algorithms/sparsetable/sparse")

describe('SparseTable – структура данных для работы с неизменяемыми массивами и поиска минимальных элементов (на самом деле элементов по любому условию) в диапазоне', () => {
    let mockArray =  [12, 45, 67, 23, 89, 5, 34, 76, 8, 99, 54, 21, 3, 66, 78, 43, 10, 11, 87, 30, 15]
    let sparse
    beforeEach(() => {
        sparse = new SparseTable(mockArray)
    })
    test('Переданный в sparseTable массив неизменяем', () => {
        'use strict'
        try{
            sparse.getArr()[10] = 0
        }
        catch(e){
            expect(e).toBeDefined()
        }
    })
    test('При создании класса создаётся разметка', () => {
        let parsed = sparse.getParsed()
        expect(parsed['1']).toBeDefined()
        expect(parsed['2']).toBeDefined()
        expect(parsed['2']['0:1']).toBe(12)
        expect(parsed['4']['3:6']).toBe(5)
    })
    test("При запросе минимального значения в диапазоне возвращается верное значение", () => {
        let min1 = sparse.getMin('0:4')
        let min2 = sparse.getMin('10:12')
        let min3  =sparse.getMin('4:14')
        expect(min1).toBe(12)
        expect(min2).toBe(3)
        expect(min3).toBe(3)
    })
})