import { Http } from "@/configs/http/http-method";

class Client {
  auth = {
    login: (data: { email: string; password: string }) =>
      Http.post("/auth/sign-in", data),
  };
}

export default new Client();
