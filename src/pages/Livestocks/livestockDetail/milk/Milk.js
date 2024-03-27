import { Stack } from "@mui/material";
import React, { useState } from "react";
import MilkOverview from "./MilkOverview";
import MilkAnalytics from "./MilkAnalytics";
import { BtnGroup } from "../../../../ComponentsV2";

const breedingBtnData = [
  {
    label: "overview",
  },
  {
    label: "analytics",
  },
];

const Milk = () => {
  const [activeTab, setActiveTab] = useState("overview");
  return (
    <Stack my={2} direction="column" alignItems="center" gap={2}>
      <BtnGroup
        btnData={breedingBtnData}
        activeBtn={activeTab}
        onChange={(ele) => setActiveTab(ele)}
      />
      {activeTab === "overview" ? <MilkOverview /> : <MilkAnalytics />}
    </Stack>
  );
};

export default Milk;
