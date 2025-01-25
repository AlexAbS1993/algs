const Stack = require("../../algorithms/stack")

describe('Структура данных stack позволяет складывать вызовы сущностей по типу "первый зашел – последний вышел"', () => {
    let stack 
    const mockEntitie = {
        start: () => {
            return 1
        }
    }
    beforeEach(() => {
        stack = new Stack()
    })
    test('Stack позволяет добавляет в себя сущности', () => {
        stack.push(mockEntitie)
        expect(stack.length()).toBe(1)
    })
    test('Stack позволяет удалять из себя последнюю зашедщую сущность', () => {
        stack.push(mockEntitie)
        stack.pop()
        expect(stack.length()).toBe(0)
    })
    test('Stack позволяет получить сущность с самого верха', () => {
        stack.push(mockEntitie)
        expect(stack.get()).toBe(mockEntitie)
    })
})