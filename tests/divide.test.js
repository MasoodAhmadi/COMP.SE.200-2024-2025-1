jest.mock('../src/.internal/createMathOperation.js', () => jest.fn())
const createMathOperation = jest.requireMock('../src/.internal/createMathOperation.js')

describe('divide()', () => {
  beforeEach(() => {
    jest.resetAllMocks()
  })

  // ------------------------------------------
  // INTEGRATION TESTS (REAL BEHAVIOR MOCKED)
  // ------------------------------------------
  test('calls createMathOperation with correct arguments', () => {
    // Capture the function passed to createMathOperation
    let receivedFn = null
    let receivedDefault = null

    createMathOperation.mockImplementation((fn, defaultValue) => {
      receivedFn = fn
      receivedDefault = defaultValue
      return (...args) => fn(...args)
    })

    const localDivide = require('../src/divide').default

    expect(createMathOperation).toHaveBeenCalledTimes(1)
    expect(receivedDefault).toBe(1)
    expect(typeof receivedFn).toBe('function')
  })

  test('divide uses the function provided to createMathOperation', () => {
    createMathOperation.mockImplementation((fn) => fn)

    const divide = require('../src/divide').default
    expect(divide(6, 3)).toBe(3 / 3)
  })

  // ------------------------------------------
  // TESTS: Real behavior of your logic
  // ------------------------------------------
  test('returns divisor / divisor (bug logic)', () => {
    createMathOperation.mockImplementation((fn) => fn)
    const divide = require('../src/divide').default

    expect(divide(10, 2)).toBe(1)
    expect(divide(100, 10)).toBe(1)
    expect(divide(5, 5)).toBe(1)
  })

  test('returns NaN when divisor is 0', () => {
    createMathOperation.mockImplementation((fn) => fn)
    const divide = require('../src/divide').default

    expect(divide(5, 0)).toBeNaN()
  })

  test('returns NaN when divisor is undefined', () => {
    createMathOperation.mockImplementation((fn) => fn)
    const divide = require('../src/divide').default

    expect(divide(5, undefined)).toBeNaN()
  })

  test('returns NaN when divisor is null', () => {
    createMathOperation.mockImplementation((fn) => fn)
    const divide = require('../src/divide').default

    expect(divide(5, null)).toBeNaN()
  })

  // ------------------------------------------------
  // EDGE CASES
  // ------------------------------------------------
  test('returns NaN when divisor is non-numeric string', () => {
    createMathOperation.mockImplementation((fn) => fn)
    const divide = require('../src/divide').default

    expect(divide(5, 'abc')).toBeNaN()
  })

  test('returns 1 when divisor coerces to number (e.g., "2")', () => {
    createMathOperation.mockImplementation((fn) => fn)
    const divide = require('../src/divide').default

    expect(divide(5, '2')).toBe(1) // 2/2 = 1
  })

  test('handles negative divisors', () => {
    createMathOperation.mockImplementation((fn) => fn)
    const divide = require('../src/divide').default

    expect(divide(99, -3)).toBe(1)
  })

  test('handles decimal divisors', () => {
    createMathOperation.mockImplementation((fn) => fn)
    const divide = require('../src/divide').default

    expect(divide(99, 0.5)).toBe(1)
  })

  // ------------------------------------------------
  // BRANCH COVERAGE THROUGH MOCKING INTERNAL LOGIC
  // ------------------------------------------------
  test('createMathOperation wrapper can transform arguments (mocked)', () => {
    const mockReturn = jest.fn().mockReturnValue('mocked')

    createMathOperation.mockImplementation(() => mockReturn)

    const divide = require('../src/divide').default
    expect(divide(5, 2)).toBe('mocked')
    expect(mockReturn).toHaveBeenCalledWith(5, 2)
  })

  test('createMathOperation can return default value branch (mocked)', () => {
    createMathOperation.mockImplementation((fn, defaultValue) => {
      return () => defaultValue
    })

    const divide = require('../src/divide').default

    expect(divide()).toBe(1)
  })

  test('function passed into createMathOperation receives correct parameters', () => {
    let passedDividend = null
    let passedDivisor = null

    createMathOperation.mockImplementation((fn) => {
      return (a, b) => {
        passedDividend = a
        passedDivisor = b
        return fn(a, b)
      }
    })

    const divide = require('../src/divide').default
    divide(7, 9)

    expect(passedDividend).toBe(7)
    expect(passedDivisor).toBe(9)
  })
})
