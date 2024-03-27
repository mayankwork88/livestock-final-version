import * as React from "react";
import PropTypes from "prop-types";
import { Tabs, Tab, Typography, Box } from "@mui/material";
import { styled } from "@mui/system";
import { useEffect } from "react";

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function CustomTabs({ tabData, onTabChange, tabValue = 0 }) {
  const [value, setValue] = React.useState(tabValue);
  useEffect(() => {
    const tab = Number(localStorage.getItem("currentTab"));
    setValue(tabValue);
  }, [tabValue]);


  useEffect(() => {
    const tab = Number(localStorage.getItem("currentTab"));
    if (tab) {
      const val =
        Number(localStorage.getItem("currentTab")) > tabData?.length - 1
          ? 0
          : tab;
      setValue(val);
    }
  }, [value, tabValue]);

  useEffect(() => {
    const tab = Number(localStorage.getItem("currentTab"));
    if (!tab) {
      localStorage.setItem("currentTab", 0);
    } else {
      setValue(tab);
    }
  }, []);

  const handleChange = (event, newValue) => {
    localStorage.setItem("currentTab", newValue);
    setValue(newValue);
    onTabChange?.(newValue);
  };

  const TabV2 = styled(Tab)({
    fontSize: "1.2rem",
    fontWeight: 600,
  });

  const getTab = (comp) => {
    return tabData?.map((ele, ind) => {
      if (comp === "label") {
        return (
          <TabV2
            className="tab-color"
            key={ele.label}
            label={ele?.label}
            {...a11yProps(0)}
          />
        );
      } else {
        return (
          <CustomTabPanel value={value} index={ind}>
            {ele?.child}
          </CustomTabPanel>
        );
      }
    });
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          TabIndicatorProps={{
            style: {
              backgroundColor: "#B58B5D",
              color: "red",
            },
          }}
          aria-label="basic tabs example"
        >
          {getTab("label")}
        </Tabs>
      </Box>
      {getTab("child")}
    </Box>
  );
}
