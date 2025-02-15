const DP_Element = require("../../algorithms/dp/dp")
const Jumping = require("../../algorithms/dp/jumping")

describe('Задача кузнечика решается при помощи динамического программирования', () => {
    const mockLadder = [0, 10, 4, 3, -1, -4, 1, 4, -5, 6, 0]
    let jumping = new Jumping(mockLadder)
    beforeEach(() => {
        jumping = new Jumping(mockLadder)
    })
    test('Правильно высчитывается база', () => {
        jumping.calculate_base()
        let dp = jumping.get_dp()
        expect(Array.isArray(dp)).toBe(true)
        expect(dp[0][0] instanceof DP_Element).toBe(true)
        expect(dp[0][0].value).toBe(0)
        for (let i = 1; i < dp.length; i++){
            expect(dp[i]).toEqual([])
        }
    })
    test('Правильно добавляются данные в dp-матрицу. Просматривается элемент и расцениваются оба прыжка. В элементы записываются данные, откуда сделан прыжок и какова сумма', () => {
        jumping.calculate_base()
        jumping.add_data_to_dp(0,1)
        jumping.add_data_to_dp(0,2)
        let dp = jumping.get_dp()
        expect(dp[1][0].sum).toBe(10)
        expect(dp[2][0].sum).toBe(4)
        expect(dp[1][0].from).toBe(0)
        expect(dp[2][0].from).toBe(0)
        jumping.add_data_to_dp(1,1)
        expect(dp[2][1].sum).toBe(14)
        expect(dp[2][1].from).toBe(1)
    })
    test('Правильно заполняется вся матрица dp', () => {
        jumping.calculate_base()
        jumping.cicle_calculate()
        let dp = jumping.get_dp()
        expect(dp[1][0].sum).toBe(10)
        expect(dp[2][0].sum).toBe(4)
        expect(dp[1][0].from).toBe(0)
        expect(dp[2][0].from).toBe(0)
        expect(dp[2][1].sum).toBe(14)
        expect(dp[2][1].from).toBe(1)
    })
    test('Возвращается правильный путь и сумма', () => {
        let result = jumping.calculate()
        expect(result.max_sum).toBe(27)
        expect(result.path).toBe('start=>1(10)=>2(14)=>3(17)=>4(16)=>6(17)=>7(21)=>9(27)=>finish')
    })
})