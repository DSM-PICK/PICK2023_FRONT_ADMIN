import { useState } from "react";
import DropDown from "../common/Dropdown";
import { ItemType } from "@/models/common";
import {
  layerDropDownItem,
  classDropDownItem,
} from "../../constants/DropDownItem";

const ClubDropDown = ({
  setLayerResult,
  setClassResult,
}: {
  setLayerResult: React.Dispatch<React.SetStateAction<ItemType>>;
  setClassResult: React.Dispatch<React.SetStateAction<ItemType>>;
}) => {
  return (
    <>
      <DropDown
        title="layer"
        dropDownItem={layerDropDownItem}
        setResult={setLayerResult}
      />
      <DropDown
        title="class"
        dropDownItem={classDropDownItem}
        setResult={setClassResult}
      />
    </>
  );
};

export default ClubDropDown;
