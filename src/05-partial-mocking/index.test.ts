// Uncomment the code below and write your tests
import { mockOne, mockTwo, mockThree, unmockedFunction } from './index';

jest.mock('./index', () => {
  const originalModule = jest.requireActual('./index');
  const emptyFn = () => {
    return;
  };
  return {
    __esModule: true,
    ...originalModule,
    mockOne: jest.fn(emptyFn),
    mockTwo: jest.fn(emptyFn),
    mockThree: jest.fn(emptyFn),
  };
});

describe('partial mocking', () => {
  afterAll(() => {
    jest.unmock('./index');
  });

  test('mockOne, mockTwo, mockThree should not log into console', () => {
    const logSpy = jest.spyOn(console, 'log');

    mockOne();
    mockTwo();
    mockThree();
    expect(logSpy).toBeCalledTimes(0);

    logSpy.mockRestore();
  });

  test('unmockedFunction should log into console', () => {
    const logSpy = jest.spyOn(console, 'log');

    unmockedFunction();
    expect(logSpy).toBeCalledTimes(1);
    expect(logSpy).toHaveBeenCalledWith('I am not mocked');
    logSpy.mockRestore();
  });
});
