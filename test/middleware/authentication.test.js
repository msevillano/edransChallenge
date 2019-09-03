import authenticationHandler from '../../src/middleware/authentication';

test('authenticationHandler(ctx, next): it should append user data to the body', async () => {
  const ctx = {
    request: {
      header: {
        authorization : 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpbmZvIjoiZGF0YSIsImluZm8yIjoyLCJpYXQiOjE1Nj' +
          'c0NzA1MjN9.JbvxULSJA_2RCPP6Ff4pvestLsYL6tjvtEQiVTLz5AY',
      },
      body: {},
    }
  };
  const next = jest.fn(() => {});

  await authenticationHandler(ctx, next);

  expect(ctx.request.body.user).toBeDefined();
  expect(next.mock.calls.length).toBe(1);
});

test('authenticationHandler(ctx, next): it should fail with 403 if token is invalid', async () => {
  const ctx = {
    request: {
      header: {
        authorization : 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpbmZvIjoiZGF0YSIsImluZm8yIjoyLCJpYXQiOjE1Nj' +
          'c0NzA1MjN9.JbvxULSJA_2RCPP6Ff4pvestLsYL6tjvtEQiVTLz6AY',
      },
      body: {},
    }
  };
  const next = jest.fn(() => {});

  let errorMessage, errorCode;
  try {
    await authenticationHandler(ctx, next);
  } catch (e) {
    errorMessage = e.message;
    errorCode = e.httpCode;
  }

  expect(errorCode).toBe(403);
  expect(errorMessage).toBe('invalid token');
});
