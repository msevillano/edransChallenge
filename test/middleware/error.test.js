import errorHandler from '../../src/middleware/error';

test('errorHandler(ctx, next): it should execute next correctly', async () => {
  const ctx = {};
  const next = jest.fn(() => {});

  await errorHandler(ctx, next);

  expect(next.mock.calls.length).toBe(1);
});

test('errorHandler(ctx, next): it should execute next correctly', async () => {
  const ctx = {};
  const next = jest.fn(async () => {
    const error = new Error();
    error.status = 400;
    error.message = 'userError';
    throw error;
  });

  await errorHandler(ctx, next);

  expect(ctx.status).toBe(400);
  expect(ctx.body).toBe('userError');
  expect(next.mock.calls.length).toBe(1);
});

test('errorHandler(ctx, next): it should execute next correctly', async () => {
  const ctx = {};
  const next = jest.fn(async () => {
    throw new Error();
  });

  await errorHandler(ctx, next);

  expect(ctx.status).toBe(500);
  expect(ctx.body).toBe('internal server error');
  expect(next.mock.calls.length).toBe(1);
});
