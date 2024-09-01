import SwitchAuth from "@/components/shared/switch-auth";
import { headers } from "next/headers";

export default function Layout({ children }: { children: React.ReactNode }) {
  const headerList = headers();
  const isVerify = headerList.get("x-pathname") === "/verify";
  const isOnBoarding = headerList.get("x-pathname") === "/on-boarding";
  const isShow = !isVerify && !isOnBoarding;
  return (
    <div className="wrapper">
      {isShow && <SwitchAuth />}
      {children}
    </div>
  );
}
