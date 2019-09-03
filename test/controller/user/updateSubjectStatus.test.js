import User from '../../../src/model/user';
import updateSubjectStatus from '../../../src/controller/user/updateSubjectStatus';
import mongoose from 'mongoose';
import startSubjects from '../../../src/controller/user/startSubjects';
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
    currentSubjects: [objectId('5d6dfcbacb7f4253b6beb33b')],
    approvedSubjects: [],
    save: () => {},
  };

  jest.spyOn(User, 'findById').mockImplementationOnce(() => Promise.resolve(testUserData));

  const ctx = {
    request: {
      body: {
        subjects:  {
          '5d6dfcbacb7f4253b6beb33b': 2,
          '5d6dfcbacb7f4253b6beb33c': 4
        },
        user: testUserData,
      }
    }
  };
  const next = jest.fn(() => {});

  await updateSubjectStatus(ctx, next);

  expect(next.mock.calls.length).toBe(1);
  expect(ctx.body.currentSubjects.length).toBe(0);
  expect(ctx.body.approvedSubjects.length).toBe(1);
  expect(ctx.body.approvedSubjects[0].grade).toBe(2);
});

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
    currentSubjects: [objectId('5d6dfcbacb7f4253b6beb33b')],
    approvedSubjects: [],
    save: () => {},
  };

  jest.spyOn(User, 'findById').mockImplementationOnce(() => Promise.resolve(testUserData));

  const ctx = {
    request: {
      body: {
        subjects:  {
        },
        user: testUserData,
      }
    }
  };
  const next = jest.fn(() => {});

  let errorMessage, errorCode;
  try {
    await updateSubjectStatus(ctx, next);
  } catch (e) {
    errorMessage = e.message;
    errorCode = e.httpCode;
  }

  expect(errorCode).toBe(400);
  expect(errorMessage).toBe('must provide subjects');
});

