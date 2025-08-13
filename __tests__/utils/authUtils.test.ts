import { validateEmail, handleLoginLogic, handleSignupLogic } from '../../src/utils/authUtils';

describe('validateEmail', () => {
  test('valid email', () => {
    expect(validateEmail('user@example.com')).toBe(true);
  });

  test('invalid email without @', () => {
    expect(validateEmail('userexample.com')).toBe(false);
  });

  test('invalid email without domain', () => {
    expect(validateEmail('user@')).toBe(false);
  });
});

describe('handleLoginLogic', () => {
  test('valid credentials', () => {
    expect(handleLoginLogic('user@example.com', 'password123')).toBe('');
  });

  test('invalid email format', () => {
    expect(handleLoginLogic('invalid-email', 'password123')).toBe('Invalid email format');
  });

  test('invalid password format', () => {
    expect(handleLoginLogic('user@example.com', '123')).toBe('Invalid password format');
  });

  test('any valid email and password', () => {
    expect(handleLoginLogic('test@example.com', 'validpass')).toBe('');
  });
});

describe('handleSignupLogic', () => {
  test('valid signup data', () => {
    expect(handleSignupLogic('John Doe', 'john@example.com', 'password123')).toEqual({});
  });

  test('missing name', () => {
    expect(handleSignupLogic('', 'john@example.com', 'password123')).toEqual({
      name: 'Name is required'
    });
  });

  test('missing email', () => {
    expect(handleSignupLogic('John Doe', '', 'password123')).toEqual({
      email: 'Email is required'
    });
  });

  test('invalid email format', () => {
    expect(handleSignupLogic('John Doe', 'invalid-email', 'password123')).toEqual({
      email: 'Invalid email format'
    });
  });

  test('missing password', () => {
    expect(handleSignupLogic('John Doe', 'john@example.com', '')).toEqual({
      password: 'Password is required'
    });
  });

  test('short password', () => {
    expect(handleSignupLogic('John Doe', 'john@example.com', '123')).toEqual({
      password: 'Password must be at least 6 characters'
    });
  });

  test('multiple validation errors', () => {
    expect(handleSignupLogic('', 'invalid-email', '123')).toEqual({
      name: 'Name is required',
      email: 'Invalid email format',
      password: 'Password must be at least 6 characters'
    });
  });
});