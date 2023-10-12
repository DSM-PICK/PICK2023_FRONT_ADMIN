import { getPresignedUrl } from "@/utils/api/common";
import axios from "axios";
import { useMutation } from "react-query";

export const usePutImg = (request: any) => {
  const { fileInfo } = request;

  return useMutation(
    () =>
      getPresignedUrl({
        original_filename: fileInfo.original_filename,
        content_type: fileInfo.content_type,
        file_size: fileInfo.file_size,
      }),
    {
      onSuccess: async (res: any) => {
        let formData = new FormData();
        formData.append("img", request.file);

        await axios
          .put(`${res.presigned_urls[0].url}`, formData)
          .then(() => console.log("성공"))
          .catch(() => console.log("실패"));
      },
    }
  );
};
