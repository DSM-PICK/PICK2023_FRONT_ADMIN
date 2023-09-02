import AddImgButton from "@/components/bugReport/AddImgButton";
import Block from "@/components/bugReport/Block";
import DropDown from "@/components/common/Dropdown";
import PageContainer from "@/components/common/PageContainer";
import { ItemType } from "@/models/common";
import styled from "@emotion/styled";
import { useState } from "react";

const BugReportPage = () => {
  const BugTypeItem: ItemType[] = [
    { id: 1, option: "외출 관리" },
    { id: 3, option: "출결상태 관리" },
    { id: 4, option: "인원 변경" },
    { id: 5, option: "자습 감독 변경" },
    { id: 6, option: "주말급식" },
  ];

  const [bugTypeResult, setBugTypeResult] = useState<ItemType>(BugTypeItem[0]);

  return (
    <PageContainer title="버그 제보하기" subTitle="*은 필수항목입니다.">
      <Container>
        <Block title="어디서 버그가 발생했나요?*">
          <>
            <DropDown
              title={BugTypeItem[0].option}
              dropDownItem={BugTypeItem}
              setResult={setBugTypeResult}
            />
            <BugInfoInput placeholder="버그에 대해 요약해서 설명해주세요.*" />
          </>
        </Block>
        <Block title="사진을 첨부해주세요.">
          <AddImgButton onClick={() => ""} />
        </Block>
      </Container>
    </PageContainer>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const BugInfoInput = styled.textarea`
  height: 130px;
  font-size: 20px;
  line-height: 34px;
  padding: 16px;
  border-radius: 12px;
  border: none;
  color: ${({ theme }) => theme.colors.gray900};

  ::placeholder {
    color: ${({ theme }) => theme.colors.gray300};
  }
`;

export default BugReportPage;
