import axios from "axios";
import { getServerSession } from "next-auth";
import { getSession } from "next-auth/react";

import { configs } from "../index";
import errorHandler from "./error-handler";
import auth from "@/lib/auth";

export const Axios = axios.create({
  baseURL: configs.URL_API,
  headers: {
    apiKey: configs.API_KEY,
  },
});

Axios.interceptors.request.use(async (request) => {
  const sessionClient: ISession = (await getSession()) as ISession;
  const sessionServer: ISession | null =
    typeof window === "undefined"
      ? ((await getServerSession(auth)) as ISession)
      : null;

  const token = sessionClient?.token || sessionServer?.token;

  if (token) {
    request.headers.Authorization = `Bearer ${token}`;
  }
  return request;
});

Axios.interceptors.response.use((response) => response, errorHandler);
