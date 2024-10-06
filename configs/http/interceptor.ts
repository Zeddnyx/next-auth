import axios from "axios";
import { getServerSession } from "next-auth";
import { getSession, signOut } from "next-auth/react";

import { configs } from "../index";
import errorHandler from "./error-handler";
import auth from "@/lib/auth";
import Http from "@/services";

async function refreshAccessToken(token: any) {
  try {
    const refreshedTokens: any = await Http.auth.refreshToken(
      token.refresh_token,
    );

    return {
      ...token,
      accessToken: refreshedTokens.accessToken,
      accessTokenExpires: Date.now() + refreshedTokens.expiresIn * 1000, // Set new expiration time
      refresh_token: refreshedTokens.refreshToken || token.refreshToken, // Refresh token may stay the same
    };
  } catch (error) {
    console.error("Failed to refresh access token", error);
    return {
      ...token,
      error: "RefreshAccessTokenError",
    };
  }
}

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

Axios.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // If the error is a 401 and it's not a retry, try refreshing the token
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // Get session and attempt token refresh
        const session: any = await getSession();
        console.log(session, "from interceptor.response");
        const refreshToken = session?.refresh_token;

        if (refreshToken) {
          const newTokens = await refreshAccessToken(refreshToken);

          // Update the original request with the new access token
          originalRequest.headers.Authorization = `Bearer ${newTokens.accessToken}`;

          // Retry the original request
          return Axios(originalRequest);
        }
      } catch (refreshError) {
        // If refresh fails, sign the user out or handle as needed
        signOut();
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(errorHandler(error));
  },
);

export default Axios;
