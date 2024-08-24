import { Http } from "@/configs/http/http-method";

class Client {
  auth = {
    login: (data: { email: string; password: string }) =>
      Http.post("/auth/sign-in", data),
    register: (data: { name: string; email: string; password: string }) => {
      return Http.post("/auth/register", data);
    },
    me: (token: string) => Http.get("/auth/me", null, token),
  };
}

export default new Client();
