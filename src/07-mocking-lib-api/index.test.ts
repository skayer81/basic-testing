import axios, { AxiosResponse } from 'axios';
import { throttledGetDataFromApi } from './index';

type f = (s: string) => AxiosResponse;

jest.mock('lodash', () => {
  const originalModule = jest.requireActual('lodash');
  const fakethrottle = (fn: f) => fn;
  return {
    __esModule: true,
    ...originalModule,
    throttle: jest.fn(fakethrottle),
  };
});

describe('throttledGetDataFromApi', () => {
  test('should create instance with provided base url', async () => {
    const baseURL = 'https://jsonplaceholder.typicode.com';
    const mockCreate = jest.spyOn(axios, 'create');
    const mockGet = jest.spyOn(axios.Axios.prototype, 'get');

    mockGet.mockReturnValue(Promise.resolve({ data: expect.anything() }));

    await throttledGetDataFromApi(expect.any(String));

    expect(mockCreate).toBeCalledWith({ baseURL: baseURL });
    expect(mockCreate.mock.results[0]?.value.defaults.baseURL).toBe(baseURL);
  });

  test('should perform request to correct provided url', async () => {
    const url = 'test URL';
    const mockGet = jest.spyOn(axios.Axios.prototype, 'get');

    mockGet.mockReturnValue(Promise.resolve({ data: expect.anything() }));

    await throttledGetDataFromApi(url);

    expect(mockGet).toBeCalledWith(url);
  });

  test('should return response data', async () => {
    const mockData = {
      a: 'test1',
      b: 'test2',
    };

    const mockGet = jest.spyOn(axios.Axios.prototype, 'get');
    mockGet.mockReturnValue(Promise.resolve({ data: mockData }));

    const result = await throttledGetDataFromApi(expect.any(String));

    expect(result).toEqual(mockData);
  });
});
