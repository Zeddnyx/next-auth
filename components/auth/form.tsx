"use client";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { authCredentials } from "@/configs/credentials"; import { useLoading } from "../layout/layout-loading";
import styles from "@/styles/modules/auth.module.css";

export default function Form({ page }: { page: "sigin" | "signup" }) {
  const [form, setForm] = useState({ email: "", password: "", name: "" });
  const { setLoading, clearLoading } = useLoading();

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    if (!form.email || !form.password) return;
    setLoading();
    try {
      if (page === "sigin")
        await signIn(authCredentials.signIn, {
          email: form.email,
          password: form.password,
          redirect: false,
        }).then((res) => {
          if (res?.ok) {
            window.location.href = "/verify";
          }
        });
      else
        await signIn(authCredentials.signUp, {
          name: form.name,
          email: form.email,
          password: form.password,
          redirect: false,
        }).then((res) => {
          if (res?.ok) {
            window.location.href = "/sign-in";
          }
        });
    } catch (error) {
      console.error("Error during sign up:", error);
    } finally {
      clearLoading();
    }
  };

  const handleGoogle = () => {
    signIn("google", { callbackUrl: "/" });
  };

  return (
    <div className={styles.sign_parent}>
      <form className={styles.sign_form} onSubmit={handleSubmit}>
        {page === "signup" && (
          <input
            type="text"
            name="name"
            placeholder="name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            minLength={4}
          />
        )}
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
          minLength={6}
          maxLength={20}
        />

        <button type="submit">Submit</button>
      </form>
      <button className="google" type="button" onClick={handleGoogle}>
        Google
      </button>
    </div>
  );
}
