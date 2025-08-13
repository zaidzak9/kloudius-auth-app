import { validateEmail, handleLoginLogic } from './authUtils';

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

  test('incorrect credentials', () => {
    expect(handleLoginLogic('wrong@example.com', 'password123')).toBe('Incorrect credentials');
  });
});