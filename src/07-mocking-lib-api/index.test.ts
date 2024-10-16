// Uncomment the code below and write your tests
import axios from 'axios';
//import lodash from 'lodash';
import { throttledGetDataFromApi } from './index';

describe('throttledGetDataFromApi', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should create instance with provided base url', async () => {
    const baseURL = 'https://jsonplaceholder.typicode.com';
    const url = 'posts';
    const mockCreate = jest.spyOn(axios, 'create');
    //const mockGet = jest.spyOn(axios.Axios.prototype, 'get');
    //const mockThrottle = jest.spyOn(lodash, 'throttle');

    //mockThrottle.mockImplementation((data, timer) => data));

    await throttledGetDataFromApi(url);

    jest.runAllTimers();

    expect(mockCreate).toBeCalledWith({ baseURL: baseURL });
    expect(mockCreate.mock.results[0]?.value.defaults.baseURL).toBe(baseURL);
  });

  test('should perform request to correct provided url', async () => {
    const url = 'posts';
    const mockGet = jest.spyOn(axios.Axios.prototype, 'get');

    await throttledGetDataFromApi(url);

    jest.runAllTimers();

    expect(mockGet).toBeCalledWith(url);
  });

  test('should return response data', async () => {
    // const mockData = {
    //   a: 'test1',
    //   b: 'test2',
    // };
    // const url = 'posts';
    // const mockGet = jest.spyOn(axios.Axios.prototype, 'get');
    // mockGet.mockReturnValue(Promise.resolve({ data: mockData }));
    // const result = await throttledGetDataFromApi(url);
    // jest.runAllTimers();
    // expect(result).toBe(mockData);
  });
});
