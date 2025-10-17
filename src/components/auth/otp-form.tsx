
"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, FieldDescription, FieldGroup, FieldLabel } from "@/components/ui/field";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { verifyMFA } from "@/lib/auth/authService";
import { useAuth } from "@/lib/hooks/useAuth";

export function OTPForm({ className, ...props }: React.ComponentProps<"div">) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { login } = useAuth();

  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const emailParam = searchParams.get("email");
    if (!emailParam) router.push("/login"); // redirect if no email
    else setEmail(emailParam);
  }, [searchParams, router]);

  const handleVerifyMFA = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setMessage("")

    // compare hardcoded otp to user input otp 
    try {
      const otpActual = localStorage.getItem("otp");
      const res = await verifyMFA(otp, otpActual || ""); 

      const role = localStorage.getItem("role") || "read"
      login("token", role);

      setMessage(res.message)
      setTimeout(()=> {
        router.push("/dashboard");
      }, 2000)
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>Enter verification code</CardTitle>
          <CardDescription>We sent a 6-digit code to {email}</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleVerifyMFA}>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="otp">Verification code</FieldLabel>
                <InputOTP maxLength={6} id="otp" required value={otp} onChange={(value: string) => setOtp(value)}>
                  <InputOTPGroup className="gap-2.5 *:data-[slot=input-otp-slot]:rounded-md *:data-[slot=input-otp-slot]:border">
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                    <InputOTPSlot index={3} />
                    <InputOTPSlot index={4} />
                    <InputOTPSlot index={5} />
                  </InputOTPGroup>
                </InputOTP>
                <FieldDescription>Enter the 6-digit code sent to your email.</FieldDescription>
              </Field>
              <Field>
                <Button type="submit">Verify OTP</Button>
                <FieldDescription className="text-center">
                  <a className="mr-4" href="/login">Log in</a>
                  <a href="/signup">Sign up</a>
                </FieldDescription>
                {error && <p className="text-red-500 mt-2">{error}</p>}
                {message && <p className="text-green-600">{message}</p>}
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
