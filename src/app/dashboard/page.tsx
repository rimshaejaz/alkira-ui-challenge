
"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/hooks/useAuth";

import { Button } from "@/components/ui/button";

export default function Dashboard() {
  const router = useRouter();
  const { getAuth, logout } = useAuth();
  const [auth, setAuth] = useState(getAuth());

  useEffect(() => {
    const authState = getAuth();
    if (!authState.token || !authState.mfaVerified) {
      router.push("/login");
    } else {
      setAuth(authState);
    }
  }, []);

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  if (!auth.token || !auth.mfaVerified) return <p>Redirecting...</p>;

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Success! Login was verified for {auth.role}</h1>
      {auth.role === "write" ? <Button className="bg-red-700 hover:bg-blue-700 mr-5 mt-5">Edit Content</Button> : <p>Read-only access</p>}
      <Button className="cursor-pointer" onClick={handleLogout}>Logout</Button>
    </div>
  );
}

