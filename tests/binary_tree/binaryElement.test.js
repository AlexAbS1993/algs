const BinaryElement = require("../../algorithms/binary_tree/element")

describe('BinaryElement является частью Binary Tree и обладает рядом методов для работы со своим положением в дереве и отношением с другими его частями', () => {
    let binaryElement = new BinaryElement(10)
    test('У элемента можно запросить значение', () => {
        expect(binaryElement.getValue()).toBe(10)
    })
    test('У элемента можно узнать о наличии родителей и детей', () => {
        expect(binaryElement.isParentExists()).toBe(false)
        expect(binaryElement.isLeftChildExists()).toBe(false)
        expect(binaryElement.isRightChildExists()).toBe(false)
    })
    test('Элементу можно определить родителя и детей', () => {
        let parentElement = new BinaryElement(12)
        parentElement.addLeftChild(binaryElement)
        expect(parentElement.isLeftChildExists()).toBe(true)
        expect(parentElement.getLeftChild()).toBe(binaryElement)
        expect(binaryElement.isParentExists()).toBe(true)
        expect(binaryElement.getParent()).toBe(parentElement)
    })
})