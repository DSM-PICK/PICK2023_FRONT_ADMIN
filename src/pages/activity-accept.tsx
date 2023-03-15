import styled from "@emotion/styled";
import LayerToggle from "../components/activityAccept/ToggleFloor";
import { useState } from "react";
import ButtonComponent from "@/components/common/button/ButtonComponent";
import { css } from "@emotion/react";
import { useQuery, useMutation } from "react-query";
import OutingComponent from "../components/activityAccept/OutingComponent";
import MovingComponent from "../components/activityAccept/MovingComponent";
import DropDown from "@/components/common/dropDown";
import { ItemType } from "@/models/common";
import {
  gradeDropDownItem,
  classDropDownItem,
  layerDropDownItem,
} from "@/components/activityAccept/DropDownItem";
import { useApiError } from "@/hooks/useApiError";
import { todayDate } from "@/utils/functions/todayDate";
import { getOutingApplyList } from "@/utils/api/outing";
import { getMoveStudentList } from "@/utils/api/selfStudy";
import { getDateType } from "@/utils/api/common/index";

interface headBarProps {
  title: string;
  children: JSX.Element;
}
const HeadBar = ({ title, children }: headBarProps) => {
  return (
    <HeaderContainer>
      <HeaderText>{title}</HeaderText>
      {children}
    </HeaderContainer>
  );
};

interface ActivityBtnProps {
  children: string;
  onClick?: () => void;
}

const ActivityBtn = ({ children, onClick }: ActivityBtnProps) => {
  const headerBarBtnStyle = css`
    font-size: 14px;
    font-weight: 400;
    line-height: 20px;
    padding: 0 2vh;
  `;
  return (
    <ButtonComponent
      onClick={onClick}
      size={["", "32px"]}
      customStyle={headerBarBtnStyle}
      fill="purple"
    >
      {children}
    </ButtonComponent>
  );
};

const ActivityAccept = () => {
  const [isLayerToggle, setIsLayerToggle] = useState<boolean>(true);
  const [gradeResult, setGradeResult] = useState<ItemType>({
    option: "grade",
    id: 0,
  });
  const [classResult, setClassResult] = useState<ItemType>({
    option: "class",
    id: 0,
  });
  const [layerResult, setLayerResult] = useState<ItemType>({
    option: "layer",
    id: 0,
  });

  let grade_id = gradeResult.id as number;
  let class_id = classResult.id as number;
  let layer_id = layerResult.id as number;

  const { handleError } = useApiError();

  const { data: todayType } = useQuery(
    "todayType",
    () => getDateType(todayDate()),
    {
      onError: handleError,
    }
  );

  const { data: applyList, refetch } = useQuery(
    ["applyList", gradeResult.id, classResult.id, layerResult.id],
    () =>
      getOutingApplyList({
        grade: grade_id,
        classNum: class_id,
        floor: layer_id,
        type: (todayType?.data.type as string) || "SELF_STUDY",
      })
  );

  const { data: moveList } = useQuery(
    ["moveList", gradeResult.id, classResult.id, layerResult.id],
    () =>
      getMoveStudentList({
        grade: grade_id,
        classNum: class_id,
        floor: layer_id,
      })
  );

  return (
    <Wrapper>
      <Header>
        <div>
          <Title>외출/이동 수락</Title>
          <SubTitle>{todayDate()}</SubTitle>
        </div>
        <div>
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
              setLayerResult({ ...layerResult, id: 0 });
              setIsLayerToggle(true);
            }}
          />
          {isLayerToggle ? (
            <>
              <DropDown
                setResult={setGradeResult}
                dropDownItem={gradeDropDownItem}
                title="grade"
              />
              <DropDown
                setResult={setClassResult}
                dropDownItem={classDropDownItem}
                title="class"
              />
            </>
          ) : (
            <DropDown
              setResult={setLayerResult}
              dropDownItem={layerDropDownItem}
              title="lyaer"
            />
          )}
        </div>
      </Header>
      <Container>
        <ActivityWrapper width="480px">
          <HeadBar title="외출 신청 목록">
            <div className="임시방편" />
            {/*<ActivityBtn>새로운 외출증 발급</ActivityBtn>*/}
          </HeadBar>
          <OutingBox>
            <OutingComponent outing={applyList?.outing || []} />
          </OutingBox>
        </ActivityWrapper>
        <ActivityWrapper width="340px">
          <HeadBar title="이동한 학생">
            <ActivityBtn>이동 제한</ActivityBtn>
          </HeadBar>
          <MovingBox>
            {moveList?.data.move_list.map((data) => (
              <MovingComponent
                key={data.student_number}
                student_number={data.student_number}
                student_name={data.student_name}
                after={data.after}
                before={data.before}
              />
            ))}
          </MovingBox>
        </ActivityWrapper>
      </Container>
    </Wrapper>
  );
};

const HeaderContainer = styled.div`
  width: 100%;
  height: 50px;
  border-radius: 12px;
  background-color: ${({ theme }) => theme.colors.gray50};
  padding: 0 15px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const Wrapper = styled.div`
  width: 900px;
  height: 600px;
  margin: auto;
  display: flex;
  flex-direction: column;
`;
const Header = styled.header`
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
  > div {
    display: flex;
    align-items: end;
    gap: 16px;
  }
`;
const Title = styled.p`
  font-size: 32px;
  color: ${({ theme }) => theme.colors.gray900};
  font-weight: 700;
`;
const SubTitle = styled.p`
  font-size: 16px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.gray600};
`;
const Container = styled.main`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.gray50};
  border-radius: 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 28px;
`;
const ActivityWrapper = styled.div<{ width: string }>`
  position: relative;
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: 16px;
  height: 100%;
  width: ${({ width }) => width};
  padding: 16px 20px;
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const HeaderText = styled.p`
  color: ${({ theme }) => theme.colors.gray900};
  font-size: 16px;
  font-weight: 500;
  line-height: 28px;
`;
const OutingBox = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  overflow-y: scroll;
`;

const MovingBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export default ActivityAccept;
