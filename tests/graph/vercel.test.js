const Vercel = require("../../algorithms/graph/Vercel")

describe('Vercel является вершиной в графе', () => {
    const vercelTitle = 'A'
    let ver
    beforeEach(() => {
        ver = new Vercel(vercelTitle)
    })
    test('Vercel имеет название', () => {
        expect(ver.getTitle()).toBe(vercelTitle)
    })
    test('Vercel может добавлять в себя соседей', () => {
        ver
        .addNighbourd(new Vercel('B'))
        .addNighbourd(new Vercel('C'))
        .addNighbourd(new Vercel('V'))
        expect(ver.nighbourdsCount()).toBe(3)
    })
    test('Vercel может ответить на вопрос, соседствует ли он с другим vercel', () => {
        const nighbourd = new Vercel('B')
        const stranger = new Vercel('C')
        ver.addNighbourd(nighbourd)
        expect(ver.isNighbourdWith(nighbourd)).toBe(true)
        expect(ver.isNighbourdWith(stranger)).toBe(false)
    }) 
})