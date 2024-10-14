// Uncomment the code below and write your tests
import { simpleCalculator, Action } from './index';

const testCases = [
  { a: 1, b: 2, action: Action.Add, expected: 3 },
  { a: 2, b: 2, action: Action.Add, expected: 4 },
  { a: 3, b: 2, action: Action.Add, expected: 5 },
  { a: 15, b: 62, action: Action.Add, expected: 77 },
  { a: 139, b: 62, action: Action.Subtract, expected: 77 },
  { a: 11, b: 7, action: Action.Multiply, expected: 77 },
  { a: 38.5, b: 0.5, action: Action.Divide, expected: 77 },
  { a: 2, b: 10, action: Action.Exponentiate, expected: 1024 },
  { a: 5, b: 10, action: 'sqrt', expected: null },
  { a: 'q', b: 10, action: Action.Add, expected: null },
];

describe('simpleCalculator', () => {
  test.each(testCases)('table tests', ({ a, b, action, expected }) => {
    expect(simpleCalculator({ a, b, action })).toBe(expected);
  });
});
