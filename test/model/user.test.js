import User from '../../src/model/user';

test('hashPassword(password): it should hash the given password then append it to user', async () => {
  const testUser = new User({});
  await testUser.hashPassword('testPassword');

  expect(testUser.password).toBeDefined();
  expect(testUser.password === 'testPassword').toBeFalsy();
});
