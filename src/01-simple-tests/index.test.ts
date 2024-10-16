// Uncomment the code below and write your tests
import { simpleCalculator, Action } from './index';

describe('simpleCalculator tests', () => {
  test('should add two numbers', () => {
    let result = simpleCalculator({ a: 15, b: 62, action: Action.Add });
    expect(result).toBe(77);
    result = simpleCalculator({ a: 15, b: 15, action: Action.Add });
    expect(result).not.toBe(77);
  });

  test('should subtract two numbers', () => {
    let result = simpleCalculator({ a: 139, b: 62, action: Action.Subtract });
    expect(result).toBe(77);
    result = simpleCalculator({ a: 139, b: 139, action: Action.Subtract });
    expect(result).not.toBe(77);
  });

  test('should multiply two numbers', () => {
    let result = simpleCalculator({ a: 11, b: 7, action: Action.Multiply });
    expect(result).toBe(77);
    result = simpleCalculator({ a: 11, b: 11, action: Action.Multiply });
    expect(result).not.toBe(77);
  });

  test('should divide two numbers', () => {
    let result = simpleCalculator({ a: 38.5, b: 0.5, action: Action.Divide });
    expect(result).toBe(77);
    result = simpleCalculator({ a: 38.5, b: 1, action: Action.Divide });
    expect(result).not.toBe(77);
  });

  test('should exponentiate two numbers', () => {
    let result = simpleCalculator({
      a: 2,
      b: 10,
      action: Action.Exponentiate,
    });
    expect(result).toBe(1024);
    result = simpleCalculator({
      a: 2,
      b: 2,
      action: Action.Exponentiate,
    });
    expect(result).not.toBe(1024);
  });

  test('should return null for invalid action', () => {
    const result = simpleCalculator({ a: 5, b: 10, action: 'sqrt' });
    expect(result).toBeNull();
  });

  test('should return null for invalid arguments', () => {
    const result = simpleCalculator({ a: 'q', b: 10, action: Action.Add });
    expect(result).toBeNull();
  });
});
