import styled from "@emotion/styled";

type ListItem =
  | "외출/이동 수락"
  | "외출자 목록"
  | "출결 상태"
  | "인원 변경"
  | "자습 감독 선생님 변경";

interface Props {
  list: ListItem[];
}

const Navigation = ({ list }: Props) => {
  return (
    <Wrapper>
      <TitleContainer>
        <LOGO />
        <h1>OOO 선생님</h1>
      </TitleContainer>
      {/*list.map((item) => {
        <p>{item}</p>;
      })*/}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 400px;
  min-height: 100%;
  max-height: 100%;
  padding: 124px 45px 260px 46px;
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.colors.gray100};
`;

const LOGO = styled.div`
  width: 244px;
  height: 56px;
  background-color: ${({ theme }) => theme.colors.black};
`;

const TitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 120px;

  > h1 {
    margin-top: 24px;
    font-weight: 700;
    font-size: 40px;
    text-align: center;
    color: ${({ theme }) => theme.colors.black};
  }
`;

export default Navigation;
