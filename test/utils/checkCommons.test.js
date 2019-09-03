import checkCommons from '../../src/utils/checkCommons';

test('checkCommons(arr1, arr2): it should return the common elements of both arrays', async () => {
  const result = checkCommons([5,8,3,9,2,1], [3,2,7,4]);

  expect(result[0]).toBe(3);
  expect(result[1]).toBe(2);
});
