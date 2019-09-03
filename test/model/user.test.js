import User from '../../src/model/user';

test('hashPassword(password): it should hash the given password then append it to user', async () => {
  const testUser = new User({});
  await testUser.hashPassword('testPassword');

  expect(testUser.password).toBeDefined();
  expect(testUser.password === 'testPassword').toBeFalsy();
});

test('isValidPassword(password): it should return true on valid password', async () => {
  const testUser = new User({});
  await testUser.hashPassword('testPassword');

  const result = await testUser.isValidPassword('testPassword');
  expect(result).toBeTruthy();
});

test('isValidPassword(password): it should return false on invalid password', async () => {
  const testUser = new User({});
  await testUser.hashPassword('testPassword');

  const result = await testUser.isValidPassword('testPassword1');
  expect(result).toBeFalsy();
});
