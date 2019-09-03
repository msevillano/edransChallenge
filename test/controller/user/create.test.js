import User from '../../../src/model/user';
import createUser from '../../../src/controller/user/create';

test('create(ctx, next): it should create an user on DB returning its _id, then call next()', async () => {
  const testUserData = {
    email: 'tuser@testmail.com',
    password: '123456',
    firstName: 'test',
    lastName: 'user',
    birthDate: '01-01-2000',
    address: 'test address'
  };

  jest.spyOn(User.prototype, 'save').mockImplementationOnce(() => Promise.resolve({...testUserData,}));

  const ctx = {
    request: {
      body: testUserData
    }
  };
  const next = jest.fn(() => {});

  await createUser(ctx, next);

  expect(ctx.body.id).toBeDefined();
  expect(ctx.body.userName).toBe('tuser@testmail.com');
});

test('create(ctx, next): it should fail because duplicated user', async () => {
  const testUserData = {
    email: 'tuser@testmail.com',
    password: '123456',
    firstName: 'test',
    lastName: 'user',
    birthDate: '01-01-2000',
    address: 'test address'
  };

  jest.spyOn(User.prototype, 'save').mockImplementationOnce(() => Promise.reject({
      name: 'MongoError',
      code: 11000,
    }));

  const ctx = {
    request: {
      body: testUserData
    }
  };
  const next = jest.fn(() => {});

  let errorMessage, errorCode;
  try {
    await createUser(ctx, next);
  } catch (e) {
    errorMessage = e.message;
    errorCode = e.httpCode;
  }

  expect(errorCode).toBe(409);
  expect(errorMessage).toBe('email already in use');
});

test('create(ctx, next): it should fail because parameter validation', async () => {
  const testUserData = {
    email: 'tuser@testmail.com',
    password: '123456',
    firstName: 'test',
    lastName: 'user',
    birthDate: '01-01-2000',
    address: 'test address'
  };

  jest.spyOn(User.prototype, 'save').mockImplementationOnce(() => Promise.reject({
      name: 'ValidationError',
    }));

  const ctx = {
    request: {
      body: testUserData
    }
  };
  const next = jest.fn(() => {});

  let errorMessage, errorCode;
  try {
    await createUser(ctx, next);
  } catch (e) {
    errorMessage = e.message;
    errorCode = e.httpCode;
  }

  expect(errorCode).toBe(400);
  expect(errorMessage).toBe('all required properties must be fulfilled');
});

test('create(ctx, next): it should fail wit an unknown error', async () => {
  const testUserData = {
    email: 'tuser@testmail.com',
    password: '123456',
    firstName: 'test',
    lastName: 'user',
    birthDate: '01-01-2000',
    address: 'test address'
  };

  jest.spyOn(User.prototype, 'save').mockImplementationOnce(() => Promise.reject({
      name: 'unknownError',
    }));

  const ctx = {
    request: {
      body: testUserData
    }
  };
  const next = jest.fn(() => {});

  let errorMessage;
  try {
    await createUser(ctx, next);
  } catch (e) {
    errorMessage = e.name;
  }

  expect(errorMessage).toBe('unknownError');
});
