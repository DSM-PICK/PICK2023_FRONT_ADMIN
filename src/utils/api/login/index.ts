import { useRouter } from "next/router";
import { useMutation } from "react-query";
import instance from "@/utils/axios";
import { setToken } from "@/utils/functions/tokenManager";
import { useApiError } from "@/hooks/useApiError";

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
  const { handleError } = useApiError();

  return useMutation(
    async (param: UserLogin) =>
      instance.post<UserToken>("https://stag-api.xquare.app/users/login", {
        ...param,
        device_token: "web_pick_admin",
      }),
    {
      onError: handleError,
      onSuccess: ({ data }) => {
        setToken(data.access_token, data.refresh_token);
        router.push("/main");
      },
    }
  );
};
