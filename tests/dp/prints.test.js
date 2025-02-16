const Jump = require("../../algorithms/dp/Jump/jump")
const { StringPrintResult } = require("../../algorithms/dp/Jump/print")
const fs = require('fs')
describe('Тестирование мокового вывода данных в виде строки для различных алгоритмов', () => {
    test('Print для Jump в виде строки', () => {
        const mockLadder = [0, 10, 4, 3, -1, -4, 1, 4, -5, 6, 0]
        const jumping = new Jump(mockLadder)
        const print = new StringPrintResult()
        jumping.calculate()
        let result = jumping.getResult(print)
        let date = new Date()
        let writeableStream = fs.createWriteStream(__dirname + '/snapshots' + `/snap-${date.getDate()}-${date.getMonth()}-${date.getFullYear()}(${date.getHours()}hh${date.getMinutes()}mm).txt`)
        writeableStream.write(result.path, () => {
            writeableStream.end()
        })
        expect(result.sum).toBe(27)
    })
}) 