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

export const handleSignupLogic = (name: string, email: string, password: string) => {
  const errors: { name?: string; email?: string; password?: string } = {};
  
  if (!name.trim()) errors.name = 'Name is required';
  if (!email.trim()) errors.email = 'Email is required';
  else if (!validateEmail(email)) errors.email = 'Invalid email format';
  if (!password) errors.password = 'Password is required';
  else if (password.length < 6) errors.password = 'Password must be at least 6 characters';
  
  return errors;
};