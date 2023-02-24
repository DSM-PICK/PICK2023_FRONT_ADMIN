interface ContantType {
  [index: string]: {
    Text: string;
    Layer1: string;
    Layer2: string;
    Button: string;
    Fill: "purple" | "red";
  };
}

const contant: ContantType = {
  accept: {
    Text: "외출을 수락하시겠습니까?",
    Layer1: "수락하기 선택 이후에는 변경할 수 없습니다.",
    Layer2: "다시 한번 확인해주세요.",
    Button: "수락하기",
    Fill: "purple",
  },
  refuse: {
    Text: "외출을 거절하시겠습니까?",
    Layer1: "확인하기를 선택하면 다시 상태를 변경할 수 없습니다.",
    Layer2: " 학생이 학교로 복귀했는지 다시 한번 확인해주세요.",
    Button: "거절하기",
    Fill: "red",
  },
  finish: {
    Text: "외출을 끝내시겠습니까?",
    Layer1: "확인하기를 선택하면 다시 상태를 변경할 수 없습니다.",
    Layer2: "학생이 학교로 복귀했는지 다시 한번 확인해주세요.",
    Button: "확인하기",
    Fill: "purple",
  },
  restriction: {
    Text: "제한하시겠습니까?",
    Layer1: `제한하기를 선택하면 오늘${"(2023-02-18)"}`,
    Layer2: "방과후 시간동안 학생들의 교실 이동은 불가능합니다.",
    Button: "수락하기",
    Fill: "red",
  },
};

export default contant;
