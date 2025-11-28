// toNumber.test.js
import toNumber from '../src/toNumber';

describe('toNumber()', () => {
  // 1. Converts a regular number
  test('returns the same number for a number input', () => {
    expect(toNumber(3.2)).toBe(3.2);
    expect(toNumber(-5)).toBe(-5);
  });

  // 2. Converts a numeric string
  test('converts a numeric string to number', () => {
    expect(toNumber('42')).toBe(42);
    expect(toNumber('3.14')).toBe(3.14);
  });

  // 3. Converts binary and octal strings
  test('converts binary and octal string values', () => {
    expect(toNumber('0b101')).toBe(5);   // binary
    expect(toNumber('0o12')).toBe(10);   // octal
  });

  // 4. Returns NaN for bad hex or symbols
  test('returns NaN for bad hex string and Symbol', () => {
    expect(toNumber('0xZZ')).toBeNaN();     // invalid hex
    expect(toNumber(Symbol('foo'))).toBeNaN(); // symbol
  });

  // 5. Converts objects with valueOf or string coercion
  test('converts objects with valueOf or toString', () => {
    expect(toNumber({ valueOf: () => 7 })).toBe(7);
    expect(toNumber({ toString: () => '9.5' })).toBe(9.5);
  });

  // 6. Trims whitespace in strings
  test('trims leading and trailing whitespace', () => {
    expect(toNumber('  123  ')).toBe(123);
    expect(toNumber('\n\t3.14\t')).toBe(3.14);
  });

  // 7. Edge cases
  test('handles 0, Infinity, -Infinity, NaN', () => {
    expect(toNumber(0)).toBe(0);
    expect(toNumber(Infinity)).toBe(Infinity);
    expect(toNumber(-Infinity)).toBe(-Infinity);
    expect(toNumber(NaN)).toBeNaN();
  });
});
