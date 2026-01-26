/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
import { Button } from "@/components/ui/button";
import { loginWithFacebook } from "@/actions/auth";
import { toast } from "sonner";
import { useState } from "react";
import { Loader2, Facebook } from "lucide-react";

export default function FacebookLoginButton() {
  const [loading, setLoading] = useState(false);

  const responseFacebook = async (response: any) => {
    if (!response.accessToken) {
      toast.error("Facebook Login Failed");
      return;
    }

    setLoading(true);
    try {
      const res = await loginWithFacebook(response.accessToken, {
        name: response.name,
        email: response.email,
        image: response.picture?.data?.url
      });

      if (res?.success) {
        toast.success("Login Successful!");
        window.location.replace("/");
      }
    } catch (error: any) {
      toast.error(error.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-full sm:max-w-md lg:max-w-lg mx-auto">
      <FacebookLogin
        appId={process.env.NEXT_PUBLIC_FACEBOOK_CLIENT_ID || ""}
        autoLoad={false}
        fields="name,email,picture"
        callback={responseFacebook}
        render={(renderProps: any) => (
          <Button
            type="button"
            variant="outline"
            disabled={loading}
            onClick={renderProps.onClick}
         
            className="w-full rounded-full h-11 font-bold text-[#1877F2] border-slate-200 dark:border-slate-800 transition-all hover:bg-slate-50 dark:hover:bg-slate-900"
          >
            {loading ? (
              <Loader2 className="animate-spin h-4 w-4 mr-2" />
            ) : (
              <div className="flex items-center justify-center">
                <Facebook size={18} className="mr-2" />
                <span className="text-sm sm:text-base">Facebook</span>
              </div>
            )}
          </Button>
        )}
      />
    </div>
  );
}