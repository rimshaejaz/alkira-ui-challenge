// validate user email syntax, password length and strength 
export const validateEmail = (email: string) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

export const validatePassword = (password: string) => {
  return password.length >= 8 && password.length <= 20;
};

// BACKEND CHECK 
export const validatePasswordStrength = (password: string): string | null => {
  if (password.length < 8) return "Password must be at least 8 characters long.";
  if (!/[A-Z]/.test(password)) return "Password must include at least one uppercase letter.";
  if (!/[a-z]/.test(password)) return "Password must include at least one lowercase letter.";
  if (!/[0-9]/.test(password)) return "Password must include at least one number.";
  if (!/[!@#$%^&*()_\-+={}[\]|\\:;"'<>,.?/~`]/.test(password))
    return "Password must include at least one special character.";
  return null; 
};

// FRONTEND CHECK 
export const passwordRules = [
  { label: "At least 8 to 20 characters", test: (password: string) => password.length >= 8 && password.length <= 20 },
  { label: "One uppercase letter", test: (password: string) => /[A-Z]/.test(password) },
  { label: "One lowercase letter", test: (password: string) => /[a-z]/.test(password) },
  { label: "One number", test: (password: string) => /\d/.test(password) },
  { label: "One special character", test: (password: string) => /[!@#$%^&*()_\-+={}[\]|\\:;"'<>,.?/~`]/.test(password) },
];

export const validatePasswordStrengthRule = (password: string) => {
  return passwordRules.map(rule => ({
    label: rule.label,
    valid: rule.test(password),
  }));
};