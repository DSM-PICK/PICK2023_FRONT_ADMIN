import axios from "axios";
import cookies from "react-cookies";
import { toast } from "react-hot-toast";

export const setToken = (accessToken: string, refreshToken: string) => {
  axios.defaults.headers.common.Authorization = "Bearer " + accessToken;
  const expires = new Date();
  expires.setDate(Date.now() + 1000 * 60 * 60 * 24);

  cookies.save("accessToken", accessToken, {
    path: "/",
    expires,
    httpOnly: process.env.NEXT_PUBLIC_HTTP_ONLY === "true",
  });

  cookies.save("refreshToken", refreshToken, {
    path: "/",
    expires,
    httpOnly: process.env.NEXT_PUBLIC_HTTP_ONLY === "true",
  });
};

export const removeToken = () => {
  cookies.remove("accessToken");
  cookies.remove("refreshToken");
};

export const getToken = () => {
  const { accessToken, refreshToken } = cookies.select();
  return { accessToken, refreshToken };
};

interface RefreshToken {
  access_token: string;
  refresh_token: string;
  expire_at: string;
}

export const refreshToken = async () => {
  const { refreshToken } = getToken();

  if (!refreshToken) {
    return;
  }

  try {
    const response = await axios.put<RefreshToken>("/users/login", {
      refreshToken: refreshToken,
    });

    const { access_token, refresh_token } = response.data;

    setToken(access_token, refresh_token);
  } catch (error) {
    toast.error("토큰 리프레쉬에 실패하였습니다.");
  }
};
