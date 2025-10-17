import { validatePasswordStrength, validateEmail } from "@/lib/auth/validate";

type User = {
  email: string;
  password: string;
  role: "read" | "write"
};

export const mockUsers: User[] = [
  { email: "user.1@gmail.com", password: "12345678", role: "write" },
  { email: "user.2@gmail.com", password: "12345678", role: "read" }
];

// LOGIN 
export const login = async (email: string, password: string) => {
  const user = mockUsers.find(u => u.email === email);
  if (!user) {
    throw new Error("The email is not in system. Please try a different email or sign up.");
  }

  if (user.password !== password) {
    throw new Error("Incorrect password entered. Please try again.")
  }

  const token = "token"

  return { token, role: user.role, message: "Log in successful. Redirecting to MFA..." };
};

// MFA OTP CODE
export const sendMFA = async (email: string) => {
  let num = 123456
  const otp = num.toString();
  localStorage.setItem("otp", otp)
  console.log(`OTP Code for ${email}: ${otp}`);
  return otp;
};

// MFA VERIFICATION
export const verifyMFA = async (otpInput: string, otpActual: string) => {
  if (otpInput !== otpActual) {
    console.log(`Invalid OTP entered by user: ${otpInput}`)
    throw new Error("Invalid OTP code entered. A new code has been sent to your email.");
  } 
  return { message: "Success. Redirecting to Dashboard..." };;
};

// RESET PASSWORD 
export const resetPassword = async (email: string) => {

  const user = mockUsers.find(u => u.email === email);
  if (!user) {
    throw new Error("Email not found. Please sign up first.");
  }
  console.log(`Password reset link sent to: ${email}`);

  return { message: "Success! Password reset link has been sent to your email." };
};


// SIGNUP 
export const signup = async (email: string, password: string, confirmPassword: string, role: "read" | "write"
) => {

  const existingUser = mockUsers.find((u) => u.email === email);
  if (existingUser) {
    throw new Error("This email is already in use. Please log in or use a new email.");
  }

  if (!validateEmail(email)) {
    throw new Error("Please enter a valid email address.");
  }

  const passwordStrengthError = validatePasswordStrength(password)
  if (passwordStrengthError) {
    throw new Error(passwordStrengthError)
  }

  if (password !== confirmPassword) {
    throw new Error("Passwords do not match.");
  }

  console.log(`new user email: ${email} and role: ${role}`)
  mockUsers.push({ email, password, role });

  return { message: "Sign up successful! Redirecting to log in." };
};
