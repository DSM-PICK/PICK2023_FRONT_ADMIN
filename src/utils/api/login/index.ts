import { useRouter } from "next/router";
import { useMutation } from "react-query";
import instance from "@/utils/axios";

interface UserLogin {
  account_id: string;
  password: string;
}

interface UserToken {
  access_token: string;
  refresh_token: string;
  expire_at: string;
}

export const userLogin = () => {
  const router = useRouter();
  return useMutation(
    async (param: UserLogin) =>
      instance.post<UserToken>("https://stag-api.xquare.app/users/login", {
        ...param,
        device_token: "web_pick_admin",
      }),
    {
      onError: () => {},
      onSuccess: () => {
        router.push("/main");
      },
    }
  );
};
