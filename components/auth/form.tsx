"use client";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { authCredentials } from "@/configs/credentials";
import { useLoading } from "../layout/layout-loading";
import styles from "@/styles/modules/auth.module.css";

export default function Form({ page }: { page: "signin" | "signup" }) {
  const [form, setForm] = useState({ email: "", password: "", name: "" });
  const [msgError, setMsgError] = useState("");
  const { setLoading, clearLoading } = useLoading();

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    if (!form.email || !form.password) return;
    setLoading();
    try {
      if (page === "signin") {
        const res = await signIn(authCredentials.signIn, {
          email: form.email,
          password: form.password,
          redirect: false,
        });
        if (res?.error) {
          setMsgError(res.error);
        }
      } else
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
      console.log(error, "errrrr");
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
        {msgError && <p>{msgError}</p>}
        {page === "signup" && (
          <input
            type="text"
            name="name"
            placeholder="name"
            autoFocus={page === "signup"}
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            minLength={4}
          />
        )}
        <input
          type="email"
          name="email"
          placeholder="Email"
          autoFocus={page === "signin"}
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
