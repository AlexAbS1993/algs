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
    describe('Набор случайных тестов для проверки работоспособности SparseTable', () => {
        const mockMatrixOfMassives = [
            [12, 45, 67, 23, 89, 5, 34, 76, 8, 99, 54],
            [21, 3, 66, 78, 43, 10, 11, 87, 30, 15, 19, 90],
            [2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24],
            [34, 76, 1, 1, 44, 66, 77, 88, 99, 100],
            [90, 21, 34, 56, 78, 90, 12, 4, 11, 18, 25],
            [11, 23, 35, 47, 59, 61, 73, 85, 97, 99, 100],
            [15, 25, 35, 45, 55, 65],
            [1, 3, 5, 7, 9, 11, 13, 15, 17, 19, 21, 23],
            [100, 90, 80, 30, 20, 10, 15, 18],
            [17]
        ];
        test('Расчёты проводятся верно', () => {
            for (let i = 0; i < mockMatrixOfMassives.length; i++){
                let sparse = new SparseTable(mockMatrixOfMassives[i])
                let d1 = '1:8'
                let d2 = '4:6'
                let d3 = '5:10'
                let min1FromJS = Math.min(...mockMatrixOfMassives[i].slice(mockMatrixOfMassives[i].length <= 1 ? 0 : 1,mockMatrixOfMassives[i].length < 9 ? mockMatrixOfMassives[i].length : 9))
                let min2FromJS = Math.min(...mockMatrixOfMassives[i].slice(mockMatrixOfMassives[i].length <= 4 ? 0 : 4,mockMatrixOfMassives[i].length < 7 ? mockMatrixOfMassives[i].length : 7))
                let min3FromJS = Math.min(...mockMatrixOfMassives[i].slice(mockMatrixOfMassives[i].length <= 5 ? 0 : 5,mockMatrixOfMassives[i].length < 11 ? mockMatrixOfMassives[i].length : 11))
                let min1 = sparse.getMin(d1)
                let min2 = sparse.getMin(d2)
                let min3 = sparse.getMin(d3)
                expect(min1).toBe(min1FromJS)
                expect(min2).toBe(min2FromJS)
                expect(min3).toBe(min3FromJS)
            }
        })  
    })
    test('При передачи в SparseTable пустого массива выбрасывается ошибка', () => {
        try{
            let sparse = new SparseTable([])
        }
        catch(e){
            expect(e).toBeDefined()
        }
    })
})