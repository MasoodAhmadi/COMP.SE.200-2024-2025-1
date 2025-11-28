// ceil.test.js
import ceil from '../src/ceil';

describe('ceil()', () => {
  // 1. Rounds up a positive decimal without precision
  test('rounds up 4.006 without precision', () => {
    expect(ceil(4.006)).toBe(5);
  });

  // 2. Rounds up a positive decimal with precision
  test('rounds up 6.004 to 2 decimal places', () => {
    expect(ceil(6.004, 2)).toBe(6.01);
  });

  // 3. Rounds up a number with negative precision
  test('rounds up 6040 with -2 precision', () => {
    expect(ceil(6040, -2)).toBe(6100);
  });

  // 4. Rounds up negative decimal numbers
  test('rounds up -4.321 without precision', () => {
    expect(ceil(-4.321)).toBe(-4);
  });

  // 5. Rounds up negative decimal numbers with precision
  test('rounds up -6.004 to 2 decimal places', () => {
    expect(ceil(-6.004, 2)).toBe(-6);
  });

  // 6. Edge case: zero should remain zero
  test('returns 0 when input is 0', () => {
    expect(ceil(0)).toBe(0);
  });
});
