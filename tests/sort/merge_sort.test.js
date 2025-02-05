const MergeSort = require("../../algorithms/sort/merge_sort")

describe('Merge_sort разбивает массив на маленькие кусочки и потом соединяет их', () => {
    test('Алгоритм сортирует цифры правильно', () => {
        let mergeSort = new MergeSort()
        const randomArrays = [
            [23, -45, 67, 89, -12, 34, 56, -78, 90, -100],
            [-34, 76, -23, 89, 45, -67, 12, -9, 100, -56, 38],
            [5, -8, 19, 27, -43, 88, -90, 67, -34, 21],
            [-99, 45, -22, 78, -66, 32, 100, -5, 87, -40, 55, -74],
            [12, -33, 47, -59, 80, 92, -10, 5, -6, 38],
            [-27, 54, -89, 23, 11, -78, 64, -9, 87, -100, 42, 31],
            [99, -76, 12, -34, 56, -78, 91, -3, 47, -19],
            [-45, 68, 90, -32, 55, -81, 23, -100, 78, 4, 31, -67, 92],
            [17, -39, 83, -92, 46, -11, 29, 56, -70, 64],
            [-88, 12, -56, 99, -34, 78, -5, 45, -67, 23, 31]
        ];
    for (let arr of randomArrays){
        let sortedByJSNative = arr.sort((a, b) => a-b)
        let sortedByMergeSort = mergeSort.sort(arr)
        expect(sortedByMergeSort).toEqual(sortedByJSNative)
    }
    })
})