import status from '../../src/controller/status';

test('status(ctx, next): it should set the body, then call next()', async () => {
  const ctx = {};
  const next = jest.fn(() => {});

  await status(ctx, next);

  expect(ctx.body.health).toBe('ok');
  expect(next.mock.calls.length).toBe(1);
});
