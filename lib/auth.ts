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
        };
        try {
          const { data }: any = await Http.auth.login({ ...payload });
          return {
            token: data.token,
            email: credentials?.email,
            name: data?.user?.name,
          };
        } catch (error: any) {
          throw new Error(error?.response?.data?.message);
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, account, user }: any) {
      const { signIn, signUp, resetPassword } = authCredentials;
      if (
        account?.provider === signIn ||
        account?.provider === signUp ||
        account?.provider === resetPassword
      ) {
        token.token = user.token;
        token.email = user.email;
        token.name = user.name;
        if (account?.provider) {
          switch (account?.provider) {
            case signIn:
              token.credentials = signIn;
              break;
            default:
              token.credentials = account?.provider + "-default";
          }
        }
      }

      return token;
    },
    async session({ session, token }: any) {
      session.token = token.token;
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
