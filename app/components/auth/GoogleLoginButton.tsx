/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useGoogleLogin } from "@react-oauth/google";
import { Button } from "@/components/ui/button";
import { loginWithGoogle } from "@/actions/auth";
import { toast } from "sonner";
import { useState } from "react";
import { Loader2 } from "lucide-react";

export default function GoogleLoginButton() {
  const [loading, setLoading] = useState(false);

  const login = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      setLoading(true);
      try {
   
        const res = await loginWithGoogle(tokenResponse.access_token);
        if (res?.success) {
          toast.success("Login Successful!");
          window.location.replace("/");
        }
      } catch (error: any) {
        toast.error(error.message || "Google Login failed");
      } finally {
        setLoading(false);
      }
    },
    onError: () => toast.error("Google Login Failed"),
  });

  return (
    <Button
      type="button"
      variant="outline"
      disabled={loading}
      onClick={() => login()}
      className="w-full rounded-xl h-11 font-bold"
    >
      {loading ? <Loader2 className="animate-spin h-4 w-4 mr-2" /> : "Google"}
    </Button>
  );
}