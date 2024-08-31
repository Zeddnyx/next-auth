import FormVerify from "@/components/auth/form-verify";
import { authCredentials } from "@/configs/credentials";
import auth from "@/lib/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function Page() {
  const session: any = await getServerSession(auth);
  const isVerified = session?.credentials == authCredentials.verify;
  const isToken = session?.token;
  if (isVerified) {
    redirect("/");
  } else if (!isToken) {
    redirect("/sign-in");
  }

  return <FormVerify email={session?.user?.email} />;
}
