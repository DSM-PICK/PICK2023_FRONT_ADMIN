import { GrCheckbox, GrCheckboxSelected } from "react-icons/gr";

const CheckBox = ({ isChecked }: { isChecked: boolean }) => {
  return <>{isChecked ? <GrCheckboxSelected /> : <GrCheckbox />}</>;
};

export default CheckBox;
