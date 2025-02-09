const SelectSort = require("../../algorithms/sort/select_sort")

describe('Сортировка выбором высчитывает максимальное число и составляет коллекцию имеющихся чисел и их частоты встреч.\n' +
     'Один из немногих алгоритмов, не основанных на сравнении', () => {
    let selectsort = new SelectSort()
    let mockArray = [99, 45, 22, 78, -66, 32, 100, 5, 87, 40, 55, 74]
    test('Метод defineMax определяет максимальное значение в массиве', () => {
        expect(selectsort.defineMax(mockArray)).toBe(100)
    })
})