"use client";
import { signIn } from "next-auth/react";
import { useState } from "react";

import { authCredentials } from "@/configs/credentials";
import { useLoading } from "../layout/layout-loading";

export default function Form() {
  const [form, setForm] = useState({ email: "", password: "" });
  const { setLoading, clearLoading } = useLoading();

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    if (!form.email || !form.password) return;
    setLoading();
    try {
      await signIn(authCredentials.signIn, {
        email: form.email,
        password: form.password,
        redirect: false,
      }).then((res) => {
        if (res?.ok) {
          window.location.href = "/";
        }
      });
    } catch (error) {
      console.error("Error during sign in:", error);
    } finally {
      clearLoading();
    }
  };

  const handleGoogle = () => {
    signIn("google", { callbackUrl: "/" });
  };

  return (
    <div className="sign_parent">
      <form className="sign_form" onSubmit={handleSubmit}>
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
          minLength={6}
          maxLength={20}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />

        <button type="submit">Submit</button>
      </form>
      <button className="google" type="button" onClick={handleGoogle}>
        Google
      </button>
    </div>
  );
}
