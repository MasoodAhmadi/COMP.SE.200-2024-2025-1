import isBoolean from '../src/isBoolean'
import getTag from '../src/.internal/getTag.js'
import isObjectLike from '../src/isObjectLike.js'

jest.mock('../src/.internal/getTag.js')
jest.mock('../src/isObjectLike.js')

describe('isBoolean()', () => {

    beforeEach(() => {
        jest.resetAllMocks()

        // By default, let the mocks call through to the real implementations
        const realGetTag = jest.requireActual('../src/.internal/getTag.js').default
        const realIsObjectLike = jest.requireActual('../src/isObjectLike.js').default

        getTag.mockImplementation((v) => realGetTag(v))
        isObjectLike.mockImplementation((v) => realIsObjectLike(v))
    })

    describe('integration tests (real getTag & isObjectLike)', () => {
        test('returns true for boolean primitive true', () => {
            expect(isBoolean(true)).toBe(true)
        })

        test('returns true for boolean primitive false', () => {
            expect(isBoolean(false)).toBe(true)
        })

        test('returns true for Boolean objects created with new Boolean()', () => {
            expect(isBoolean(new Boolean(true))).toBe(true)
            expect(isBoolean(new Boolean(false))).toBe(true)
            expect(isBoolean(Object(false))).toBe(true)
        })

        test('returns false for null, undefined', () => {
            expect(isBoolean(null)).toBe(false)
            expect(isBoolean(undefined)).toBe(false)
        })

        test('returns false for numbers', () => {
            expect(isBoolean(0)).toBe(false)
            expect(isBoolean(1)).toBe(false)
            expect(isBoolean(NaN)).toBe(false)
        })

        test('returns false for strings', () => {
            expect(isBoolean("true")).toBe(false)
            expect(isBoolean("false")).toBe(false)
            expect(isBoolean("")).toBe(false)
        })

        test('returns false for objects', () => {
            expect(isBoolean({})).toBe(false)
            expect(isBoolean({ valueOf: () => true })).toBe(false)
        })

        test('returns false for arrays', () => {
            expect(isBoolean([])).toBe(false)
            expect(isBoolean([true])).toBe(false)
        })

        test('returns false for functions', () => {
            expect(isBoolean(() => true)).toBe(false)
        })

        test('returns false for symbols', () => {
            expect(isBoolean(Symbol())).toBe(false)
        })

        test('returns false for bigint', () => {
            expect(isBoolean(BigInt(1))).toBe(false)
        })

        test('returns false for dates', () => {
            expect(isBoolean(new Date())).toBe(false)
        })

        test('returns false for regexp', () => {
            expect(isBoolean(/abc/)).toBe(false)
        })

        test('returns false for object mimicking Boolean wrapper', () => {
            const fake = { valueOf: () => true, toString: () => "[object Boolean]" }
            expect(isBoolean(fake)).toBe(false)
        })

        test('returns true when getTag returns [object Boolean] for object', () => {
            const boolLike = Object.create(null)
            boolLike.valueOf = () => true
            Object.defineProperty(boolLike, Symbol.toStringTag, {
                value: "Boolean"
            })

            expect(isBoolean(boolLike)).toBe(true)
        })
    })

    describe('mocked tests for full branch coverage', () => {

        test('isObjectLike=false branch forces false result', () => {
            isObjectLike.mockReturnValue(false)
            getTag.mockReturnValue('[object Boolean]')
            expect(isBoolean({})).toBe(false)
        })

        test('isObjectLike=true but getTag != boolean', () => {
            isObjectLike.mockReturnValue(true)
            getTag.mockReturnValue('[object String]')
            expect(isBoolean({})).toBe(false)
        })

        test('isObjectLike=true and getTag === "[object Boolean]"', () => {
            isObjectLike.mockReturnValue(true)
            getTag.mockReturnValue('[object Boolean]')
            expect(isBoolean({})).toBe(true)
        })

        test('getTag returns weird unexpected tags (robustness)', () => {
            isObjectLike.mockReturnValue(true)
            getTag.mockReturnValue('[object Unexpected]')
            expect(isBoolean({})).toBe(false)
        })

        test('isObjectLike called with given value', () => {
            const val = { a: 1 }
            isObjectLike.mockReturnValue(false)
            isBoolean(val)
            expect(isObjectLike).toHaveBeenCalledWith(val)
        })

        test('getTag called only when isObjectLike is true', () => {
            isObjectLike.mockReturnValue(false)
            isBoolean({})
            expect(getTag).not.toHaveBeenCalled()

            jest.resetAllMocks()
            isObjectLike.mockReturnValue(true)
            getTag.mockReturnValue('[object Boolean]')
            isBoolean({})
            expect(getTag).toHaveBeenCalled()
        })
    })
})
