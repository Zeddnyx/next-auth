"use client";
import { signOut } from "next-auth/react";

export default function ButtonSignOut() {
  // NOTE: where this component is used, that component must be server component
  const handleOut = () => {
    console.log("handleOut run");
    signOut({ callbackUrl: "/sign-in" });
  };
  return (
    <button onClick={() => handleOut()} style={{ cursor: "pointer" }}>
      Sign Out
    </button>
  );
}
