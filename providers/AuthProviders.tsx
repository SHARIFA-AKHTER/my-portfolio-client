// "use client";
// import { SessionProvider } from "next-auth/react";

// const AuthProviders = ({ children }: { children: React.ReactNode }) => {
//   return <SessionProvider>{children}</SessionProvider>;
// };

// export default AuthProviders;

// "use client";
// import { SessionProvider } from "next-auth/react";

// const AuthProviders = ({ children }: { children: React.ReactNode }) => {
//   return (
//     <SessionProvider 
//       refetchOnWindowFocus={false} 
//       refetchInterval={0}
//     >
//       {children}
//     </SessionProvider>
//   );
// };

// export default AuthProviders;
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useAuth } from "@/app/hooks/useAuth";
import { createContext, useContext } from "react";

const AuthContext = createContext<any>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const auth = useAuth();
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
}

export const useAuthContext = () => useContext(AuthContext);