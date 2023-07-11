import { useState } from "react";
import { ItemType } from "@/models/common";
import { todayDate } from "@/utils/functions/todayDate";
import PageContainer from "@/components/common/PageContainer";
import Filter from "@/components/activityAccept/Filter";
import { classes, grades } from "@/constants/DropDownItem";
import Container from "@/components/activityAccept/Container";

const ActivityAccept = () => {
  const [gradeResult, setGradeResult] = useState<ItemType>(grades[0]);
  const [classResult, setClassResult] = useState<ItemType>(classes[0]);
  const [layerResult, setLayerResult] = useState<ItemType>({
    option: "1층",
    id: "",
  });

  const filter: JSX.Element = (
    <Filter
      gradeResult={gradeResult}
      classResult={classResult}
      layerResult={layerResult}
      setClassResult={setClassResult}
      setGradeResult={setGradeResult}
      setLayerResult={setLayerResult}
    />
  );

  return (
    <PageContainer
      title="외출/이동 수락"
      subTitle={todayDate()}
      filter={filter}
    >
      <Container
        gradeResult={gradeResult}
        layerResult={layerResult}
        classResult={classResult}
        setGradeResult={setGradeResult}
        setClassResult={setClassResult}
      />
    </PageContainer>
  );
};

export default ActivityAccept;
