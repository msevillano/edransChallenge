import httpError from '../../src/utils/httpError';

test('httpError(errorCode, errorMessage): it should create an httpError', async () => {
  const testError = httpError(400, 'testMessage');

  expect(testError.httpCode).toBe(400);
  expect(testError.message).toBe('testMessage');
});
