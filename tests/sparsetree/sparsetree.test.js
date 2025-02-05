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
})