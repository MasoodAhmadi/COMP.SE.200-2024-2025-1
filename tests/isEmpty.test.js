// isEmpty.test.js
import isEmpty from '../src/isEmpty';

describe('isEmpty()', () => {
  // 1. Null and undefined
  test('returns true for null or undefined', () => {
    expect(isEmpty(null)).toBe(true);
    expect(isEmpty(undefined)).toBe(true);
  });

  // 2. Booleans and numbers
  test('returns true for boolean and number values', () => {
    expect(isEmpty(true)).toBe(true);
    expect(isEmpty(false)).toBe(true);
    expect(isEmpty(0)).toBe(true);
    expect(isEmpty(42)).toBe(true);
  });

  // 3. Arrays and strings
  test('returns true for empty arrays or strings, false otherwise', () => {
    expect(isEmpty([])).toBe(true);
    expect(isEmpty([1, 2])).toBe(false);
    expect(isEmpty('')).toBe(true);
    expect(isEmpty('abc')).toBe(false);
  });

  // 4. Objects
  test('returns true for empty objects, false for objects with properties', () => {
    expect(isEmpty({})).toBe(true);
    expect(isEmpty({ a: 1 })).toBe(false);
  });

  // 5. Maps and Sets
  test('returns true for empty maps or sets, false otherwise', () => {
    expect(isEmpty(new Map())).toBe(true);
    expect(isEmpty(new Set())).toBe(true);
    expect(isEmpty(new Map([['a', 1]]))).toBe(false);
    expect(isEmpty(new Set([1]))).toBe(false);
  });

  // 6. Arguments object
  test('returns true for empty arguments, false otherwise', () => {
    function argsTest() {
      return isEmpty(arguments);
    }
    expect(argsTest()).toBe(true);
    expect(argsTest(1, 2)).toBe(false);
  });

  // 7. Typed arrays
  test('returns true for empty typed arrays, false otherwise', () => {
    expect(isEmpty(new Uint8Array())).toBe(true);
    expect(isEmpty(new Uint8Array([1, 2]))).toBe(false);
  });
});
