import { patchDateType, setDateType } from "@/utils/api/selfStudy";
import styled from "@emotion/styled";
import { useMutation } from "react-query";
import { CalendarType, DayType } from "./calendar";
import { useState } from "react";
import ChangeTypeModal from "./typemodal";

export const KoreanType = {
  SELF_STUDY: "자습",
  AFTER_SCHOOL: "방과후",
  CLUB: "동아리",
  "": "",
};

interface Props {
  value: CalendarType;
  date: {
    month: number;
    day: number;
  };
  refetch: () => void;
}

const ChangeType = ({ value, date, refetch }: Props) => {
  const [toggle1, setToggle1] = useState(false);
  const [toggle2, setToggle2] = useState(false);
  const { mutate: setTypeMutate } = useMutation(setDateType, {
    onSuccess: () => refetch(),
  });
  const { mutate: patchTypeMutate } = useMutation(patchDateType, {
    onSuccess: () => refetch(),
  });

  return date.month < 13 && date.month > 0 ? (
    <div>
      {KoreanType[value.type as DayType] !== "" ? (
        <>
          {toggle1 && (
            <ChangeTypeModal
              mutate={patchTypeMutate}
              date={date}
              type={value.type}
              setToggle={setToggle1}
            />
          )}
          <Text onClick={() => setToggle1(true)}>
            {KoreanType[value.type as DayType]}
          </Text>
        </>
      ) : (
        <>
          {toggle2 && (
            <ChangeTypeModal
              mutate={setTypeMutate}
              date={date}
              setToggle={setToggle2}
            />
          )}
          <Plus onClick={() => setToggle2(true)}>+</Plus>
        </>
      )}
    </div>
  ) : (
    <></>
  );
};

export default ChangeType;

const Text = styled.p`
  min-width: 15px;
`;

const Plus = styled(Text)`
  border: 1px solid black;
`;
