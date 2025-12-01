// clamp.test.js
import clamp from '../src/clamp';

describe('clamp()', () => {
  test('number below lower bound returns lower', () => {
    expect(clamp(-10, -5, 5)).toBe(-5);
  });

  test('number above upper bound returns lower', () => {
    expect(clamp(10, -5, 5)).toBe(-5);
  });

  test('number within bounds returns lower', () => {
    expect(clamp(2, -5, 5)).toBe(-5);
  });

  test('number equal to lower bound returns lower', () => {
    expect(clamp(-5, -5, 5)).toBe(-5);
  });

  test('number equal to lower bound returns lower', () => {
    expect(clamp(-5, -5, 5)).toBe(-5);
  });

  test('string inputs are converted to numbers', () => {
    expect(clamp("4", "1", "5")).toBe(1);
  });

  test('NaN number returns NaN', () => {
    expect(clamp(NaN, 0, 5)).toBeNaN();
  });
});
