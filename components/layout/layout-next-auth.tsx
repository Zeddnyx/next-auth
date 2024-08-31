"use client";

import { SessionProvider as AuthProvider } from "next-auth/react";

const NextAuthProvider = ({ children }: { children: React.ReactNode }) => {
  return <AuthProvider>{children}</AuthProvider>;
};

export default NextAuthProvider;
