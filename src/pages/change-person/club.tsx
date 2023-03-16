import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import { ItemType } from "../../models/common/index";
import Member from "@/components/club/member";
import DropDown from "@/components/common/Dropdown";
import { useApiError } from "@/hooks/useApiError";
import { getDateType } from "@/utils/api/common/index";
import { getLayerClassList, getClubMemberList } from "@/utils/api/selfStudy";
import { useQuery } from "react-query";
import { todayDate } from "@/utils/functions/todayDate";
import { layerDropDownItem } from "../../constants/DropDownItem";
import PageContainer from "@/components/common/PageContainer";
import { toast } from "react-hot-toast";

const ClubPerson = () => {
  const [layerResult, setLayerResult] = useState<ItemType>({
    option: "2층",
    id: 2,
  });
  const [classResult, setClassResult] = useState<ItemType>({
    option: "반",
    id: "",
  });

  const date = todayDate();
  const { handleError } = useApiError();

  const { data: dayType } = useQuery("toDayType", () => getDateType(date), {
    onError: handleError,
  });

  useEffect(() => {
    if (dayType?.data.type === "SELF_STUDY") {
      toast.error("운영진들에게 문의해주세요.");
    }
  }, [dayType?.data.type]);

  let layerData = Number(layerResult.id);
  const { data: classList } = useQuery(
    ["classList", layerData],
    () => getLayerClassList(layerData, dayType?.data.type!),
    {
      enabled: !!dayType?.data.type,
      onError: handleError,
    }
  );

  const classObj = classList?.classroom_list.map((item) => {
    return { option: item.description, id: item.type_id };
  });

  const { data: clubList, refetch } = useQuery(
    ["clubList", classResult.id],
    () => getClubMemberList(classResult.id as string),
    {
      enabled: classResult.id !== "",
      onError: handleError,
      cacheTime: 0,
    }
  );

  const filter: JSX.Element = (
    <>
      <DropDown
        title="2층"
        dropDownItem={layerDropDownItem}
        setResult={setLayerResult}
      />
      <DropDown
        title="반"
        dropDownItem={classObj!}
        setResult={setClassResult}
      />
    </>
  );

  return (
    <PageContainer
      title={dayType?.data.type === "CLUB" ? `${clubList?.data.club_name}` : ``}
      subTitle={
        dayType?.data.type === "CLUB"
          ? `${clubList?.data.classroom_name}(${clubList?.data.teacher_name}
            선생님 담당)`
          : `운영진들에게 문의해주세요..`
      }
      filter={filter}
    >
      <Container>
        {clubList?.data.student_list?.map((list) => (
          <Member
            key={list.student_id}
            head_club_id={clubList.data.club_id}
            club_name={clubList.data.club_name}
            refetch={refetch}
            {...list}
          />
        ))}
      </Container>
    </PageContainer>
  );
};

const Container = styled.main`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.gray50};
  border-radius: 16px;
  padding: 30px 25px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(auto-fill, minmax(45px, auto));
  grid-gap: 16px;
`;

export default ClubPerson;
