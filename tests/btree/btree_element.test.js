const Element = require("../../algorithms/btree/element")

describe('Element для Btree содержит в себе значение и количество элементов внутри одной ячейки (если их нужно несколько)', () => {
    let btree_element = new Element(10)
    test('Element возвращает значение', () => {
        expect(btree_element.getValue()).toBe(10)
    })
    test('Element может возвращать количество значений внутри себя', () => {
        expect(btree_element.getCount()).toBe(1)
    })
    test('Element позволяет повышать и понижать количество значений внутри себя', () => {
        function mockExtractor(element){
            let value = element.getValue()
            element.decreaseCount()
            return value
        }
        btree_element.increaseCount()
        expect(btree_element.getCount()).toBe(2)
        mockExtractor(btree_element)
        expect(btree_element.getCount()).toBe(1)
    })
    test('Если у Element не осталось значений в количественной величине, то он готов к удалению', () => {
        expect(btree_element.isReadyToDelete()).toBe(false)
        btree_element.decreaseCount()
        expect(btree_element.isReadyToDelete()).toBe(true)
    })
})