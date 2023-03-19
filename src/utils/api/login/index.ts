import { useRouter } from "next/router";
import { useMutation } from "react-query";
import instance from "@/utils/axios";
import { setToken } from "@/utils/functions/tokenManager";
import { useApiError } from "@/hooks/useApiError";
import { toast } from "react-hot-toast";

interface UserLogin {
  account_id: string;
  password: string;
}

interface UserToken {
  access_token: string;
  refresh_token: string;
  expire_at: string;
  role: string;
}

export const userLogin = () => {
  const router = useRouter();
  const { handleError } = useApiError();

  return useMutation(
    async (param: UserLogin) =>
      instance.post<UserToken>("/users/login", {
        ...param,
        device_token: "web_pick_admin",
      }),
    {
      onError: handleError,
      onSuccess: ({ data }) => {
        if (data.role === "SCH") {
          setToken(
            data.access_token,
            data.refresh_token,
            new Date(data.expire_at)
          );
          router.push("/main");
        } else {
          toast.error("권한이 없는 계정입니다.");
        }
      },
    }
  );
};
