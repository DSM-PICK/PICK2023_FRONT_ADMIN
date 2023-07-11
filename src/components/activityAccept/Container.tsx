import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import { ItemType } from "@/models/common";
import { useQuery } from "react-query";
import { getMyClass } from "@/utils/api/common";
import ApplicationList from "./ApplicationList";
import MovedStudent from "./MovedStudent";

interface ContainerProps {
  gradeResult: ItemType;
  layerResult: ItemType;
  classResult: ItemType;
  setGradeResult: React.Dispatch<React.SetStateAction<ItemType>>;
  setClassResult: React.Dispatch<React.SetStateAction<ItemType>>;
}

const Container = ({
  gradeResult,
  layerResult,
  classResult,
  setGradeResult,
  setClassResult,
}: ContainerProps) => {
  const [isOpenOutingModal, setIsOpenOutingModal] = useState<boolean>(false);

  const { data: myClassData } = useQuery("myClass", getMyClass);

  useEffect(() => {
    setGradeResult({
      option: `${myClassData?.grade}학년`,
      id: myClassData?.grade as number,
    });
    setClassResult({
      option: `${myClassData?.class_num}반`,
      id: myClassData?.class_num as number,
    });
  }, [myClassData]);

  return (
    <Wrapper>
      <ApplicationList
        gradeResult={gradeResult}
        classResult={classResult}
        layerResult={layerResult}
        setIsOpenOutingModal={setIsOpenOutingModal}
      />
      <MovedStudent
        gradeResult={gradeResult}
        classResult={classResult}
        layerResult={layerResult}
        isOpenOutingModal={isOpenOutingModal}
        setIsOpenOutingModal={setIsOpenOutingModal}
      />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: grid;
  gap: 32px;
  grid-template-columns: 1.5fr 1fr;
  height: 100%;
  > div {
    height: 68vh !important;
    width: 100%;
    position: relative;
    background-color: ${({ theme }) => theme.colors.white};
    border-radius: 16px;
    height: 100%;
    padding: 16px 20px;
    display: flex;
    flex-direction: column;
    gap: 24px;
    overflow: hidden;
  }
`;

export default Container;
