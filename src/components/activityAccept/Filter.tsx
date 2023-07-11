import { ItemType } from "@/models/common";
import { useState } from "react";
import DropDown from "../common/Dropdown";
import styled from "@emotion/styled";
import { css } from "@emotion/react";
import { useQuery } from "react-query";
import { getMyClass } from "@/utils/api/common";
import {
  classes,
  grades,
  moveLayerDropDownItem,
} from "@/constants/DropDownItem";

interface FilterProps {
  gradeResult: ItemType;
  classResult: ItemType;
  layerResult: ItemType;
  setGradeResult: React.Dispatch<React.SetStateAction<ItemType>>;
  setClassResult: React.Dispatch<React.SetStateAction<ItemType>>;
  setLayerResult: React.Dispatch<React.SetStateAction<ItemType>>;
}

interface ToggleProps {
  action: boolean;
  leftClick: () => void;
  rightClick: () => void;
}

const Filter = ({
  gradeResult,
  classResult,
  layerResult,
  setClassResult,
  setGradeResult,
  setLayerResult,
}: FilterProps) => {
  const [isLayerToggle, setIsLayerToggle] = useState<boolean>(true);

  const LayerToggle = ({ action, leftClick, rightClick }: ToggleProps) => {
    return (
      <ButtonBox>
        <LeftBtn select={!action} onClick={leftClick}>
          층별로 보기
        </LeftBtn>
        <RightBtn select={action} onClick={rightClick}>
          반별로 보기
        </RightBtn>
      </ButtonBox>
    );
  };

  const { data } = useQuery("myClass", getMyClass);

  return (
    <>
      <LayerToggle
        action={isLayerToggle}
        leftClick={() => {
          setGradeResult({ ...gradeResult, id: "" });
          setClassResult({ ...classResult, id: "" });
          setLayerResult({ ...layerResult, id: 1 });
          setIsLayerToggle(false);
        }}
        rightClick={() => {
          setGradeResult({
            option: data?.grade + "학년",
            id: data?.grade as number,
          });
          setClassResult({
            option: data?.class_num + "반",
            id: data?.class_num as number,
          });
          setLayerResult({ ...layerResult, id: "" });
          setIsLayerToggle(true);
        }}
      />
      {isLayerToggle ? (
        <>
          <DropDown
            setResult={setGradeResult}
            dropDownItem={grades}
            title={data?.grade + "학년"}
          />
          <DropDown
            setResult={setClassResult}
            dropDownItem={classes}
            title={data?.class_num + "반"}
          />
        </>
      ) : (
        <DropDown
          setResult={setLayerResult}
          dropDownItem={moveLayerDropDownItem}
          title={layerResult.option}
        />
      )}
    </>
  );
};

const ButtonBox = styled.div`
  width: 240px;
  height: 48px;
  border-radius: 12px;
  display: flex;
  box-sizing: border-box;
`;
const Button = styled.button<{ select: boolean }>`
  width: 120px;
  font-size: 16px;
  font-weight: 400;
  line-height: 24px;
  color: ${({ theme }) => theme.colors.gray600};
  background-color: #ffffff;
  border: 0;
  cursor: pointer;
  ${({ theme, select }) =>
    select
      ? css`
          border: 1px solid ${theme.colors.purple200};
          background-color: ${theme.colors.purple50};
          color: ${theme.colors.gray800};
        `
      : css`
          border: 1px solid ${theme.colors.gray300};
        `}
`;
const LeftBtn = styled(Button)`
  border-radius: 12px 0 0 12px;
`;
const RightBtn = styled(Button)`
  border-radius: 0 12px 12px 0;
`;

export default Filter;
