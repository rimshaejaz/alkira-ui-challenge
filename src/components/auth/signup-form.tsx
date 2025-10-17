
"use client";
import { useState } from "react";
import { signup as apiSignup } from "@/lib/auth/authService";
import { validateEmail, validatePasswordStrengthRule } from "@/lib/auth/validate";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

import { Input } from "@/components/ui/input";

export function SignupForm({ ...props }: React.ComponentProps<typeof Card>) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState<"read" | "write" | "">(""); 

  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [passwordChecks, setPasswordChecks] = useState(
    validatePasswordStrengthRule("")
  );

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPassword(value);
    setPasswordChecks(validatePasswordStrengthRule(value));
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setMessage("");

    const normalizedEmail = email.trim().toLowerCase();
    console.log("Normalized email:", normalizedEmail)


    if (!validateEmail(normalizedEmail)) {
      setError("Please enter a valid email.");
      return
    }

    const allPassed = passwordChecks.every((rule) => rule.valid);
    if (!allPassed) {
      setError("Please meet all password requirements.");
      return;
    }

    if (!role) {
      setError("Please select a role.");
      return;
    }

    try {
      const res = await apiSignup(normalizedEmail, password, confirmPassword, role);
      setMessage(res.message);
      setTimeout(() => {
        router.push('/login');
      }, 3000)
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <Card {...props}>
      <CardHeader>
        <CardTitle>Create an account</CardTitle>
        <CardDescription>
          Enter your email and password below to create your account.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSignup} noValidate>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="email">Email</FieldLabel>
              <Input
                id="email"
                type="text"
                placeholder="m@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Field>
            <Field>
              <FieldLabel htmlFor="password">Password</FieldLabel>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={handlePasswordChange}
                required
              />
              <div className="mt-2 space-y-1">
                {passwordChecks.map((rule, idx) => (
                  <p
                    key={idx}
                    className={`text-sm ${rule.valid ? "text-green-600" : "text-red-500"
                      }`}
                  >
                    {rule.label}
                  </p>
                ))}
              </div>
            </Field>
            <Field>
              <FieldLabel htmlFor="confirm-password">Confirm Password</FieldLabel>
              <Input
                id="confirm-password"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
              <FieldDescription>Please confirm your password.</FieldDescription>
            </Field>
            <Field>
              <FieldLabel htmlFor="role">Select Role</FieldLabel>
              <Select onValueChange={(value) => setRole(value as "read" | "write")} value={role}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Choose your role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="read">Read</SelectItem>
                  <SelectItem value="write">Write</SelectItem>
                </SelectContent>
              </Select>
              <FieldDescription>
                “Read” users have limited access, “Write” users have full access.
              </FieldDescription>
            </Field>

            <FieldGroup>
              <Field>
                <Button type="submit" className="cursor-pointer">
                  Create Account
                </Button>
                <FieldDescription className="px-6 text-center">
                  Already have an account? <a href="/login">Log in</a>
                </FieldDescription>
                {error && <p className="text-red-500 mt-2">{error}</p>}
                {message && <p className="text-green-600">{message}</p>}
              </Field>
            </FieldGroup>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  );
}

