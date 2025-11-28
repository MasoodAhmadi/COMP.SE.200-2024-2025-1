// capitalize.test.js
import capitalize from '../src/capitalize';

describe('capitalize()', () => {
  // 1. All uppercase string
  test('capitalizes an all-uppercase string', () => {
    expect(capitalize('FRED')).toBe('Fred');
  });

  // 2. All lowercase string
  test('capitalizes an all-lowercase string', () => {
    expect(capitalize('john')).toBe('John');
  });

  // 3. Mixed-case string
  test('capitalizes a mixed-case string', () => {
    expect(capitalize('aLiCe')).toBe('Alice');
  });

  // 4. Empty string returns empty string
  test('returns empty string when input is empty', () => {
    expect(capitalize('')).toBe('');
  });

  // 5. String with numbers or symbols
  test('capitalizes string with numbers and symbols', () => {
    expect(capitalize('123abc')).toBe('123abc'); // first char not a letter
    expect(capitalize('!hello')).toBe('!hello'); // first char not a letter
  });

  // 6. Non-string input (number, boolean, null, undefined)
  test('handles non-string inputs by converting to string', () => {
    expect(capitalize(123)).toBe('123');
    expect(capitalize(true)).toBe('True');
    expect(capitalize(null)).toBe('Null');
    expect(capitalize(undefined)).toBe('Undefined');
  });

  // 7. String with only one character
  test('capitalizes a single character string', () => {
    expect(capitalize('a')).toBe('A');
    expect(capitalize('Z')).toBe('Z');
  });
});
