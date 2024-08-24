import ButtonSignOut from "@/components/shared/button-sign-out";
import auth from "@/lib/auth";
import { getServerSession } from "next-auth";

export default async function Page() {
  const session: any = await getServerSession(auth);
  console.log(session)

  return (
    <section className="wrapper">
      Welcome {session?.user?.name}
      <ButtonSignOut />
    </section>
  );
}
