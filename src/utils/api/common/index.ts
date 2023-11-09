import {
  GetMyClassResponseDto,
  GetPresignedUrlRequest,
  PresignedUrlsType,
} from "@/models/common";
import instance from "@/utils/axios";

interface GetDateTypeDto {
  date: string;
  type: string;
}

export const getDateType = async (date: string) => {
  const dateType = await instance.get<GetDateTypeDto>(
    `/pick/admin/?date=${date}`
  );
  return dateType.data;
};

interface GetTeachersListDto {
  teachers: {
    id: string;
    name: string;
  }[];
}

export const getTeachersList = async () => {
  const response = await instance.get<GetTeachersListDto>(`/users/teachers`);
  return response.data;
};

export const getMyClass = async () => {
  const response = await instance.get<GetMyClassResponseDto>(
    `/pick/teachers/buck`
  );
  return response.data;
};

export const getPresignedUrl = async (request: GetPresignedUrlRequest) => {
  const response = await instance.post<PresignedUrlsType>(`/attachment`, {
    image_file_requests: [request],
  });
  return response.data;
};
