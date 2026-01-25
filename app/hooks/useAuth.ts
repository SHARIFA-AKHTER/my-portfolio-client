/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";

export const useAuth = () => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = Cookies.get("token");
    if (token) {
    
      setUser({ loggedIn: true }); 
    }
    setLoading(false);
  }, []);

  return { user, loading, setUser };
};