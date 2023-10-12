import AddImgButton from "@/components/bugReport/AddImgButton";
import Block from "@/components/bugReport/Block";
import BugDetailInput from "@/components/bugReport/BugDetailInput";
import DropDown from "@/components/common/Dropdown";
import PageContainer from "@/components/common/PageContainer";
import { BugTypeItem } from "@/constants/DropDownItem";
import { usePutImg } from "@/hooks/usePutImg";
import { FileInfoType, ItemType } from "@/models/common";
import styled from "@emotion/styled";
import { useState } from "react";

const BugReportPage = () => {
  const filter = <ReportButton onClick={() => mutate()}>제출하기</ReportButton>;
  const [bugDetail, setBugDetail] = useState<string>("");
  const [bugTypeResult, setBugTypeResult] = useState<ItemType>(BugTypeItem[0]);
  const [fileInfo, setFileInfo] = useState<FileInfoType>();

  const { mutate } = usePutImg({ fileInfo });

  const bugDetailInputChangeHandler = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setBugDetail(e.target.value);
  };

  return (
    <PageContainer
      title="버그 제보하기"
      subTitle="*은 필수항목입니다."
      filter={filter}
    >
      <>
        <Block title="어디서 버그가 발생했나요?*">
          <>
            <DropDown
              title={BugTypeItem[0].option}
              dropDownItem={BugTypeItem}
              setResult={setBugTypeResult}
            />
            <BugDetailInput onChange={bugDetailInputChangeHandler} />
          </>
        </Block>
        <Block title="사진을 첨부해주세요.">
          <AddImgButton fileInfo={fileInfo!} setFileInfo={setFileInfo} />
        </Block>
      </>
    </PageContainer>
  );
};

const ReportButton = styled.button`
  width: 147px;
  height: 48px;
  border: 1px solid ${({ theme }) => theme.colors.purple400};
  border-radius: 12px;
  background-color: ${({ theme }) => theme.colors.white};
  font-size: 16px;
  color: ${({ theme }) => theme.colors.purple400};
`;

export default BugReportPage;
