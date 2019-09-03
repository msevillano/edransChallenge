import User from '../../../src/model/user';
import Career from '../../../src/model/career';
import setCareer from '../../../src/controller/user/setCareer';

test('setCareer(ctx, next): it should set the field career of the user with the given career', async () => {
  const testUserData = {
    _id: '5d6db9badf459c483809500e',
    email: 'tuser@testmail.com',
    password: '123456',
    firstName: 'test',
    lastName: 'user',
    birthDate: '01-01-2000',
    address: 'test address',
    career: '5d6da738a971e24160faefc2',
  };

  jest.spyOn(User, 'findOneAndUpdate')
    .mockImplementationOnce(() => Promise.resolve(testUserData));
  jest.spyOn(Career, 'findById')
    .mockImplementationOnce(() => Promise.resolve({
      _id: '5d6da738a971e24160faefc3',
      name: 'Bachelor in tests',
      subjects: ['5d6da6499c6b984133b6cb15']
    }));

  const ctx = {
    request: {
      body: {careerId: '5d6da738a971e24160faefc3',
      user: testUserData,
      }
    }
  };
  const next = jest.fn(() => {});

  await setCareer(ctx, next);

  expect(next.mock.calls.length).toBe(1);
  expect(ctx.body.oldCareer).toBeDefined();
  expect(ctx.body.career).toBeDefined();
});

test('setCareer(ctx, next): it should fail if cannot find the career on the db', async () => {
  const testUserData = {
    _id: '5d6db9badf459c483809500e',
    email: 'tuser@testmail.com',
    password: '123456',
    firstName: 'test',
    lastName: 'user',
    birthDate: '01-01-2000',
    address: 'test address',
    career: '5d6da738a971e24160faefc2',
  };

  jest.spyOn(User, 'findOneAndUpdate')
    .mockImplementationOnce(() => Promise.resolve(testUserData));
  jest.spyOn(Career, 'findById')
    .mockImplementationOnce(() => Promise.resolve(null));

  const ctx = {
    request: {
      body: {careerId: '5d6da738a971e24160faefc3',
        user: testUserData,
      }
    }
  };
  const next = jest.fn(() => {});

  let errorMessage, errorCode;
  try {
    await setCareer(ctx, next);
  } catch (e) {
    errorMessage = e.message;
    errorCode = e.httpCode;
  }

  expect(errorCode).toBe(404);
  expect(errorMessage).toBe('career not found');
});
