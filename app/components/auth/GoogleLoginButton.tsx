/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { GoogleLogin } from "@react-oauth/google";
import { loginWithGoogle } from "@/actions/auth";
import { toast } from "sonner";
import { useState } from "react";
import { Loader2 } from "lucide-react";

export default function GoogleLoginButton() {
  const [loading, setLoading] = useState(false);

  const handleSuccess = async (credentialResponse: any) => {
    setLoading(true);
    try {
      const res = await loginWithGoogle(credentialResponse.credential);
      if (res?.success) {
        toast.success("Login Successful!");
        window.location.replace("/");
      }
    } catch (error: any) {
      toast.error(error.message || "Google Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (

    <div className="w-full max-w-full sm:max-w-md lg:max-w-lg mx-auto flex justify-center min-h-11">
      {loading ? (
        <Loader2 className="animate-spin h-6 w-6 text-blue-600 self-center" />
      ) : (
        <div className="w-full flex justify-center overflow-hidden">
          <GoogleLogin
            onSuccess={handleSuccess}
            onError={() => toast.error("Google Login Failed")}
            useOneTap
            shape="pill" 
            theme="outline"
            size="large"
            width="100%" 
          />
        </div>
      )}
    </div>
  );
}