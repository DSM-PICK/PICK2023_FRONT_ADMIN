import styled from "@emotion/styled";
import background from "../../assets/login/background.png";
import logo from "../../assets/login/logo.png";
import Input from "../common/input";
import { Button } from "@semicolondsm/ui";
import Image from "next/image";
import { useState } from "react";

const Login = () => {
  const [loginData, setLoginData] = useState({
    account_id: "",
    password: "",
  });

  return (
    <LoginContainer>
      <LoginWrapper
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <Image src={logo} width={50} height={50} alt="logo" />
        <InputContainer>
          <Input
            placeholder="아이디를 입력하세요"
            name="account_id"
            value={loginData.account_id}
            onChange={(e) =>
              setLoginData((state) => ({
                ...state,
                [e.target.name]: e.target.value,
              }))
            }
          />
          <Input
            placeholder="비밀번호를 입력하세요"
            name="password"
            value={loginData.password}
            onChange={(e) =>
              setLoginData((state) => ({
                ...state,
                [e.target.name]: e.target.value,
              }))
            }
          />
        </InputContainer>
        <LoginButton fullWidth fill="purple">
          로그인
        </LoginButton>
      </LoginWrapper>
    </LoginContainer>
  );
};

const LoginContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 100%;
  justify-content: center;
  background-image: url(${background.src});
  background-size: cover;
`;

const LoginWrapper = styled.form`
  padding: 50px 60px;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  gap: 30px;
  align-items: center;
  box-shadow: 0px 2px 8px rgba(33, 33, 33, 0.25);
  background-color: ${({ theme }) => theme.colors.white};
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 300px;
`;

const LoginButton = styled(Button)`
  border-radius: 12px;
`;

export default Login;
