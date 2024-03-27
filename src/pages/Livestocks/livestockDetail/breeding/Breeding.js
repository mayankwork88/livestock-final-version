import { Stack } from "@mui/material";
import React, { useState } from "react";
import BreedingAI from "./BreedingAI";
import BreedingOverview from "./BreedingOverview";
import { BtnGroup } from "../../../../ComponentsV2";

const breedingBtnData = [
  {
    label: "overview",
  },
  {
    label: "AI",
  },
];

const Breeding = () => {
  const [activeTab, setActiveTab] = useState("overview");
  return (
    <Stack my={2} direction="column" alignItems="center" gap={2}>
      <BtnGroup
        btnData={breedingBtnData}
        activeBtn={activeTab}
        onChange={(ele) => setActiveTab(ele)}
      />
      {activeTab === "overview" ? <BreedingOverview /> : <BreedingAI />}
    </Stack>
  );
};

export default Breeding;
