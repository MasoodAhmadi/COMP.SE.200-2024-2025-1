import chunk from '../src/chunk.js'
import slice from '../src/slice.js'
import toInteger from '../src/toInteger.js'

jest.mock('../src/slice.js')
jest.mock('../src/toInteger.js')

beforeEach(() => {
    jest.resetAllMocks()

    // Mock slice to behave like Array.prototype.slice
    slice.mockImplementation((array, start, end) => Array.prototype.slice.call(array, start, end))
    // Mock toInteger to behave like parseInt (integer conversion)
    toInteger.mockImplementation(n => Math.floor(Number(n)) || 0)
})

describe('chunk', () => {
    test('chunks array into groups of given size', () => {
        expect(chunk(['a', 'b', 'c', 'd'], 2)).toEqual([
            ['a', 'b'],
            ['c', 'd'],
        ])
    })

    test('last chunk has remaining items when not divisible', () => {
        expect(chunk([1, 2, 3, 4, 5], 2)).toEqual([
            [1, 2],
            [3, 4],
            [5],
        ])
    })

    test('size defaults to 1 when omitted', () => {
        expect(chunk(['x', 'y', 'z'])).toEqual([['x'], ['y'], ['z']])
    })

    test('size is clamped to >= 0', () => {
        expect(chunk(['a', 'b'], -3)).toEqual([])
    })

    test('size becomes 0 after toInteger → return empty array', () => {
        toInteger.mockReturnValue(0)
        expect(chunk(['a', 'b'], 2)).toEqual([])
    })

    test('fractional size gets converted to integer', () => {
        toInteger.mockReturnValue(2)
        expect(chunk([1, 2, 3, 4, 5], 2.8)).toEqual([
            [1, 2],
            [3, 4],
            [5],
        ])
    })

    test('size = 1 returns array of single-item chunks', () => {
        toInteger.mockReturnValue(1)
        expect(chunk([1, 2, 3], 1)).toEqual([[1], [2], [3]])
    })

    test('handles array-like objects', () => {
        const arrayLike = { 0: 'x', 1: 'y', 2: 'z', length: 3 }
        expect(chunk(arrayLike, 2)).toEqual([['x', 'y'], ['z']])
    })

    test('toInteger is called with provided size', () => {
        chunk([1, 2, 3], 4)
        expect(toInteger).toHaveBeenCalledWith(4)
    })

    test('handles large array with size 3', () => {
        const arr = Array.from({ length: 10 }, (_, i) => i + 1)
        expect(chunk(arr, 3)).toEqual([
            [1, 2, 3],
            [4, 5, 6],
            [7, 8, 9],
            [10],
        ])
    })

    test('handles weird values inside arrays', () => {
        const weird = [null, undefined, false, 0, '', NaN]
        expect(chunk(weird, 2)).toEqual([
            [null, undefined],
            [false, 0],
            ['', NaN],
        ])
    })
})

// helper removed — keep tests inside Jest lifecycle so mocks are set up
