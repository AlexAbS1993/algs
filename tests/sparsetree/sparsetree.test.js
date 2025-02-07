const SparseTree = require("../../algorithms/sparsetree/sparse_tree")

describe('SparseTree предлагает использовать набор данных из массива и хранить их в бинарном дереве', () => {
    const mockArray = [4, 2, 10, 11, 1, 4, 4, 0, 9, 7, 8]
    let sp = new SparseTree(mockArray)
    describe('Проверка алгоритма при разных входных данных', () => {
        test('2:4', () => {
            expect(sp.getSumByRange('2:4')).toBe(22)
        })
        test('10:10', () => {
            expect(sp.getSumByRange('10:10')).toBe(8)
        })
        test('1:2', () => {
            expect(sp.getSumByRange('1:2')).toBe(12)
        })
        test('0:1', () => {
            expect(sp.getSumByRange('0:1')).toBe(6)
        })
        test('0:0', () => {
            expect(sp.getSumByRange('0:0')).toBe(4)
        })
        test('6:9', () => {
            expect(sp.getSumByRange('6:9')).toBe(20)
        })
        test('2:4', () => {
            expect(sp.getSumByRange('2:4')).toBe(22)
        })  
    })

    describe('Отказоустойчивые тесты необходимы для выявления работы системы при ошибочных входных данных', () => {
        let mockEmptyArray = []
        let mockMultiTypesArray = [10, 'hello', {field: true}, Symbol(1)]
        let mockArray = [1, 4, 2, 5, 1]
        test('Система выдаёт ошибку на передачу пустого массива', () => {
            try{
                let st = new SparseTree(mockEmptyArray)
            }
            catch(e){
                expect(e.message).toMatch('пустой')
            }
        })
        test('При передаче массива с разными типами данных выбрасывается ошибка', () => {
            try {
                let st = new SparseTree(mockMultiTypesArray)
            }
            catch(e){
                expect(e.message).toMatch('number')
            }
        })
        test('При вызове метода getRange в качестве аргумента передаётся строка, иначе - ошибка', () => {
            let st = new SparseTree(mockArray)
            try{
                st.getSumByRange(12)
            }
            catch(e){
                expect(e.message).toMatch('должна быть строка')
            }
        })
        test('Если передан неправильный формат ренжи, то выдаётся ошибка', () => {
            let st = new SparseTree(mockArray)
            try{
                st.getSumByRange('1-5')
            }
            catch(e){
                expect(e.message).toMatch('Неверный формат ренжи')
            }
        })
        test('При передаче логически неверной ренжи выдается ошибка', () => {
            let st = new SparseTree(mockArray)
            try{
                st.getSumByRange('5:2')
            }
            catch(e){
                expect(e.message).toMatch('не может быть больше')
            }
        })
    })
})