const SparseTable = require("../../algorithms/sparsetable/sparse")

describe('SparseTable – структура данных для работы с неизменяемыми массивами и поиска минимальных элементов (на самом деле элементов по любому условию) в диапазоне', () => {
    let mockArray =  [12, 45, 67, 23, 89, 5, 34, 76, 8, 99, 54, 21, 3, 66, 78, 43, 10, 11, 87, 30]
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
        console.log()
    })
})