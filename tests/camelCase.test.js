import camelCase from '../src/camelCase.js'

describe('camelCase()', () => {
    test('converts space-separated words to camelCase', () => {
        expect(camelCase('Foo Bar').trim()).toBe('fooBar')
        expect(camelCase('hello world').trim()).toBe('helloWorld')
    })

    test('converts dash-separated words to camelCase', () => {
        expect(camelCase('--foo-bar--').trim()).toBe('fooBar')
        expect(camelCase('my-long-variable').trim()).toBe('myLongVariable')
    })

    test('converts underscore-separated words to camelCase', () => {
        expect(camelCase('__FOO_BAR__').trim()).toBe('fooBar')
        expect(camelCase('snake_case_test').trim()).toBe('snakeCaseTest')
    })

    test('handles mixed separators', () => {
        expect(camelCase('foo-bar_baz').trim()).toBe('fooBarBaz')
        expect(camelCase('foo--bar__baz').trim()).toBe('fooBarBaz')
    })

    test('handles strings with apostrophes', () => {
        expect(camelCase("can't stop").trim()).toBe('cantStop')
        expect(camelCase("FOO’BAR").trim()).toBe('fooBar') // Unicode apostrophe
    })

    test('converts numbers in strings', () => {
        expect(camelCase('version 1 2 3').trim()).toBe('version123')
        expect(camelCase('foo2bar').trim()).toBe('foo2Bar')
    })

    test('returns empty string for empty input', () => {
        expect(camelCase('').trim()).toBe('')
        expect(camelCase(null).trim()).toBe('')
        expect(camelCase(undefined).trim()).toBe('')
    })

    test('handles single word strings', () => {
        expect(camelCase('Hello').trim()).toBe('hello')
        expect(camelCase('WORLD').trim()).toBe('world')
    })

    test('handles leading and trailing spaces', () => {
        expect(camelCase('  leading space').trim()).toBe('leadingSpace')
        expect(camelCase('trailing space  ').trim()).toBe('trailingSpace')
        expect(camelCase('  both  ').trim()).toBe('both')
    })

    test('handles special characters gracefully', () => {
        expect(camelCase('foo@bar!baz').trim()).toBe('fooBarBaz')
        expect(camelCase('foo#bar$').trim()).toBe('fooBar')
    })
})
