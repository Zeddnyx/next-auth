import { getServerSession, NextAuthOptions } from "next-auth";
import Http from "@/services";
import CredentialsProvider from "next-auth/providers/credentials";

import { configs } from "@/configs";
import { authCredentials } from "@/configs/credentials";
import {
  GetServerSidePropsContext,
  NextApiRequest,
  NextApiResponse,
} from "next";
import GoogleProvider from "next-auth/providers/google";

export async function getSession() {
  const session: any = await getServerSession(auth);
  return session;
}

const auth: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/sign-in",
  },
  secret: configs.NEXTAUTH_SECRET,
  providers: [
    GoogleProvider({
      clientId: configs.GOOGLE_ID || "",
      clientSecret: configs.GOOGLE_SECRET || "",
    }),
    CredentialsProvider({
      id: authCredentials.signUp,
      name: "Complete Your Credentials",
      credentials: {},
      async authorize(credentials: any): Promise<any> {
        const payload = {
          name: credentials?.name,
          email: credentials?.email,
          password: credentials?.password,
          login_via: "EMAIL",
          role: "user",
        };
        try {
          const data: any = await Http.auth.register({ ...payload });
          return {
            token: data.token,
            email: credentials?.email,
            name: credentials?.name,
          };
        } catch (error: any) {
          throw new Error(error?.response?.data?.message);
        }
      },
    }),
    CredentialsProvider({
      id: authCredentials.signIn,
      name: "Complete Your Credentials",
      credentials: {},
      async authorize(credentials: any): Promise<any> {
        const payload = {
          email: credentials?.email,
          password: credentials?.password,
          login_via: "EMAIL",
        };
        try {
          const { data }: any = await Http.auth.login({ ...payload });
          const { data: userInfo }: any = await Http.auth.me(data?.token);
          return {
            token: data?.token,
            email: credentials?.email,
            name: data?.user?.name,
            image: userInfo?.user?.avatar,
            role: userInfo?.user?.role,
          };
        } catch (error: any) {
          throw new Error(error?.response?.data?.message);
        }
      },
    }),
    CredentialsProvider({
      id: authCredentials.verify,
      name: "Complete your otp",
      credentials: {},
      async authorize(credentials: any): Promise<any> {
        const session: any = await getServerSession(auth);
        const payload = {
          otp: credentials?.otp,
        };
        console.log(payload, "otp");
        try {
          return {
            name: session?.user?.name,
            email: session?.user?.email,
            image: session?.user?.image,
            token: session?.token,
            role: session?.role,
            credentials: authCredentials.verify,
            onBoarding: true,
          };
        } catch (error: any) {
          throw new Error(error?.response?.data?.message);
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, account, user }: any) {
      const { signIn, signUp, resetPassword, verify, me, google } =
        authCredentials;

      if (account?.provider === google) {
        const payload = { login_via: "EMAIL", email: token?.email };

        try {
          const { data }: any = await Http.auth.login({ ...payload });
          return {
            token: data.user_otp.token || account?.access_token,
            email: token?.email,
            credentials: signIn,
            name: token?.name,
          };
        } catch (error: any) {
          throw new Error(error?.response?.data?.message);
        }
      }

      if (
        account?.provider === signIn ||
        account?.provider === signUp ||
        account?.provider === resetPassword ||
        account?.provider === verify
      ) {
        token.token = user?.token;
        token.email = user?.email;
        token.name = user?.name;
        token.image = user?.image;
        token.role = user?.role;
        token.onBoarding = true;
        if (account?.provider) {
          switch (account?.provider) {
            case signIn:
              token.credentials = signIn;
              break;
            case signUp:
              token.credentials = signUp;
              break;
            case resetPassword:
              token.credentials = resetPassword;
              break;
            case verify:
              token.credentials = verify;
              break;
            case me:
              token.credentials = me;
              break;
            default:
              token.credentials = account?.provider + "-default";
          }
        }
      }

      return token;
    },
    async session({ session, token }: any) {
      session.role = token.role;
      session.token = token.token;
      session.onBoarding = token.onBoarding;
      session.credentials = token.credentials;
      return session;
    },
  },
};
export default auth;

export function sessionServer(
  ...args:
    | [GetServerSidePropsContext["req"], GetServerSidePropsContext["res"]]
    | [NextApiRequest, NextApiResponse]
    | []
) {
  return getServerSession(...args, auth);
}
