import styled from "@emotion/styled";

interface StyleProps {
  size: [number, number];
  hoverColor: {
    border: string;
    text: string;
  };
  defaultColor: {
    border: string;
    text: string;
  };
}

type Props = StyleProps & {
  onClick: () => void;
  content: string;
};

const EditButton = (props: Props) => {
  const { onClick, content, ...styleProps } = props;
  return (
    <Wrapper {...styleProps} onClick={onClick}>
      {content}
    </Wrapper>
  );
};

export default EditButton;

const Wrapper = styled.div<StyleProps>`
  position: relative;
  width: ${(props) => props.size[0]}px;
  height: ${(props) => props.size[1]}px;
  border: 1px solid ${(props) => props.defaultColor.border};
  color: ${(props) => props.defaultColor.text};
  :hover {
    border: 1px solid ${(props) => props.hoverColor.border};
    color: ${(props) => props.hoverColor.text};
  }
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: 0.1s;
  cursor: pointer;
`;
