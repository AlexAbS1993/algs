const SparseTree = require("../../algorithms/sparsetree/sparse_tree")

describe('SparseTree предлагает использовать набор данных из массива и хранить их в бинарном дереве', () => {
    const mockArray = [4, 2, 10, 11, 1, 4, 4, 0, 9, 7, 8]
    let sp = new SparseTree(mockArray)
    test('Загрушка', () => {
        expect(1).toBe(1)
    })
})