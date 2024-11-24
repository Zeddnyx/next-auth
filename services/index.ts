import { Http } from "@/configs/http/http-method";

class Client {
  auth = {
    refreshToken: (token: string) => Http.post("/auth/refresh", { token }),
    login: (data: ISignIn) => Http.post("/auth/login", data),
    register: (data: ISignUp) => {
      return Http.post("/auth/register", data);
    },
    me: (token: string) => Http.get("/auth/me", null, token),
  };
}

export default new Client();
