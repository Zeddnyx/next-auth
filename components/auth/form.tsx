"use client";
import { authCredentials } from "@/configs/credentials";
import { signIn } from "next-auth/react";
import { useState } from "react";

export default function Form() {
  const [form, setForm] = useState({ email: "", password: "" });

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    try {
      await signIn(authCredentials.signIn, {
        email: form.email,
        password: form.password,
        redirect: false,
      });
    } catch (error) {
      console.error("Error during sign in:", error);
    }
  };

  const handleGoogle = () => {
    signIn("google", { callbackUrl: "/" });
  };

  return (
    <div style={{ display: "grid" }}>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />

        <button type="submit">Sign in</button>
      </form>
      <button type="button" onClick={handleGoogle}>
        Google
      </button>
    </div>
  );
}
