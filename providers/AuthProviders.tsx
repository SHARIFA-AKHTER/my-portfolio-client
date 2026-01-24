// "use client";
// import { SessionProvider } from "next-auth/react";

// const AuthProviders = ({ children }: { children: React.ReactNode }) => {
//   return <SessionProvider>{children}</SessionProvider>;
// };

// export default AuthProviders;

"use client";
import { SessionProvider } from "next-auth/react";

const AuthProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <SessionProvider 
      refetchOnWindowFocus={false} 
      refetchInterval={0}
    >
      {children}
    </SessionProvider>
  );
};

export default AuthProviders;
