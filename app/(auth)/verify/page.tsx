import FormVerify from "@/components/auth/form-verify";
import { authCredentials } from "@/configs/credentials";
import auth from "@/lib/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function Page() {
  const session: any = await getServerSession(auth);
  const isVerified = session?.credentials == authCredentials.verify;
  const isToken = session?.token;
  const isOnBoarding = session?.onBoarding;
  if (isVerified && isOnBoarding) {
    redirect("/on-boarding");
  } else if (isVerified && !isOnBoarding) {
    redirect("/");
  } else if (!isToken) {
    redirect("/sign-in");
  }

  return <FormVerify email={session?.user?.email} />;
}
