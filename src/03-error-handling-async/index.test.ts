// Uncomment the code below and write your tests
import {
  throwError,
  throwCustomError,
  resolveValue,
  MyAwesomeError,
  rejectCustomError,
} from './index';

describe('resolveValue', () => {
  test('should resolve provided value', async () => {
    const testValue = 77;
    const result = await resolveValue(testValue);
    expect(result).toBe(testValue);
  });
});

describe('throwError', () => {
  test('should throw error with provided message', () => {
    const testValue = 'test';
    expect(() => {
      throwError(testValue);
    }).toThrowError(testValue);
  });

  test('should throw error with default message if message is not provided', () => {
    const defaultValue = 'Oops!';
    expect(() => {
      throwError();
    }).toThrowError(defaultValue);
  });
});

describe('throwCustomError', () => {
  test('should throw custom error', () => {
    expect(() => {
      throwCustomError();
    }).toThrowError(new MyAwesomeError());
  });
});

describe('rejectCustomError', () => {
  test('should reject custom error', async () => {
    expect(() => rejectCustomError()).rejects.toThrowError(
      new MyAwesomeError(),
    );
  });
});
