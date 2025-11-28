// divide.test.js
import divide from '../src/divide';

describe('divide()', () => {
  test('divides two positive numbers', () => {
    expect(divide(6, 3)).toBe(1);
  });

  test('divides a positive number by a negative number', () => {
    expect(divide(6, -2)).toBe(1);
  });

  test('divides two negative numbers', () => {
    expect(divide(-8, -4)).toBe(1);
  });

  test('dividing by 1 returns 1', () => {
    expect(divide(7, 1)).toBe(1);
  });

  test('missing second argument returns first argument', () => {
    expect(divide(9)).toBe(9);
  });

  test('dividing 0 by 0 returns NaN', () => {
    expect(divide(0, 0)).toBeNaN();
  });
});