import styled from "@emotion/styled";

interface Props {
  size: [number, number];
  onClick: () => void;
  content: string;
  hoverColor: {
    border: string;
    text: string;
  };
  color: {
    border: string;
    text: string;
  };
}

const EditButton = (props: Props) => {
  const { onClick, content } = props;
  return (
    <Wrapper props={props} onClick={onClick}>
      {content}
    </Wrapper>
  );
};

export default EditButton;

const Wrapper = styled.div<{
  props: Props;
}>`
  position: relative;
  width: ${(props) => props.props.size[0]}px;
  height: ${(props) => props.props.size[1]}px;
  border: 1px solid ${(props) => props.props.color.border};
  color: ${(props) => props.props.color.text};
  :hover {
    border: 1px solid ${(props) => props.props.hoverColor.border};
    color: ${(props) => props.props.hoverColor.text};
  }
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: 0.1s;
  cursor: pointer;
`;
