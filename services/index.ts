import { Http } from "@/configs/http/http-method";

class Client {
  auth = {
    refreshToken: (token: string) =>
      Http.post("/auth/refresh-token", { token }), // dummy
    login: (data: ISignIn) => Http.post("/auth/sign-in", data),
    register: (data: ISignUp) => {
      return Http.post("/auth/register", data);
    },
    me: (token: string) => Http.get("/auth/me", null, token),
  };
}

export default new Client();
