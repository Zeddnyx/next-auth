import SwitchAuth from "@/components/shared/switch-auth";
import { headers } from "next/headers";

export default function Layout({ children }: { children: React.ReactNode }) {
  const headerList = headers();
  const isVerify = headerList.get("x-pathname") === "/verify";
  return (
    <div className="wrapper">
      {!isVerify && <SwitchAuth />}
      {children}
    </div>
  );
}
