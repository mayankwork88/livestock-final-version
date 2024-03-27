import { useTheme } from "@emotion/react";
import { Box, Divider, IconButton, Stack, Typography } from "@mui/material";
import React from "react";
import { DatePicker } from "../../../../ComponentsV2";
import { EditIcon } from "../../../../icons";

const BreedingCard = ({ data,isDryingDateEditable, onDryingDateEdit }) => {
  const theme = useTheme();

  const convertCamelCaseToTitle = (str) => {
    const result = str.replace(/([A-Z])/g, " $1");
    return result.charAt(0).toUpperCase() + result.slice(1);
  };
  return (
    <Stack
      width="100%"
      sx={{ background: "rgba(181, 139, 93, 0.1)", p: 2, borderRadius: "8px" }}
    >
      <Box display="flex" justifyContent="space-between">
        <Typography
          fontSize={"24px"}
          sx={{
            fontWeight: "600",
            textTransform: "capitalize",
            color: theme.palette.primary.main,
          }}
        >
          {data?.heading || "N/A"}
        </Typography>
      </Box>

      <Stack>
        {data?.data?.map((ele, ind) => (
          <Box
            key={ele?.value}
            display={"flex"}
            justifyContent={"space-between"}
            my={0}
            mt={ind === 0 ? 2 : 1}
          >
            <Box display="flex" gap={1}>
              <Typography fontSize={"16px"} sx={{display:'flex', alignItems:'center'}}>
                {convertCamelCaseToTitle(ele?.[0])}
              </Typography>
              {ele?.[0]?.toLowerCase() === "dryingdate" && isDryingDateEditable && (
                <IconButton
                  sx={{
                    background: theme.palette.primary.main,
                    color: "#fff",
                    borderRadius: 1,
                    "&:hover": {
                      color: theme.palette.primary.main,
                    },
                  }}
                  onClick={onDryingDateEdit}
                >
                  <EditIcon />
                </IconButton>
              )}
            </Box>
            <Typography
              fontSize={"16px"}
              sx={{ fontWeight: "bold", textTransform: "capitalize" }}
            >
              {ele?.[1]}
            </Typography>
          </Box>
        ))}
      </Stack>
    </Stack>
  );
};

export default BreedingCard;
