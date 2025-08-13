export const validateEmail = (email: string): boolean => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

export const handleLoginLogic = (email: string, password: string): string => {
  if (!validateEmail(email)) {
    return 'Invalid email format';
  }
  
  if (password.length < 6) {
    return 'Invalid password format';
  }
  
  if (email === 'user@example.com' && password === 'password123') {
    return '';
  }
  
  return 'Incorrect credentials';
};