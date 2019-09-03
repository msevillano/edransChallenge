import User from '../../../src/model/user';
import startSubjects from '../../../src/controller/user/startSubjects';
import mongoose from 'mongoose';
const objectId = mongoose.Types.ObjectId;

test('startSubjects(ctx, next): it should append new signatures of the career to user', async () => {
  const testUserData = {
    _id: '5d6db9badf459c483809500e',
    email: 'tuser@testmail.com',
    password: '123456',
    firstName: 'test',
    lastName: 'user',
    birthDate: '01-01-2000',
    address: 'test address',
    career: {
      subjects : [objectId('5d6dfcbacb7f4253b6beb33b')],
      name : 'Bachelor in Maths',
    },
    currentSubjects: [],
    save: () => {},
  };

  jest.spyOn(User, 'findWithCareer').mockImplementationOnce(() => Promise.resolve(testUserData));

  const ctx = {
    request: {
      body: {
        subjects: [
          '5d6dfcbacb7f4253b6beb33b',
          '5d6dfcbacb7f4253b6beb33c',
        ],
        user: testUserData,
      }
    }
  };
  const next = jest.fn(() => {});

  await startSubjects(ctx, next);

  expect(next.mock.calls.length).toBe(1);
  expect(ctx.body.currentSubjects.length).toBe(1);

});

test('startSubjects(ctx, next): it should fail if user does not have a career', async () => {
  const testUserData = {
    _id: '5d6db9badf459c483809500e',
    email: 'tuser@testmail.com',
    password: '123456',
    firstName: 'test',
    lastName: 'user',
    birthDate: '01-01-2000',
    address: 'test address',
    currentSubjects: [],
    save: () => {},
  };

  jest.spyOn(User, 'findWithCareer').mockImplementationOnce(() => Promise.resolve(testUserData));

  const ctx = {
    request: {
      body: {
        subjects: [
          '5d6dfcbacb7f4253b6beb33b',
          '5d6dfcbacb7f4253b6beb33c',
        ],
        user: testUserData,
      }
    }
  };
  const next = jest.fn(() => {});

  let errorMessage, errorCode;
  try {
    await startSubjects(ctx, next);
  } catch (e) {
    errorMessage = e.message;
    errorCode = e.httpCode;
  }

  expect(errorCode).toBe(400);
  expect(errorMessage).toBe('user must have a career before starting subjects');

});

test('startSubjects(ctx, next): it should fail if subjects not given', async () => {
  const testUserData = {
    _id: '5d6db9badf459c483809500e',
    email: 'tuser@testmail.com',
    password: '123456',
    firstName: 'test',
    lastName: 'user',
    birthDate: '01-01-2000',
    address: 'test address',
    career: {
      subjects : [objectId('5d6dfcbacb7f4253b6beb33b')],
      name : 'Bachelor in Maths',
    },
    currentSubjects: [],
    save: () => {},
  };

  jest.spyOn(User, 'findWithCareer').mockImplementationOnce(() => Promise.resolve(testUserData));

  const ctx = {
    request: {
      body: {
        user: testUserData,
      }
    }
  };
  const next = jest.fn(() => {});

  let errorMessage, errorCode;
  try {
    await startSubjects(ctx, next);
  } catch (e) {
    errorMessage = e.message;
    errorCode = e.httpCode;
  }

  expect(errorCode).toBe(400);
  expect(errorMessage).toBe('must provide subjects');

});
