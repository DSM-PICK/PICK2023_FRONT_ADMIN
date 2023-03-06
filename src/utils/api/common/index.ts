import instance from "@/utils/axios";

interface GetDateTypeDto {
  date: string;
  type: string;
}

export const getDateType = async (date: string) => {
  const dateType = await instance.get<GetDateTypeDto>(
    `/pick/admin/?date=${date}`
  );
  return dateType;
};
