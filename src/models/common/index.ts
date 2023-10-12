export interface ItemType {
  option: string;
  id: string | number;
}

export interface weekendMealStudentType {
  id: string;
  number: number;
  name: string;
  status: string;
}

export interface GetMyClassResponseDto {
  grade: number;
  class_num: number;
}

export interface PresignedUrlsType {
  presigned_urls: PresignedUrlType[];
}

export interface PresignedUrlType {
  url: string;
  presigned_url: string;
  original_filename: string;
  content_type: string;
}

export interface GetPresignedUrlRequest {
  original_filename: string;
  content_type: string;
  file_size: number;
}

export interface FileInfoType extends GetPresignedUrlRequest {
  file: File;
}
