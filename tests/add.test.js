import add from '../src/add'


describe('testing add function ', () => {
    test('adds two positive numbers', () => {
        expect(add(6, 4)).toBe(10)
    })

    test('adds a positive and a negative number', () => {
        expect(add(6, -4)).toBe(2)
    })

    test('adds two negative numbers', () => {
        expect(add(-3, -7)).toBe(-10)
    })

    test('adds zero to a number', () => {
        expect(add(5, 0)).toBe(5)
        expect(add(0, 5)).toBe(5)
    })

    test('adds floating-point numbers correctly', () => {
        expect(add(0.1, 0.2)).toBeCloseTo(0.3, 5)
    })

    test('returns the other number if one argument is undefined', () => {
        expect(add(undefined, 5)).toBe(5)
        expect(add(5, undefined)).toBe(5)
    })

    test('returns 0 if both arguments are undefined', () => {
        expect(add(undefined, undefined)).toBe(0)
    })

    test('treats null as 0', () => {
        expect(add(null, 5)).toBe(5)
        expect(add(5, null)).toBe(5)
    })


})
