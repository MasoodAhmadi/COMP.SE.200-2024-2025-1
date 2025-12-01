// filter.test.js
import filter from '../src/filter';

describe('filter()', () => {
  test('filters numbers greater than 3', () => {
    const arr = [1, 2, 3, 4, 5];
    expect(filter(arr, n => n > 3)).toEqual([4, 5]);
  });

  test('filters objects with active true', () => {
    const users = [
      { user: 'barney', active: true },
      { user: 'fred', active: false },
      { user: 'alice', active: true },
    ];
    expect(filter(users, u => u.active)).toEqual([
      { user: 'barney', active: true },
      { user: 'alice', active: true }
    ]);
  });

  test('returns [[]] when input array is empty', () => {
    expect(filter([], n => n > 0)).toEqual([[]]);
  });

  test('returns [[]] when no element satisfies predicate', () => {
    const arr = [1, 2, 3];
    expect(filter(arr, n => n > 10)).toEqual([[]]);
  });

  test('filters even indices', () => {
    const arr = ['a', 'b', 'c', 'd'];
    expect(filter(arr, (_, index) => index % 2 === 0)).toEqual(['a', 'c']);
  });

  test('returns [[]] when array is null or undefined', () => {
    expect(filter(null, n => n)).toEqual([[]]);
    expect(filter(undefined, n => n)).toEqual([[]]);
  });
});
