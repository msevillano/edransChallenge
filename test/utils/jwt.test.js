import {createSignedToken, getDataFromToken} from '../../src/utils/jwt';

test('createSignedToken(data): it should create a jsonWebToken', async () => {
  const result = createSignedToken({info: 'data', info2: 2});

  expect(typeof result).toBe('string');
});

test('getDataFromToken(data): it should decode a jsonWebToken', async () => {
  const testToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpbmZvIjoiZGF0YSIsImluZm8yIjoyLCJpYXQiOjE1Njc0NzA1MjN9.' +
    'JbvxULSJA_2RCPP6Ff4pvestLsYL6tjvtEQiVTLz5AY';

  const result = await getDataFromToken(testToken);

  expect(result.info).toBe('data');
  expect(result.info2).toBe(2);
});

test('getDataFromToken(data): it should fail on an invalid token', async () => {
  const testToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpbmZvIjoiZGF0YSIsImluZm8yIjoyLCJpYXQiOjE1Njc0NzA1MjN9.' +
    'JbvxULSJA_2RCPP6Ff4pvestLsYL5tjvtEQiVTLz5AY';

  let name, message;
  try {
    await getDataFromToken(testToken);
  } catch (e) {
    name = e.name;
    message = e.message;
  }
  
  expect(name).toBe('JsonWebTokenError');
  expect(message).toBe('invalid signature');
});
