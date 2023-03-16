import StudentListArrow from "@/assets/studentList/arrow";
import { transStatus } from "@/utils/constant/statusMap";
import { keyframes, useTheme } from "@emotion/react";
import styled from "@emotion/styled";
import { useState, useEffect } from "react";
import OutSideClickHandler from "../common/OutSideClickHandler";

interface Props {
  studentID: string;
  text: string;
  status: string;
  isEditing: boolean;
  onChange: (value: string) => void;
}

interface CaseType {
  textColor: string;
  buttonColor: string;
}

const StudentList = (props: Props) => {
  const {
    text,
    status = "ATTENDANCE",
    isEditing,
    onChange = () => {},
    ...otherProps
  } = props;
  const theme = useTheme();
  const [userStatus, setStatus] = useState<string>(transStatus(status));
  const [toggle, setToggle] = useState<boolean>(false);
  const contents: string[] = [
    "ATTENDANCE",
    "FIELD_TRIP",
    "HOME",
    "EMPLOYMENT",
    "DROPOUT",
  ];
  const Case = new Map<string, CaseType>([
    [
      "출석",
      { textColor: theme.colors.gray900, buttonColor: theme.colors.gray100 },
    ],
    [
      "현체",
      { textColor: theme.colors.white, buttonColor: theme.colors.purple400 },
    ],
    [
      "취업",
      { textColor: theme.colors.white, buttonColor: theme.colors.purple400 },
    ],
    [
      "귀가",
      { textColor: theme.colors.white, buttonColor: theme.colors.purple200 },
    ],
    [
      "자퇴",
      { textColor: theme.colors.white, buttonColor: theme.colors.red400 },
    ],
  ]);
  const curCase = Case.get(userStatus);
  if (typeof curCase === "undefined") return null;

  const backgroundColor = curCase.buttonColor;
  const textColor = curCase.textColor;

  const changeState = (value: string) => {
    setStatus(transStatus(value));
    onChange(value);
    setToggle(false);
  };

  return (
    <Wrapper>
      <Text>{text}</Text>
      <OutSideClickHandler onOutSideClick={() => setToggle(false)}>
        <DropDownContainer
          toggle={toggle}
          backgroundColor={backgroundColor}
          textColor={textColor}
          onClick={() => {
            if (!isEditing) return;
            setToggle(!toggle);
          }}
        >
          <p>{userStatus}</p>
          {isEditing && (
            <StudentListArrow
              fill={
                userStatus === "출석"
                  ? theme.colors.gray600
                  : theme.colors.white
              }
            />
          )}
          {toggle && (
            <DropDownItemsWrapper>
              <DropDownItems>
                {contents.map((value, index) => (
                  <p
                    key={index}
                    onClick={() => changeState(value)}
                    id={value === "DROPOUT" ? "dropout" : ""}
                  >
                    {transStatus(value)}
                  </p>
                ))}
              </DropDownItems>
            </DropDownItemsWrapper>
          )}
        </DropDownContainer>
      </OutSideClickHandler>
    </Wrapper>
  );
};

export default StudentList;

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  height: 50px;
  background: ${({ theme }) => theme.colors.white};
  border-radius: 12px;
  padding: 0px 18px 0px 20px;
  flex-shrink: 0;
  align-items: center;
  justify-content: space-between;
`;

const Text = styled.p`
  font-size: 17px;
  font-weight: 500;
  display: flex;
  align-items: center;
  line-height: 28px;
  color: ${({ theme }) => theme.colors.gray900};
`;

const DropDownContainer = styled.div<{
  backgroundColor: string;
  textColor: string;
  toggle: boolean;
}>`
  width: 62px;
  height: 30px;
  border-radius: 50px;
  transition: 0.3s;
  background-color: ${(props) => props.backgroundColor};
  color: ${(props) => props.textColor};
  display: flex;
  gap: 6px;
  align-items: center;
  justify-content: center;
  font-size: 13px;
  position: relative;
  > p {
    cursor: pointer;
  }
  > svg {
    transform: rotateX(${(props) => (props.toggle ? "180deg" : "0deg")});
    transition: 0.3s;
    cursor: pointer;
  }
`;

const slidein = keyframes`
  from {
    opacity:0;  
  }
  to {
    opacity:1;  
  }
`;

const DropDownItemsWrapper = styled.div`
  position: absolute;
  width: 100%;
  right: 0px;
  bottom: -8px;
  z-index: 1;
  animation: ${slidein} 0.3s;
`;

const DropDownItems = styled.div`
  position: absolute;
  width: 147px;
  box-shadow: 0px 2px 8px rgba(33, 33, 33, 0.25);
  border-radius: 12px;
  background-color: ${({ theme }) => theme.colors.white};
  right: 0px;
  top: 0px;
  display: flex;
  flex-direction: column;
  padding: 6px 16px;
  color: ${({ theme }) => theme.colors.black};
  font-size: 16px;
  line-height: 36px;
  > p {
    cursor: pointer;
  }
  > #dropout {
    color: ${({ theme }) => theme.colors.red400};
  }
`;
