const QuickSort = require("../../algorithms/sort/quick_sort")

describe('QuickSort - метод сортировки, который базируется на разбиении массивов и соединение отсортированных массивов', () => {
    test('QuickSort правильно умеет соединять массивы', () => {
        let a1 = [1, 5, 6, 10]
        let a2 = [2, 2, 4, 11]
        let qs = new QuickSort()
        expect(qs.merge(a1, a2)).toEqual([1, 2, 2, 4, 5, 6, 10, 11])
    })
    test('QuickSort работает правильно', () => {
        let arr = [2, 0, 10, -22, 11, 5]
        let qs = new QuickSort()
        expect(qs.sort(arr)).toEqual([-22, 0, 2, 5, 10, 11])
    })
    test('В сорт необходимо передавать объекты одного типа', () => {
        let qs = new QuickSort()
        try{
            qs.sort([1, 'hello', true, [false, false, '1']])
        }
        catch(e){   
            expect(e.message).toMatch('должны быть одного типа')
        }
    })
})