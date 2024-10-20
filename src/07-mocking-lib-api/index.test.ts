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
  afterAll(() => {
    jest.unmock('lodash');
    jest.unmock('axios');
  });

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
    const testurl = 'test URL';
    const testurl2 = 'test URL2';
    const mockGet = jest.spyOn(axios.Axios.prototype, 'get');

    mockGet.mockReturnValue(Promise.resolve({ data: expect.anything() }));

    await throttledGetDataFromApi(testurl);

    expect(mockGet).toBeCalledWith(testurl);

    await throttledGetDataFromApi(testurl2);

    expect(mockGet).toBeCalledWith(testurl2);
  });

  test('should return response data', async () => {
    const mockData = {
      a: 'test1',
      b: 'test2',
    };
    const mockData2 = {
      c: 'test3',
      d: 'test4',
    };

    const mockGet = jest.spyOn(axios.Axios.prototype, 'get');

    mockGet.mockReturnValue(Promise.resolve({ data: mockData }));

    let result = await throttledGetDataFromApi(expect.any(String));

    expect(result).toEqual(mockData);

    mockGet.mockReturnValue(Promise.resolve({ data: mockData2 }));

    result = await throttledGetDataFromApi(expect.any(String));

    expect(result).toEqual(mockData2);
  });
});
