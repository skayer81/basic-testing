// Uncomment the code below and write your tests
import { generateLinkedList } from './index';

//import { generateLinkedList } from '08-snapshot-testing';

describe('generateLinkedList', () => {
  // Check match by expect(...).toStrictEqual(...)
  test('should generate linked list from values 1', () => {
    const mokArr = [1, 2, 3, 4, 5];
    const mokList = {
      value: 1,
      next: {
        value: 2,
        next: {
          value: 3,
          next: {
            value: 4,
            next: { value: 5, next: { value: null, next: null } },
          },
        },
      },
    };
    expect(generateLinkedList(mokArr)).toStrictEqual(mokList);
  });

  // Check match by comparison with snapshot
  test('should generate linked list from values 2', () => {
    const mokArr = [1, 2, 3, 4, 5];
    const tree = generateLinkedList(mokArr);
    expect(tree).toMatchSnapshot();
  });
});
