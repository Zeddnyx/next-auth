"use client";
import { authCredentials } from "@/configs/credentials";
import { hideEmail } from "@/lib/utils";
import styles from "@/styles/modules/auth.module.css";
import { signIn } from "next-auth/react";

export default function FormVerify({ email }: { email: string }) {
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const otp = event.currentTarget.otp.value;
    await signIn(authCredentials.verify, {
      otp,
    });
  };
  return (
    <form className={styles.verify_container} onSubmit={handleSubmit}>
      <p>Check your email {hideEmail(email)}</p>
      <input placeholder="123456" name="otp" type="number" required autoFocus />
      <button className="submit" type="submit">
        Submit
      </button>
    </form>
  );
}
