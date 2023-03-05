import styled from "@emotion/styled";

const ChangeTeacherPage = () => {
  return (
    <Wrapper>
      <Title>Comming Soon</Title>
      <p>추가 기능 문의는 2학년 이정호에게 찾아가세요</p>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  margin: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  > p {
    font-size: 20px;
    margin-top: 40px;
  }
`;

const Title = styled.h1`
  font-size: 80px;
`;

export default ChangeTeacherPage;
