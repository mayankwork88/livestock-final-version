import React from "react";
import { Stack } from "@mui/material";
import {
  BtnLeftSideRound,
  BtnNoSideRound,
  BtnRightSideRound,
} from "./themeComponents";

const BtnGroup = ({ btnData, activeBtn, onChange,onAnimationEnd}) => {
  const getBtn = (ele, ind, animEnd) => {
    if (ind === 0) {
      return (
        <BtnLeftSideRound
          className={`${
            activeBtn === ele?.label || !activeBtn ? "active-btn__group" : null
          }`}
          onClick={() => onChange(ele.label)}
          onAnimationEnd={animEnd}
        >
          {ele.label}
        </BtnLeftSideRound>
      );
    } else if (ind === btnData?.length - 1) {
      return (
        <BtnRightSideRound
          className={`${activeBtn === ele?.label ? "active-btn__group" : null}`}
          onClick={() => onChange(ele.label)}
          onAnimationEnd={animEnd}
        >
          {ele.label}
        </BtnRightSideRound>
      );
    } else {
      return (
        <BtnNoSideRound
          className={`${activeBtn === ele?.label ? "active-btn__group" : null}`}
          onClick={() => onChange(ele.label)}
          onAnimationEnd={animEnd}
        >
          {ele.label}
        </BtnNoSideRound>
      );
    }
  };
  return (
    <Stack direction="row" alignItems="center" gap={0.5}>
      {btnData?.map((ele, ind) => getBtn(ele, ind, onAnimationEnd))}
    </Stack>
  );
};

export default BtnGroup;
