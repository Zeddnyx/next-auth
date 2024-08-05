import SwitchAuth from "@/components/shared/switch-auth";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="wrapper">
      <SwitchAuth />
      {children}
    </div>
  );
}
