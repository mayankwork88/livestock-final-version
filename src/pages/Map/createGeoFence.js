import React, { useEffect, useState } from "react";
import { Typography, Paper, Stack, Box } from "@mui/material";
import {
  GetMap,
  SkeletonLoader,
  CustomSelect,
  CustomInput,
} from "../../ComponentsV2";
import RadioGroupComp from "./RadioGroup";
import { styled } from "@mui/system";
import {
  ButtonPrimary,
  ButtonOutlinedRound,
} from "../../ComponentsV2/themeComponents";
import useMapContext from "../../hooks/useMapContext";
import toast from "react-hot-toast";

const geofenceOptions = [
  {
    label: "Circular",
    value: "circular",
  },
  {
    label: "Custom",
    value: "custom",
  },
];

const geofenceData = [
  {
    label: "Other",
    value: "other",
  },
  {
    label: "100",
    value: "100",
  },
  {
    label: "200",
    value: "200",
  },
  {
    label: "300",
    value: "300",
  },
  {
    label: "400",
    value: "400",
  },
  {
    label: "500",
    value: "500",
  },
  {
    label: "800",
    value: "800",
  },
  {
    label: "1000",
    value: "1000",
  },
];

const CreateGeoFence = () => {
  const {
    saveLocationData,
    onGeofenceEdit,
    getGeolocationAddress,
    geofenceCoordinates,
    isLoading,
    handleGeofenceAddressEdit,
    handleCreateGeofence,
    handleGeofenceSave,
    handleGeofenceCancel,
    handleGeofenceEdit,
    addCustomError,
    removeCustomError,
    isGeoFenceSave,
    setGeofenceCoordinates,
    selectedFenceType,
    setSelectedFenceType,
    customRadius,
    setCustomRadius,
    handleGeofenceType,
    saveFarmLocation,
  } = useMapContext();

  const Para = styled(Typography)({
    fontSize: "1.8rem",
    fontWeight: 600,
    margin: "0px 0",
  });
  const ParaV2 = styled(Typography)({
    fontSize: "1.5rem",
    fontWeight: 600,
    margin: "10px 0",
  });
  const ParaV3 = styled(Typography)({
    fontSize: "1.2rem",
    fontWeight: 600,
    margin: "5px 0 5px 0",
    textAlign: "justify",
  });

  const handleSubmit = (customRadius) => {
    handleGeofenceSave(customRadius);
  };

  const handleFenceUpdate = (radius) => {
    setGeofenceCoordinates({
      ...geofenceCoordinates,
      radius,
      geoFenceType: "circle",
    });
  };

  useEffect(() => {
    if (geofenceCoordinates?.geoFenceType?.toLowerCase() !== "polygon") {
      setSelectedFenceType("circular");
    }
  }, []);

  const handleGeofenceCreation = () => {
    if (selectedFenceType === "circular") {
      if (
        !geofenceCoordinates?.radius &&
        geofenceCoordinates?.radius?.toString()?.toLowerCase() !== "other"
      ) {
        toast.error("Please select a radius first");
      } else if (
        geofenceCoordinates?.radius?.toString()?.toLowerCase() === "other" &&
        !customRadius
      ) {
        setCustomRadius(null);
        toast.error("Please enter a value for radius");
      } else {
        if (customRadius < 0 || Number(customRadius)?.toString() === "NaN") {
          setCustomRadius(null);
          toast.error("Please enter a valid value");
        } else {
          handleCreateGeofence(customRadius);
        }
      }
    } else {
      handleCreateGeofence(customRadius);
    }
  };

  const handleGeofenceSubmit = () => {
    if (selectedFenceType === "circular") {
      console.log( geofenceCoordinates?.radius, "cfjbvnfjnfjvnfjnjvf")
      if (
        !geofenceCoordinates?.radius &&
        geofenceCoordinates?.radius?.toString()?.toLowerCase() !== "other"
      ) {
        toast.error("Please select a radius first");
      } else if (
        geofenceCoordinates?.radius?.toString()?.toLowerCase() === "other" &&
        !customRadius
      ) {
        setCustomRadius(null);
        toast.error("Please enter a value for radius");
      } else {
        if (customRadius < 0 || Number(customRadius)?.toString() === "NaN") {
          setCustomRadius(null);
          toast.error("Please enter a valid value");
        } else {
          handleCreateGeofence(customRadius);
        }
      }
    } else {
      handleSubmit(customRadius);
    }
  };

  const getGeofenceData = (data) => {
    if (geofenceCoordinates?.radius) {
      const isPresent = data?.some(
        (ele) => ele?.value == geofenceCoordinates?.radius
      );
      if (isPresent) {
        return data;
      } else {
        return [
          ...data,
          {
            label: String(geofenceCoordinates?.radius),
            value: String(geofenceCoordinates?.radius),
          },
        ];
      }
    } else {
      return data;
    }
  };

  return (
    <Stack
      direction="row"
      justifyContent="space-between"
      mt={3}
      sx={{ gap: { xl: 5, lg: 5, md: 3, sm: 2 } }}
    >
      <Stack
        direction="column"
        sx={{ width: { xl: "19%", lg: "25%", md: "25%", sm: "30%" } }}
      >
        {!geofenceCoordinates?.address ? (
          <Paper elevation={2} sx={{ padding: 2 }}>
            <Para variant="h5">Step 1 : Farm Location</Para>
            <ParaV2 variant="h5">Mark Location on map manually</ParaV2>
            <Para variant="h2" sx={{ margin: "30px 0" }}>
              OR
            </Para>
            <ButtonPrimary
              variant="contained"
              sx={{
                width: "100%",
                padding: "5px 0",
                display: "flex",
                justifyContent: "center",
              }}
              onClick={() => getGeolocationAddress(true, null, null)}
            >
              Auto detect location
            </ButtonPrimary>
          </Paper>
        ) : isLoading ? (
          <SkeletonLoader width={280} height={280} />
        ) : (
          <>
            <Paper elevation={2} sx={{ py: 1, px: 2, maxWidth: 280 }}>
              <Para variant="h5">
                {localStorage.getItem("farmLocation")
                  ? "Step 1 : Farm Location"
                  : "Detected Location"}
              </Para>
              <ParaV2 variant="h5" sx={{ marginBottom: 0 }}>
                Address:
              </ParaV2>
              <ParaV3 variant="h5">{geofenceCoordinates?.address}</ParaV3>
              <ParaV2 variant="h5">Lat: {geofenceCoordinates?.farmLat?.toString()?.slice(0,8)}</ParaV2>
              <ParaV2 variant="h5">Lng: {geofenceCoordinates?.farmLng?.toString()?.slice(0,8)}</ParaV2>
              {localStorage.getItem("geofence") === "edit" ||
              !Boolean(localStorage.getItem("geofence")) ? (
                !localStorage.getItem("farmLocation") ? (
                  <Stack direction={"row"} gap={2}>
                    <ButtonPrimary
                      variant="contained"
                      sx={{
                        width: "100%",
                        padding: "5px 0",
                        display: "flex",
                        justifyContent: "center",
                      }}
                      onClick={handleGeofenceAddressEdit}
                    >
                      Cancel
                    </ButtonPrimary>
                    <ButtonPrimary
                      variant="contained"
                      sx={{
                        width: "100%",
                        padding: "5px 0",
                        display: "flex",
                        justifyContent: "center",
                      }}
                      onClick={saveFarmLocation}
                    >
                      Save
                    </ButtonPrimary>
                  </Stack>
                ) : (
                  <Stack direction={"row"} gap={2}>
                    <ButtonPrimary
                      variant="contained"
                      sx={{
                        width: "100%",
                        padding: "5px 0",
                        display: "flex",
                        justifyContent: "center",
                      }}
                      onClick={handleGeofenceAddressEdit}
                    >
                      Edit
                    </ButtonPrimary>
                  </Stack>
                )
              ) : null}
            </Paper>
            {localStorage.getItem("farmLocation") && (
              <Paper elevation={2} sx={{ py: 1, px: 2, marginTop: 2 }}>
                <Para variant="h5">Step 2 : Create Geofence</Para>
                <ParaV2 variant="h5" sx={{ mt: 0.8 }}>
                  Draw Geofence on the map
                </ParaV2>
                {localStorage.getItem("geofence") === "edit" ||
                !Boolean(localStorage.getItem("geofence")) ? (
                  <RadioGroupComp
                    options={geofenceOptions}
                    selectedValue={selectedFenceType}
                    onSelect={(val) => handleGeofenceType(val)}
                  />
                ) : null}

                {selectedFenceType === "circular" &&
                (geofenceCoordinates?.geoFenceType?.toLowerCase() !==
                  "polygon" ||
                  localStorage.getItem("geofence") === "edit") ? (
                  <>
                    <CustomInput
                      disabled={localStorage.getItem("geofence") === "done"}
                      label="Geofence Radius(meters)"
                      select
                      register={() => {}}
                      selectData={getGeofenceData(geofenceData)}
                      value={
                        geofenceCoordinates?.radius
                          ? String(geofenceCoordinates?.radius)
                          : "300"
                      }
                      isError={{ error: false, message: "" }}
                      onChange={(e) => handleFenceUpdate(e.target.value)}
                    />
                    {geofenceCoordinates?.radius?.toString()?.toLowerCase() ===
                      "other" && (
                      <CustomInput
                        label="Custom Radius(meters)"
                        register={() => {}}
                        type="number"
                        value={customRadius}
                        isError={{ error: false, message: "" }}
                        onChange={(e) => setCustomRadius(e.target.value)}
                      />
                    )}
                  </>
                ) : null}
              </Paper>
            )}
            {localStorage.getItem("geofence") === "edit" ? null : (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "right",
                  margin: "20px 0",
                }}
              >
                {localStorage.getItem("geofence") === "done" ? (
                  <ButtonPrimary
                    variant="contained"
                    sx={{
                      width: "100px",
                      padding: "5px 0",
                      display: "flex",
                      justifyContent: "center",
                    }}
                    onClick={handleGeofenceEdit}
                  >
                    Edit
                  </ButtonPrimary>
                ) : (
                  localStorage.getItem("farmLocation") && (
                    <ButtonPrimary
                      variant="contained"
                      sx={{
                        width: "100px",
                        padding: "5px 0",
                        display: "flex",
                        justifyContent: "center",
                      }}
                      onClick={handleGeofenceCreation}
                    >
                      Submit
                    </ButtonPrimary>
                  )
                )}
              </Box>
            )}
            {localStorage.getItem("geofence") === "edit" &&
              localStorage.getItem("farmLocation") && (
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "right",
                    margin: "20px 0",
                  }}
                >
                  {localStorage.getItem("hideCancel") === "true" ? null : (
                    <ButtonOutlinedRound
                      variant="outlined"
                      sx={{ minWidth: "100px", borderRadius: 1 }}
                      onClick={handleGeofenceCancel}
                    >
                      Cancel
                    </ButtonOutlinedRound>
                  )}
                  <ButtonPrimary
                    variant="contained"
                    sx={{
                      width: "100px",
                      padding: "5px 0",
                      display: "flex",
                      justifyContent: "center",
                    }}
                    onClick={handleGeofenceSubmit}
                  >
                    Submit
                  </ButtonPrimary>
                </Box>
              )}
          </>
        )}
      </Stack>
      <Stack sx={{ width: { xl: "81%", lg: "75%", md: "75%", sm: "70%" } }}>
        <GetMap
          mapWidth="100%"
          mapHeight="600px"
          geofenceCoordinates={geofenceCoordinates}
          createGeoFence={
            Boolean(localStorage.getItem("geofence"))
              ? localStorage.getItem("geofence") === "done"
                ? false
                : true
              : Boolean(geofenceCoordinates?.address)
          }
          isFenceCircular={selectedFenceType?.toLowerCase() === "circular"}
        />
      </Stack>
    </Stack>
  );
};

export default CreateGeoFence;
