import Form from "@/components/auth/form-signup";
import SwitchAuth from "@/components/shared/switch-auth";

export default function Page() {
  return (
    <div className="wrapper">
      <SwitchAuth />
      <Form />
    </div>
  );
}
