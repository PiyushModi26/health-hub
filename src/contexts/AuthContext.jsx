// src/contexts/AuthContext.jsx
import React, { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";

const Ctx = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    // Check initial session
    supabase.auth.getSession().then(({ data, error }) => {
      if (error) console.error("Get session error:", error.message);
      console.log("Initial session:", data?.session);
      setUser(data?.session?.user ?? null);
      setReady(true);
    });

    // Listen for auth changes
    const { data: sub } = supabase.auth.onAuthStateChange((event, session) => {
      console.log("Auth event:", event, "Session:", session);
      setUser(session?.user ?? null);
    });

    return () => sub.subscription.unsubscribe();
  }, []);

  // SIGNUP
  const signup = async (email, password, fullName) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { full_name: fullName }, // metadata
      },
    });
    if (error) {
      console.error("Signup error:", error.message);
      throw error;
    }
    console.log("Signup success:", data);
    return data.user;
  };

  // LOGIN
  const login = async (email, password) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      console.error("Login error:", error.message);
      throw error;
    }
    console.log("Login success:", data);
    return data.user;
  };

  // LOGOUT
  const logout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) console.error("Logout error:", error.message);
    setUser(null);
  };

  const value = { user, ready, signup, login, logout };
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export const useAuth = () => useContext(Ctx);
