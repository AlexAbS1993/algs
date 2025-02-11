const Cell = require("../../algorithms/btree/cell")
const Element = require("../../algorithms/btree/element")

describe('Сущность Cell призвана хранить внутри себя набор из Elements. Так же Cell внутри себя хранит максимально допустимый пул \n' + 
    'и список из детей и одного родителя, если таковой имеется', () => {
        let cell  = new Cell(3)
        beforeEach(() => {
            cell = new Cell(3)
        })
        test('Сущность Cell хранит информацию о своей разрядности, о количестве возможных родителей и детей', () => {
            const {degree, availableParentsCount, availableChildrensCount} = cell.getInfo()
            expect(degree).toBe(3)
            expect(availableParentsCount).toBe(1)
            expect(availableChildrensCount).toBe(4)
        })
        test('Сущность Cell способна добавлять в себя новые значения', () => {
            cell.addValue(4)
            cell.addValue(1)
            let element1 = cell.getElementValueByOrder(0)
            let element2 = cell.getElementValueByOrder(1)
            expect(element1).toBe(1)
            expect(element2).toBe(4)
        })
        test('После превышения лимита устанавливает флаг в качестве необходимости разбиения, а центральное значение выносит в отдельное поле', () => {
            cell.addValue(4)
            cell.addValue(1)
            cell.addValue(2)
            cell.addValue(8)
            expect(cell.isOverload()).toBe(true)
            let overloadedElement = cell.getOverloadMiddleElement()
            expect(overloadedElement.element.getValue()).toBe(4)
        })
        test('Если перегрузить элемент и попытаться добавить ещё одно значение без исправления, то выпадет ошибка', () => {
            cell.addValue(4)
            cell.addValue(1)
            cell.addValue(2)
            cell.addValue(8)
            expect(cell.isOverload()).toBe(true)
            try {
                cell.addValue(10)
            }
            catch(e){
                expect(e.message).toMatch('необходимо исправить')
            }
        })
        test('В Cell есть массив детей. Каждый индекс соответствует индексу значений и включает в себя поля less и more', () =>{
            cell.addValue(4)
            cell.addValue(1)
            cell.addValue(2)
            cell.addValue(8)
            let newSet = cell.fix()
            let parrentCell = new Cell(3)
            parrentCell.addValue(newSet.overloadedElement)
            parrentCell.addLessChild(0, newSet.less)
            parrentCell.addMoreChild(0, newSet.more)
            expect(parrentCell.getChilds(0).less).toBe(newSet.less)
            expect(parrentCell.getChilds(0).more).toBe(newSet.more)
            expect(parrentCell.getChilds(0).less.getParent()).toBe(parrentCell)
        })
    }
)