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
