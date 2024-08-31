"use client";

import { usePathname, useRouter } from "next/navigation";
import styles from "@/styles/modules/auth.module.css";

export default function SwitchAuth() {
  const { push } = useRouter();
  const path = usePathname();
  const isSignIn = path === "/sign-in";

  const handlePush = (type: "sign-in" | "sign-up") => {
    if (type === "sign-in") {
      push("/sign-in");
    } else {
      push("/sign-up");
    }
  };

  return (
    <div className={styles.switch_auth}>
      <button
        onClick={() => handlePush("sign-in")}
        className={isSignIn ? styles.switch_auth_on : ""}
        style={{ borderRadius: "50px 0 0 50px" }}
        disabled={isSignIn}
        type="button"
      >
        sign in
      </button>
      <button
        onClick={() => handlePush("sign-up")}
        className={!isSignIn ? styles.switch_auth_on : ""}
        style={{ borderRadius: "0 50px 50px 0" }}
        disabled={!isSignIn}
        type="button"
      >
        sign up
      </button>
    </div>
  );
}
