import axios from "axios";
import cookies from "react-cookies";

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
