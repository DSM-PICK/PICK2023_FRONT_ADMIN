import { ItemType } from "@/models/common";
import { useState } from "react";
import DropDown from "../common/Dropdown";
import {
  classDropDownItem,
  gradeDropDownItem,
  layerDropDownItem,
} from "./DropDownItem";
import styled from "@emotion/styled";
import { css } from "@emotion/react";

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

  return (
    <>
      <LayerToggle
        action={isLayerToggle}
        leftClick={() => {
          setGradeResult({ ...gradeResult, id: 0 });
          setClassResult({ ...classResult, id: 0 });
          setLayerResult({ ...layerResult, id: 0 });
          setIsLayerToggle(false);
        }}
        rightClick={() => {
          setGradeResult({ ...gradeResult, id: 0 });
          setClassResult({ ...classResult, id: 0 });
          setLayerResult({ ...layerResult, id: ""});
          setIsLayerToggle(true);
        }}
      />
      {isLayerToggle ? (
        <>
          <DropDown
            setResult={setGradeResult}
            dropDownItem={gradeDropDownItem}
            title={gradeResult.option}
          />
          <DropDown
            setResult={setClassResult}
            dropDownItem={classDropDownItem}
            title={classResult.option}
          />
        </>
      ) : (
        <DropDown
          setResult={setLayerResult}
          dropDownItem={layerDropDownItem}
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
