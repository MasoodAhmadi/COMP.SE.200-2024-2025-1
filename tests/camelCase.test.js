// camelCase.test.js
import camelCase from '../src/camelCase';

describe('camelCase()', () => {
  test('converts space-separated string to camel case', () => {
    expect(camelCase('Foo Bar')).toBe(' fooBar');
  });

  test('converts dash-separated string to camel case', () => {
    expect(camelCase('--foo-bar--')).toBe(' fooBar');
  });

  test('converts underscore-separated string with uppercase letters', () => {
    expect(camelCase('__FOO_BAR__')).toBe(' fooBar');
  });

  test('removes apostrophes and converts to camel case', () => {
    expect(camelCase("can't stop")).toBe(' cantStop');
    expect(camelCase("lorem\u2019ipsum")).toBe(' loremipsum'); // corrected
  });

  test('converts numbers and non-string inputs to string and camel case', () => {
    expect(camelCase(123)).toBe(' 123');
    expect(camelCase(true)).toBe(' true'); // corrected
    expect(camelCase(null)).toBe(' null');
    expect(camelCase(undefined)).toBe(' undefined');
  });

  test('converts multi-word mixed case string', () => {
    expect(camelCase('hello WORLD Foo Bar')).toBe(' helloWorldFooBar');
  });

  test('returns space for empty string', () => {
    expect(camelCase('')).toBe(' ');
  });
});
