import { useCallback } from "react";
import { toast } from "react-hot-toast";

type HandlersType = {
  [status: number | string]: any;
};

export const useApiError = (handlers?: HandlersType) => {
  const handle400 = () => {
    toast.error("잘못된 요청입니다.", { duration: 1000 });
  };
  const handle401 = () => {
    toast.error("다시 로그인해주세요.", { duration: 1000 });
  };

  const handle403 = () => {
    toast.error("권한이 없습니다.", { duration: 1000 });
  };

  const handle404 = () => {
    toast.error("값을 다시 확인해주세요.", { duration: 1000 });
  };

  const handle500 = () => {
    toast.error("서버 및 동아리에 문의해주세요.", { duration: 1000 });
  };

  const handleDefault = () => {
    toast.error("네트워크 상태를 확인해주세요.", { duration: 1000 });
  };

  // 기본적으로 처리될 수 있는 에러 핸들러
  const defaultHandlers: HandlersType = {
    400: {
      default: handle400,
    },
    401: {
      default: handle401,
    },
    403: {
      default: handle403,
    },
    404: {
      default: handle404,
    },
    500: {
      default: handle500,
    },
    default: handleDefault,
  };

  const handleError = useCallback(
    (error: any) => {
      const httpStatus = error.result;
      const errorMessage = error.data?.errorMessage;

      switch (true) {
        case handlers && !!handlers[httpStatus]?.[errorMessage]:
          handlers![httpStatus][errorMessage]();
          break;

        case handlers && !!handlers[httpStatus]:
          handlers![httpStatus](error);
          break;

        case handlers && !!handlers[httpStatus]:
          handlers![httpStatus].default(error);
          break;

        case !!defaultHandlers[httpStatus]:
          defaultHandlers[httpStatus]();
          break;

        case !!defaultHandlers[httpStatus]:
          defaultHandlers[httpStatus].default();
          break;

        default:
          defaultHandlers.default();
      }
    },
    [handlers]
  );

  return { handleError };
};
