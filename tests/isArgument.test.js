import isArguments from '../src/isArguments.js';
import getTag from '../src/.internal/getTag.js';
import isObjectLike from '../src/isObjectLike.js';

jest.mock('../src/.internal/getTag.js');
jest.mock('../src/isObjectLike.js');

describe('isArguments', () => {
    beforeEach(() => {
        jest.resetAllMocks();

        const realGetTag = jest.requireActual('../src/.internal/getTag.js').default
        const realIsObjectLike = jest.requireActual('../src/isObjectLike.js').default

        getTag.mockImplementation((v) => realGetTag(v))
        isObjectLike.mockImplementation((v) => realIsObjectLike(v))
    });

    test('returns true for actual arguments object', () => {
        function testFn() {
            return isArguments(arguments);
        }
        expect(testFn()).toBe(true);
    });

    test('returns false for arrays', () => {
        isObjectLike.mockReturnValue(true);
        getTag.mockReturnValue('[object Array]');
        expect(isArguments([1, 2, 3])).toBe(false);
    });

    test('returns false for regular objects', () => {
        isObjectLike.mockReturnValue(true);
        getTag.mockReturnValue('[object Object]');
        expect(isArguments({ a: 1 })).toBe(false);
    });

    test('returns false for null', () => {
        isObjectLike.mockReturnValue(false);
        expect(isArguments(null)).toBe(false);
    });

    test('returns false for undefined', () => {
        isObjectLike.mockReturnValue(false);
        expect(isArguments(undefined)).toBe(false);
    });

    test('returns false for numbers', () => {
        isObjectLike.mockReturnValue(false);
        expect(isArguments(123)).toBe(false);
    });

    test('returns false for strings', () => {
        isObjectLike.mockReturnValue(false);
        expect(isArguments('hello')).toBe(false);
    });

    test('returns false for booleans', () => {
        isObjectLike.mockReturnValue(false);
        expect(isArguments(true)).toBe(false);
    });

    test('returns false when isObjectLike returns true but getTag is incorrect', () => {
        isObjectLike.mockReturnValue(true);
        getTag.mockReturnValue('[object Number]');
        expect(isArguments(new Number(2))).toBe(false);
    });

    test('returns true when both isObjectLike = true and getTag = [object Arguments]', () => {
        isObjectLike.mockReturnValue(true);
        getTag.mockReturnValue('[object Arguments]');
        expect(isArguments({ mock: 'arguments' })).toBe(true);
    });

    test('edge-case: function call with no arguments', () => {
        function testFn() {
            return isArguments(arguments);
        }
        expect(testFn()).toBe(true);
    });

    test('fake arguments-like object should return false', () => {
        const fakeArgs = { length: 2, 0: 'a', 1: 'b' };
        isObjectLike.mockReturnValue(true);
        getTag.mockReturnValue('[object Object]');
        expect(isArguments(fakeArgs)).toBe(false);
    });

    test('symbol should return false', () => {
        isObjectLike.mockReturnValue(false);
        expect(isArguments(Symbol('x'))).toBe(false);
    });
});
