import styled from "@emotion/styled";

interface BugDetailInputProps {
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

const BugDetailInput = ({ onChange }: BugDetailInputProps) => {
  return (
    <Input
      placeholder="버그/개선사항에 대해 설명해주세요.*"
      onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => onChange(e)}
    />
  );
};

const Input = styled.textarea`
  height: 130px;
  font-size: 20px;
  line-height: 34px;
  padding: 16px;
  border-radius: 12px;
  border: none;
  color: ${({ theme }) => theme.colors.gray900};
  outline: none;

  ::placeholder {
    color: ${({ theme }) => theme.colors.gray300};
  }
`;

export default BugDetailInput;
