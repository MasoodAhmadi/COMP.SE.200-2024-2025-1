// map.test.js
import map from '../src/map';

describe('map()', () => {
  // 1. Map numbers to their squares
  test('maps numbers to their squares', () => {
    const arr = [2, 3, 4];
    const square = n => n * n;
    expect(map(arr, square)).toEqual([4, 9, 16]);
  });

  // 2. Map strings to their uppercase
  test('maps strings to uppercase', () => {
    const arr = ['a', 'b', 'c'];
    expect(map(arr, s => s.toUpperCase())).toEqual(['A', 'B', 'C']);
  });

  // 3. Map objects to a specific property
  test('maps objects to a specific property', () => {
    const users = [
      { user: 'barney', age: 36 },
      { user: 'fred', age: 40 }
    ];
    expect(map(users, u => u.user)).toEqual(['barney', 'fred']);
  });

  // 4. Map with index
  test('maps array using index', () => {
    const arr = ['a', 'b', 'c'];
    expect(map(arr, (val, index) => `${val}${index}`)).toEqual(['a0', 'b1', 'c2']);
  });

  // 5. Empty array returns empty array
  test('returns empty array for empty input', () => {
    expect(map([], x => x * 2)).toEqual([]);
  });

  // 6. Null or undefined input returns empty array
  test('returns empty array when input is null or undefined', () => {
    expect(map(null, x => x)).toEqual([]);
    expect(map(undefined, x => x)).toEqual([]);
  });

  // 7. Map numbers to boolean (example of type conversion)
  test('maps numbers to booleans', () => {
    const arr = [0, 1, 2];
    expect(map(arr, n => !!n)).toEqual([false, true, true]);
  });
});
