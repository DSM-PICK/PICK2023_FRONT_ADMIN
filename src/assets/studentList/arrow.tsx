interface Props {
  fill: string;
}
export default function StudentListArrow(props: Props) {
  return (
    <svg
      width="8"
      height="4"
      viewBox="0 0 8 4"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M4 4L0 0L8 0L4 4Z" fill={props.fill} />
    </svg>
  );
}
