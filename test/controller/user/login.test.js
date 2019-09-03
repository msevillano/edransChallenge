import User from '../../../src/model/user';
import loginUser from '../../../src/controller/user/login';

test('login(ctx, next): it should validate credentials, create a JWT, then call next()', async () => {
  const testUserData = {
    email: 'tuser@testmail.com',
    password: '123456',
    firstName: 'test',
    lastName: 'user',
    birthDate: '01-01-2000',
    address: 'test address'
  };

  jest.spyOn(User, 'findOne').mockImplementationOnce(() => Promise.resolve(new User(testUserData)));
  jest.spyOn(User.prototype, 'isValidPassword').mockImplementationOnce(() => Promise.resolve(true));

  const ctx = {
    request: {
      body: {userName: testUserData.email, password: testUserData.password}
    }
  };
  const next = jest.fn(() => {});

  await loginUser(ctx, next);

  expect(ctx.body.token).toBeDefined();
});

test('login(ctx, next): it should validate credentials, fail on missing password', async () => {
  const testUserData = {
    email: 'tuser@testmail.com',
    password: '123456',
    firstName: 'test',
    lastName: 'user',
    birthDate: '01-01-2000',
    address: 'test address'
  };

  const ctx = {
    request: {
      body: {userName: testUserData.email}
    }
  };
  const next = jest.fn(() => {});

  let errorMessage, errorCode;
  try {
    await loginUser(ctx, next);
  } catch (e) {
    errorMessage = e.message;
    errorCode = e.httpCode;
  }

  expect(errorCode).toBe(400);
  expect(errorMessage).toBe('password is needed to perform login');
});

test('login(ctx, next): it should validate credentials, fail on missing user', async () => {
  const testUserData = {
    email: 'tuser@testmail.com',
    password: '123456',
    firstName: 'test',
    lastName: 'user',
    birthDate: '01-01-2000',
    address: 'test address'
  };

  jest.spyOn(User, 'findOne').mockImplementationOnce(() => Promise.resolve(null));
  jest.spyOn(User.prototype, 'isValidPassword').mockImplementationOnce(() => Promise.resolve(false));

  const ctx = {
    request: {
      body: {userName: testUserData.email, password: testUserData.password}
    }
  };
  const next = jest.fn(() => {});

  let errorMessage, errorCode;
  try {
    await loginUser(ctx, next);
  } catch (e) {
    errorMessage = e.message;
    errorCode = e.httpCode;
  }

  expect(errorCode).toBe(404);
  expect(errorMessage).toBe('user not found');
});

test('login(ctx, next): it should validate credentials, fail on invalid password', async () => {
  const testUserData = {
    email: 'tuser@testmail.com',
    password: '123456',
    firstName: 'test',
    lastName: 'user',
    birthDate: '01-01-2000',
    address: 'test address'
  };

  jest.spyOn(User, 'findOne').mockImplementationOnce(() => Promise.resolve(new User(testUserData)));
  jest.spyOn(User.prototype, 'isValidPassword').mockImplementationOnce(() => Promise.resolve(true));

  const ctx = {
    request: {
      body: {userName: testUserData.email, password: testUserData.password}
    }
  };
  const next = jest.fn(() => {});

  let errorMessage, errorCode;
  try {
    await loginUser(ctx, next);
  } catch (e) {
    errorMessage = e.message;
    errorCode = e.httpCode;
  }

  expect(errorCode).toBe(403);
  expect(errorMessage).toBe('invalid credentials');
});
