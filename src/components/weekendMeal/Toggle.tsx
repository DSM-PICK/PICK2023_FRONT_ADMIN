import { useState } from "react";
import styled from "@emotion/styled";

const Toggle = ({ isOn, onClick }: { isOn: boolean; onClick: () => void }) => {
  return (
    <ToggleContainer onClick={onClick}>
      <div className={`toggle-container ${isOn ? "toggle--checked" : null}`}>
        {isOn ? (
          <Text>
            신청
            <br />
            ON
          </Text>
        ) : (
          <Text>
            신청
            <br />
            OFF
          </Text>
        )}
      </div>
      <div className={`toggle-circle ${isOn ? "toggle--checked" : null}`} />
    </ToggleContainer>
  );
};

const ToggleContainer = styled.div`
  position: relative;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  > .toggle-container {
    width: 147px;
    height: 48px;
    border-radius: 30px;
    background-color: ${({ theme }) => theme.colors.gray400};
    display: flex;
    justify-content: center;
    align-items: center;
  }
  > .toggle--checked {
    background-color: ${({ theme }) => theme.colors.purple400};
    transition: 0.5s;
  }
  > .toggle-circle {
    position: absolute;
    top: 1px;
    left: 1px;
    width: 45px;
    height: 45px;
    border-radius: 50%;
    background-color: rgb(255, 254, 255);
    transition: 0.5s;
  }
  > .toggle--checked {
    left: 101px;
    transition: 0.5s;
  }
`;

const Text = styled.div`
  font-size: 16px;
  color: ${({ theme }) => theme.colors.white};
  line-height: 20px;
  text-align: center;
`;

export default Toggle;
