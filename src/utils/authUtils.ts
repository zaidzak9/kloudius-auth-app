import { strings } from './strings';

export const validateEmail = (email: string): boolean => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

export const handleLoginLogic = (email: string, password: string): string => {
  if (!validateEmail(email)) {
    return strings.invalidEmailFormat;
  }
  
  if (password.length < 6) {
    return strings.invalidPasswordFormat;
  }
  
  if (email === 'user@example.com' && password === 'password123') {
    return '';
  }
  
  return strings.incorrectCredentials;
};

export const handleSignupLogic = (name: string, email: string, password: string) => {
  const errors: { name?: string; email?: string; password?: string } = {};
  
  if (!name.trim()) errors.name = strings.nameRequired;
  if (!email.trim()) errors.email = strings.emailRequired;
  else if (!validateEmail(email)) errors.email = strings.invalidEmailFormat;
  if (!password) errors.password = strings.passwordRequired;
  else if (password.length < 6) errors.password = strings.passwordMinLength;
  
  return errors;
};