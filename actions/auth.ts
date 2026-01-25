// /* eslint-disable @typescript-eslint/no-explicit-any */
// import { FieldValues } from "react-hook-form";

// export const registerUser = async (data: FieldValues) => {
//   try {
//     const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/user`, {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(data),
//     });

//     if (!res.ok) {
//       const text = await res.text();
//       throw new Error(text || "Registration failed");
//     }

//     const result = await res.json();
//     return result;
//   } catch (err: any) {
//     console.error("Register Error:", err);
//     throw err;
//   }
// };

// // Login
// export const loginUser = async (data: FieldValues) => {
//   try {
//     const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/auth/login`, {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(data),
//     });

//     if (!res.ok) {
//       const text = await res.text();
//       throw new Error(text || "Login failed");
//     }

//     const result = await res.json();

//     if (result?.success && result?.token && result?.user) {
//       // Save token and user info client-side
//       document.cookie = `token=${result.token}; path=/;`;
//       localStorage.setItem("user", JSON.stringify(result.user));
//     }

//     return result;
//   } catch (err: any) {
//     console.error("Login Error:", err);
//     throw err;
//   }
// };

// export const loginWithGoogle = async (googleToken: string) => {
//   try {
//     const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/auth/google-login`, {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ 
//         token: googleToken 
//       }),
//     });

//     const result = await res.json();

//     if (!res.ok) {
//       throw new Error(result.message || "Google Login failed");
//     }

//     if (result?.success) {
//       document.cookie = `token=${result.token}; path=/;`; 
//       localStorage.setItem("user", JSON.stringify(result.user));
//     }

//     return result;
//   } catch (err: any) {
//     console.error("Google Login Error:", err);
//     throw err;
//   }
// };
// // --- Facebook Login
// export const loginWithFacebook = async (accessToken: string, userDetails: any) => {
//   try {
//     const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/auth/facebook-login`, {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ 
//         accessToken: accessToken, 
//         email: userDetails.email,
//         name: userDetails.name,   
//         image: userDetails.image  
//       }),
//     });

//     if (!res.ok) {
//       const errorData = await res.json();
//       throw new Error(errorData.message || "Facebook Login failed");
//     }

//     const result = await res.json();

//     if (result?.success) {

//       document.cookie = `token=${result.token}; path=/;`; 
//       localStorage.setItem("user", JSON.stringify(result.user));
//     }

//     return result;
//   } catch (err: any) {
//     console.error("Facebook Login Error:", err);
//     throw err;
//   }
// };



/* eslint-disable @typescript-eslint/no-explicit-any */
import { FieldValues } from "react-hook-form";

const BASE_API = process.env.NEXT_PUBLIC_BASE_API;

 
const saveAuthData = (token: string, user: any) => {
  if (typeof window !== "undefined") {

    const expires = new Date();
    expires.setDate(expires.getDate() + 3);
    document.cookie = `token=${token}; path=/; expires=${expires.toUTCString()}; SameSite=Lax;`;
    

    localStorage.setItem("user", JSON.stringify(user));
  }
};

export const registerUser = async (data: FieldValues) => {
  try {
    const res = await fetch(`${BASE_API}/user`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const result = await res.json();
    if (!res.ok) throw new Error(result.message || "Registration failed");
    return result;
  } catch (err: any) {
    console.error("Register Error:", err);
    throw err;
  }
};


export const loginUser = async (data: FieldValues) => {
  try {
    const res = await fetch(`${BASE_API}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const result = await res.json();
    if (!res.ok) throw new Error(result.message || "Login failed");

    if (result?.success && result?.token) {
      saveAuthData(result.token, result.user);
    }
    return result;
  } catch (err: any) {
    console.error("Login Error:", err);
    throw err;
  }
};


export const loginWithGoogle = async (googleToken: string) => {
  try {
    const res = await fetch(`${BASE_API}/auth/google-login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token: googleToken }),
    });

    const result = await res.json();
    if (!res.ok) throw new Error(result.message || "Google Login failed");

    if (result?.success && result?.token) {
      saveAuthData(result.token, result.user);
    }
    return result;
  } catch (err: any) {
    console.error("Google Login Error:", err);
    throw err;
  }
};

export const loginWithFacebook = async (accessToken: string, userDetails: any) => {
  try {
    const res = await fetch(`${BASE_API}/auth/facebook-login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ 
        accessToken, 
        email: userDetails?.email,
        name: userDetails?.name,   
        image: userDetails?.image  
      }),
    });

    const result = await res.json();
    if (!res.ok) throw new Error(result.message || "Facebook Login failed");

    if (result?.success && result?.token) {
      saveAuthData(result.token, result.user);
    }
    return result;
  } catch (err: any) {
    console.error("Facebook Login Error:", err);
    throw err;
  }
};
