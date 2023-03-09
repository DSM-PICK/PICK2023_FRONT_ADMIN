import { useState } from "react";

export const usePeriod = () => {
  const getPeriod = () => {
    const date = new Date();
    const month = date.getMonth().toString();
    const day = date.getDay().toString();
    const year = date.getFullYear().toString();
    const today = year + "/" + month.padStart(2, "0");
    +"/" + day.padStart(2, "0");
    const dateA = new Date(today + " 17:30:00");
    const diffMSec = date.getTime() - dateA.getTime();
    const diffMin = diffMSec * (1 / (60 * 1000));

    if (diffMin <= 130) {
      return 9;
    } else if (diffMin > 130) {
      return 10;
    } else {
      return 8;
    }
  };
  return { getPeriod };
};
