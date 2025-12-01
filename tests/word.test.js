import words from '../src/words'
import unicodeWords from '../src/.internal/unicodeWords.js'



jest.mock('../src/.internal/unicodeWords.js')

describe('words()', () => {

    beforeEach(() => {
        jest.resetAllMocks()
    })

    // ------------------------------
    // REAL BEHAVIOR TESTS
    // ------------------------------

    test('splits simple ASCII words', () => {
        expect(words('fred barney pebbles')).toEqual(['fred', 'barney', 'pebbles'])
    })

    test('ignores punctuation in ASCII mode', () => {
        expect(words('hello, world!')).toEqual(['hello', 'world'])
    })

    test('handles multiple punctuation characters', () => {
        expect(words('fred, barney, & pebbles')).toEqual(['fred', 'barney', 'pebbles'])
    })

    test('returns empty array for empty string', () => {
        expect(words('')).toEqual([])
    })

    test('returns empty array for string with no words', () => {
        expect(words('!@#$%^&*()')).toEqual([])
    })

    test('handles numbers inside words', () => {
        expect(words('a1 b2 c3')).toEqual(['a1', 'b2', 'c3'])
    })

    test('handles string parameters that are not strings (converted to string)', () => {
        expect(words(12345)).toEqual(['12345'])
    })

    // ------------------------------
    // PATTERN OVERRIDE TESTS
    // ------------------------------

    test('supports custom regex pattern', () => {
        expect(words('fred, barney, & pebbles', /[^, ]+/g)).toEqual([
            'fred', 'barney', '&', 'pebbles'
        ])
    })

    test('pattern that returns null gives empty array', () => {
        expect(words('abc', /z+/g)).toEqual([])
    })

    test('string-based regex pattern (converted internally)', () => {
        expect(words('a-b-c', /-/g)).toEqual(['-', '-'])
    })

    // ------------------------------
    // UNICODE BRANCH TESTS (“hasUnicodeWord”)
    // ------------------------------

    test('uses unicodeWords() for unicode text (emoji)', () => {
        unicodeWords.mockReturnValue(['🙂', '🚀'])

        expect(words('🙂 🚀')).toEqual(['🙂', '🚀'])
        expect(unicodeWords).toHaveBeenCalled()
    })

    test('unicode text with accented characters', () => {
        unicodeWords.mockReturnValue(['café', 'mañana'])

        expect(words('café mañana')).toEqual(['café', 'mañana'])
    })

    test('unicodeWords returning null triggers fallback to []', () => {
        unicodeWords.mockReturnValue(null)

        expect(words('🌟')).toEqual([])
    })

    // ------------------------------
    // ASCII BRANCH TESTS
    // Force hasUnicodeWord false → asciiWords
    // ------------------------------

    test('asciiWords used when hasUnicodeWord returns false (ASCII only)', () => {
        const originalTest = RegExp.prototype.test
        RegExp.prototype.test = jest.fn().mockReturnValue(false)

        unicodeWords.mockReturnValue(['WRONG'])
        expect(words('abc')).toEqual(['abc'])
        expect(unicodeWords).not.toHaveBeenCalled()

        RegExp.prototype.test = originalTest
    })

    test('asciiWords returns null → fallback empty array', () => {
        const originalMatch = String.prototype.match

        String.prototype.match = jest.fn().mockReturnValue(null)
        const result = words('abc')

        expect(result).toEqual([])

        String.prototype.match = originalMatch
    })

    // ------------------------------
    // MIXED ALPHANUMERIC unicode-detection trigger tests
    // ------------------------------

    test('trigger hasUnicodeWord: lowercase-uppercase combo', () => {
        unicodeWords.mockReturnValue(['aB'])
        expect(words('aB')).toEqual(['aB'])
    })

    test('trigger hasUnicodeWord: uppercase-uppercase-lowercase combo', () => {
        unicodeWords.mockReturnValue(['USAa'])
        expect(words('USAa')).toEqual(['USAa'])
    })

    test('trigger hasUnicodeWord: digit-letter combo', () => {
        unicodeWords.mockReturnValue(['1a'])
        expect(words('1a')).toEqual(['1a'])
    })

    test('trigger hasUnicodeWord: letter-digit combo', () => {
        unicodeWords.mockReturnValue(['a1'])
        expect(words('a1')).toEqual(['a1'])
    })

    test('trigger hasUnicodeWord: special symbol', () => {
        unicodeWords.mockReturnValue(['@'])
        expect(words('@')).toEqual(['@'])
    })

    // ------------------------------
    // TYPE TESTS
    // ------------------------------

    test('undefined input → empty array', () => {
        expect(words(undefined)).toEqual([])
    })

    test('null input → empty array', () => {
        expect(words(null)).toEqual([])
    })
})
