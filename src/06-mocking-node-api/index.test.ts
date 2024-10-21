// Uncomment the code below and write your tests
import path from 'node:path';
import fs from 'fs';
import fsPromises from 'fs/promises';
import { readFileAsynchronously, doStuffByTimeout, doStuffByInterval } from '.';

describe('doStuffByTimeout', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set timeout with provided callback and timeout', () => {
    jest.spyOn(global, 'setTimeout');

    const timeout = 1000;
    const callback = jest.fn();

    doStuffByTimeout(callback, timeout);

    expect(setTimeout).toHaveBeenCalledTimes(1);
    expect(setTimeout).toHaveBeenLastCalledWith(callback, timeout);
  });

  test('should call callback only after timeout', () => {
    jest.spyOn(global, 'setTimeout');

    const timeout = 1000;
    const callback = jest.fn();

    doStuffByTimeout(callback, timeout);

    expect(callback).not.toHaveBeenCalled();

    jest.runAllTimers();

    expect(callback).toHaveBeenCalled();
    expect(callback).toHaveBeenCalledTimes(1);
  });
});

describe('doStuffByInterval', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set interval with provided callback and timeout', () => {
    jest.spyOn(global, 'setInterval');

    const interval = 1000;
    const callback = jest.fn();

    doStuffByInterval(callback, interval);

    expect(setInterval).toHaveBeenCalledTimes(1);
    expect(setInterval).toHaveBeenLastCalledWith(callback, interval);
  });

  test('should call callback multiple times after multiple intervals', () => {
    jest.spyOn(global, 'setInterval');

    const interval = 1000;
    const numberOfRepeat = 5;
    const callback = jest.fn();

    doStuffByInterval(callback, interval);

    expect(callback).not.toHaveBeenCalled();

    for (let i = 1; i <= numberOfRepeat; i += 1) {
      jest.advanceTimersByTime(interval);
      expect(callback).toHaveBeenCalled();
      expect(callback).toHaveBeenCalledTimes(i);
    }
  });
});

describe('readFileAsynchronously', () => {
  test('should call join with pathToFile', async () => {
    const mockJoin = jest.spyOn(path, 'join');
    const fakePathToFile = 'fakePathToFile';
    const wrongFakePathToFile = 'wrongFakePathToFile';

    await readFileAsynchronously(fakePathToFile);

    expect(mockJoin).toHaveBeenCalledTimes(1);
    expect(mockJoin).toBeCalledWith(__dirname, fakePathToFile);
    expect(mockJoin).not.toBeCalledWith(__dirname, wrongFakePathToFile);
  });

  test('should return null if file does not exist', async () => {
    const mockExistsSync = jest.spyOn(fs, 'existsSync');
    const fakePathToFile = 'fakePathToFile';

    mockExistsSync.mockReturnValueOnce(false);
    const result = await readFileAsynchronously(fakePathToFile);

    expect(mockExistsSync).toHaveBeenCalledTimes(1);
    expect(result).toBeNull;
  });

  test('should return file content if file exists', async () => {
    const fakeData = 'fake Data in file';
    const fakePathToFile = 'fakePathToFile';

    const mockExistsSync = jest.spyOn(fs, 'existsSync');
    mockExistsSync.mockReturnValueOnce(true);

    const mockReadFile = jest.spyOn(fsPromises, 'readFile');
    mockReadFile.mockReturnValueOnce(Promise.resolve(fakeData));

    const result = await readFileAsynchronously(fakePathToFile);

    expect(mockReadFile).toHaveBeenCalledTimes(1);
    expect(result).toBe(fakeData);
  });
});
