const MergeSort = require("../../algorithms/sort/merge_sort")

describe('MergeSort - метод сортировки, который базируется на разбиении массивов и соединение отсортированных массивов', () => {
    test('MergeSort правильно умеет соединять массивы', () => {
        let a1 = [1, 5, 6, 10]
        let a2 = [2, 2, 4, 11]
        let mergeSort = new MergeSort()
        expect(mergeSort.merge(a1, a2)).toEqual([1, 2, 2, 4, 5, 6, 10, 11])
    })
    test('MergeSort работает правильно', () => {
        let arr = [2, 0, 10, -22, 11, 5]
        let mergeSort = new MergeSort()
        expect(mergeSort.sort(arr)).toEqual([-22, 0, 2, 5, 10, 11])
    })
})