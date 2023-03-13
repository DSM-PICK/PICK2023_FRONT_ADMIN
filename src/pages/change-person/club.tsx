import styled from "@emotion/styled";
import { useState } from "react";
import { ItemType } from "../../models/common/index";
import Member from "@/components/club/member";
import DropDown from "@/components/common/dropDown";
import { useApiError } from "@/hooks/useApiError";
import { getDateType } from "@/utils/api/common/index";
import { getLayerClassList, getClubMemberList } from "@/utils/api/selfStudy";
import { useQuery } from "react-query";
import { todayDate } from "@/utils/functions/todayDate";
import { layerDropDownItem } from "../../constants/DropDownItem";

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

  let layerData = Number(layerResult.id);
  const { data: classList } = useQuery(
    ["classList", layerData],
    () => getLayerClassList(layerData, dayType?.data.type!),
    {
      enabled: !!dayType?.data.type,
    }
  );

  const classObj = classList?.data.classroom_list.map((item) => {
    return { option: item.description, id: item.type_id };
  });

  const { data: clubList, refetch } = useQuery(
    ["clubList", classResult.id],
    () => getClubMemberList(classResult.id as string),
    {
      enabled: classResult.id !== "",
    }
  );

  return (
    <Wrapper>
      <Header>
        <div>
          <Title>{clubList?.data.club_name}</Title>
          <SubTitle>
            {clubList?.data.classroom_name}({clubList?.data.teacher_name}
            선생님 담당)
          </SubTitle>
        </div>
        <div>
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
        </div>
      </Header>
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
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 900px;
  height: 600px;
  margin: auto;
  display: flex;
  flex-direction: column;
  @media screen and (max-width: 1200px) {
    width: 616px;
    main {
      grid-template-columns: repeat(2, 1fr);
    }
  }
`;
const Header = styled.div`
  width: 100%;
  z-index: 10;
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
  > div {
    display: flex;
    align-items: end;
  }
  > div:nth-child(2) {
    gap: 10px;
  }
`;
const Title = styled.p`
  font-size: 32px;
  color: ${({ theme }) => theme.colors.gray900};
  font-weight: 700;
  margin-right: 16px;
`;
const SubTitle = styled.p`
  font-size: 16px;
  color: ${({ theme }) => theme.colors.gray600};
  font-weight: 500;
  margin-bottom: 5px;
`;

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
