import React, { useRef, useCallback, useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import {
  GoogleMap,
  Marker,
  useJsApiLoader,
  Circle,
  Polygon,
  Autocomplete,
} from "@react-google-maps/api";
import {
  MarkerImg,
  SafeLivestockPointer,
  UnsafeLivestockPointer,
} from "../assets";
import useMapContext from "../hooks/useMapContext";
import { Skeleton } from ".";
import {
  Button,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
} from "@mui/material";
import { CloseIcon, RoomIcon } from "../icons";

const MAP_KEY = "AIzaSyBoq0tt73i_mEUB4gsGN8_ClQpD9d9RqFE";
const GetMap = ({
  mapWidth,
  mapHeight,
  isLivestocks,
  livestockData,
  geofenceCoordinates,
  createGeoFence,
  isFenceCircular,
}) => {
  const {
    getGeolocationAddress,
    polygonPath,
    setPolygonPath,
    circleGeoFence,
    setCircleGeoFence,
    geoFenceType,
    setGeoFenceType,
    setIsGeoFenceSaved,
    mapRef,
    drawingManagerRef,
    dmPolygonRef,
    finalPoly,
    dmCircleRef,
    finalCircle,
    handleStartOver,
    openSnackbarAlert,
    handleFarmLocationDrag,
  } = useMapContext();
  const circleRef = useRef();
  const searchedLocation = useRef(null);
  const [currentLocation, setCurrentLocation] = useState({ lat: 0, lng: 0 });

  useEffect(() => {
    const detectAutoLocation = () => {
      if ("geolocation" in navigator) {
        navigator?.geolocation?.getCurrentPosition(function (position) {
          setCurrentLocation({
            lat: position?.coords?.latitude,
            lng: position?.coords?.longitude,
          });
        });
      } else {
        toast.error("Error:Make sure to allow location access");
      }
    };

    if (!geofenceCoordinates?.farmLat || !geofenceCoordinates?.farmLng) {
      detectAutoLocation();
    }
  }, []);

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: MAP_KEY,
    libraries: ["drawing", "places"],
  });

  useEffect(() => {
    if (
      (createGeoFence || localStorage.getItem("geofence") === "edit") &&
      !isFenceCircular
    ) {
      drawingManagerRef.current?.setMap(mapRef.current);
      drawingManagerRef?.current?.setOptions({ drawingControl: true });
      drawingManagerRef?.current?.setDrawingMode(
        window.google.maps.drawing.OverlayType.POLYGON
      );
      // drawingManagerRef?.current?.setDr(true)
      finalCircle.current?.setMap(null);
      finalPoly.current?.setMap(null);
    } else {
      drawingManagerRef.current?.setMap(null);
    }
  }, [
    createGeoFence,
    drawingManagerRef.current,
    mapRef.current,
    isFenceCircular,
  ]);

  const handlePolygonEdit = (polygon) => {
    const paths = getPolygonPaths(polygon);
    setPolygonPath(paths);
  };

  const handleCircleEdit = (circle) => {
    const circleFence = {
      radius: circle?.radius || 0,
      position: {
        lat: circle?.center?.lat() || 0,
        lng: circle?.center?.lng() || 0,
      },
    };
    setCircleGeoFence(circleFence);
  };

  const getPolygonPaths = (polygon) => {
    const polyArray = polygon.getPath().getArray();
    const paths = [];
    polyArray.forEach((path) => {
      paths.push({ lat: path.lat(), lng: path.lng() });
    });
    return paths;
  };

  const onPolygonComplete = (event) => {
    if (event.type == window?.google.maps.drawing.OverlayType.POLYGON) {
      setGeoFenceType("polygon");
      const polygon = event.overlay;

      // Disable drawing mode
      drawingManagerRef.current.setDrawingMode(null);

      // Allow the user to edit the drawn polygon
      polygon.setEditable(true);

      // Remove drawing control
      drawingManagerRef.current.setOptions({
        drawingControl: false,
      });

      dmPolygonRef.current = polygon;
      const polyArray = getPolygonPaths(polygon);
      window?.google.maps.event.addListener(polygon, "mouseup", () =>
        handlePolygonEdit(polygon)
      );
      window?.google.maps.event.addListener(polygon, "dragend", () =>
        handlePolygonEdit(polygon)
      );
      setPolygonPath(polyArray);
      // You can add listeners to the polygon as well
      //   window?.google.maps.event.addListener(polygon, "click", function () {
      //     // Handle click event on the polygon
      //   });
    } else if (event.type == window?.google.maps.drawing.OverlayType.CIRCLE) {
      setGeoFenceType("circle");
      const circle = event.overlay;
      dmCircleRef.current = circle;

      // Disable drawing mode
      drawingManagerRef.current.setDrawingMode(null);

      // Allow the user to edit the drawn polygon
      circle.setEditable(true);

      // Remove drawing control
      drawingManagerRef.current.setOptions({
        drawingControl: false,
      });

      const circleFence = {
        radius: circle?.radius || 0,
        position: {
          lat: circle?.center?.lat() || 0,
          lng: circle?.center?.lng() || 0,
        },
      };
      setCircleGeoFence(circleFence);

      window?.google.maps.event.addListener(circle, "center_changed", () =>
        handleCircleEdit(circle)
      );
      window?.google.maps.event.addListener(circle, "radius_changed", () =>
        handleCircleEdit(circle)
      );
    }
  };

  const onLoad = useCallback(function callback(map) {
    mapRef.current = map;
    map.setZoom(15);
    // ADD A DRAWING MANAGER TO MAP
    let drawingManager = new window.google.maps.drawing.DrawingManager({
      drawingControl: true,
      drawingMode: window.google.maps.drawing.OverlayType.POLYGON,
      drawingControlOptions: {
        position: window.google.maps.ControlPosition.TOP_CENTER,
        drawingModes: [
          window.google.maps.drawing.OverlayType.POLYGON,
          // window.google.maps.drawing.OverlayType.CIRCLE,
        ],
      },
      polygonOptions: {
        fillColor: "#FF0000",
        fillOpacity: 0.5,
        strokeWeight: 2,
        clickable: true,
        editable: true,
      },
    });
    // CREATE A REF TO DRAWING MANAGER
    drawingManagerRef.current = drawingManager;
    // CONNECT THE DM WITH MAP INSTANCE

    // LISTEN FOR EVENT WHEN POLYGON COMPLETE
    window.google.maps.event.addListener(
      drawingManager,
      "overlaycomplete",
      onPolygonComplete
    );
  }, []);

  const onPolygonSave = () => {
    if (geoFenceType && (circleGeoFence?.radius || polygonPath?.length > 2)) {
      localStorage.setItem("hideCancel", "true");
      const polygon = new window.google.maps.Polygon({
        paths: polygonPath,
        strokeColor: "#06B95F",
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: "#06B95F",
        fillOpacity: 0.35,
        clickable: false,
      });
      const circle = new window.google.maps.Circle({
        center: circleGeoFence?.position,
        radius: circleGeoFence?.radius,
        strokeColor: "#06B95F",
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: "#06B95F",
        fillOpacity: 0.35,
        clickable: false,
      });

      const farmLocation = {
        lat: Number(geofenceCoordinates.farmLat),
        lng: Number(geofenceCoordinates.farmLng),
      };

      if (geoFenceType === "polygon") {
        const isInside = window?.google?.maps?.geometry?.poly?.containsLocation(
          farmLocation,
          polygon
        );
        if (isInside) {
          finalPoly.current = polygon;
          polygon.setMap(mapRef.current);
          dmPolygonRef.current.setMap(null);
          drawingManagerRef.current.setMap(null);
          setIsGeoFenceSaved(true);
        } else {
          toast.error("the farm location must be inside geofence");
        }
      } else {
        const distance =
          window.google.maps.geometry.spherical.computeDistanceBetween(
            farmLocation,
            circleGeoFence?.position
          );

        if (distance <= circleGeoFence?.radius) {
          finalCircle.current = circle;
          circle.setMap(mapRef.current);
          dmCircleRef.current.setMap(null);
          drawingManagerRef.current.setMap(null);
          setIsGeoFenceSaved(true);
        } else {
          toast.error("the farm location must be inside geofence");
        }
      }
    } else {
      toast.error("error", "please create a geofence first");
    }
  };

  const onUnmount = useCallback(function callback(map) {
    mapRef.current = null;
  }, []);

  const getLivestockImg = (status) =>
    status?.toLowerCase() === "safe"
      ? SafeLivestockPointer
      : UnsafeLivestockPointer;

  let timer;
  const handleMapCenterChanged = () => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      getGeolocationAddress(
        false,
        mapRef.current?.center?.lat(),
        mapRef.current?.center?.lng()
      );
    }, 500);
  };

  function GetLatLong(address) {
    var geocoder = new window.google.maps.Geocoder();

    return geocoder.geocode(
      {
        address: address,
      },
      function (results, status) {
        if (status == window.google.maps.GeocoderStatus.OK) {
          return results[0].geometry.location;
        }
      }
    );
  }

  const onPlaceChange = async (e) => {
    let location = await GetLatLong(searchedLocation.current.value);
    const lat = location?.results[0]?.geometry?.location?.lat();
    const lng = location?.results[0]?.geometry?.location?.lng();

    if (lat && lng) {
      getGeolocationAddress(false, lat, lng);
    } else {
      toast.error("No location found, location must be from the dropdown");
    }
  };

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={{
        width: mapWidth,
        height: mapHeight,
      }}
      options={{
        // streetViewControl: false,
        // zoomControl: false,
        mapTypeControl: !createGeoFence,
        // mapTypeControl: false,
        // fullscreenControl: false,
        mapTypeId: "hybrid",
      }}
      onDrag={
        !localStorage.getItem("farmLocation") ? handleMapCenterChanged : null
      }
      onClick={(e) =>
        !localStorage.getItem("farmLocation")
          ? getGeolocationAddress(false, e.latLng.lat(), e.latLng.lng())
          : null
      }
      center={{
        lat:
          Number(geofenceCoordinates?.farmLat) || Number(currentLocation?.lat),
        lng:
          Number(geofenceCoordinates?.farmLng) || Number(currentLocation?.lng),
      }}
      defaultZoom={15}
      zoom={15}
      onLoad={onLoad}
      onUnmount={onUnmount}
    >
      {!localStorage.getItem("farmLocation") && (
        <Autocomplete onPlaceChanged={onPlaceChange}>
          <TextField
            inputRef={searchedLocation}
            size="small"
            label="Search locations"
            placeholder="Search locations..."
            InputProps={{
              endAdornment: (
                <InputAdornment
                  position="end"
                  onClick={() => (searchedLocation.current.value = "")}
                >
                  <CloseIcon />
                </InputAdornment>
              ),
            }}
            sx={{
              background: "#fff",
              position: "absolute",
              left: "50%",
              top: "2%",
              transform: "translateX(-50%)",
              borderRadius: "8px",
            }}
          />
        </Autocomplete>
      )}

      {isLivestocks &&
        livestockData &&
        livestockData?.map(({ id, position, safeUnsafeStatus }) => (
          <Marker
            key={id}
            position={{
              lat: Number(position?.lat),
              lng: Number(position?.lng),
            }}
            icon={{
              url: getLivestockImg(safeUnsafeStatus),
              scaledSize:
                window && window.google && new window.google.maps.Size(15, 15),
            }}
          />
        ))}
      {localStorage.getItem("farmLocation") && (
        <Marker
          key="dcdcde323ddccddc3ded3de"
          draggable={!localStorage.getItem("farmLocation")}
          onDrag={handleFarmLocationDrag}
          title="marker"
          position={{
            lat: Number(geofenceCoordinates?.farmLat) || 0,
            lng: Number(geofenceCoordinates?.farmLng) || 0,
          }}
        />
      )}

      {localStorage.getItem("geofence") !== "edit" &&
      localStorage.getItem("farmLocation") ? (
        geofenceCoordinates?.geofenceType?.toLowerCase() === "polygon" ||
        geofenceCoordinates?.geoFenceType?.toLowerCase() === "polygon" ? (
          <Polygon
            paths={
              geofenceCoordinates?.polygon || geofenceCoordinates?.coordinates
            }
            options={{
              strokeColor: "#06B95F",
              strokeOpacity: 0.8,
              strokeWeight: 2,
              fillColor: "#06B95F",
              fillOpacity: 0.35,
              clickable: false,
            }}
          />
        ) : (
          <Circle
            center={{
              lat: Number(geofenceCoordinates?.farmLat),
              lng: Number(geofenceCoordinates?.farmLng),
            }}
            radius={
              localStorage.getItem("geofence") === "edit"
                ? 0
                : Number(geofenceCoordinates?.radius)
            }
            options={{
              strokeColor: "#06B95F",
              strokeOpacity: 1,
              strokeWeight: 2,
              fillColor: "#06B95F",
              fillOpacity: 0.35,
              clickable: false,
              draggable: false,
              editable: false,
              visible: true,
            }}
          />
        )
      ) : null}
      {localStorage.getItem("geofence") === "edit" && isFenceCircular && (
        <Circle
          center={{
            lat: Number(geofenceCoordinates?.farmLat),
            lng: Number(geofenceCoordinates?.farmLng),
          }}
          radius={Number(geofenceCoordinates?.radius)}
          options={{
            strokeColor: "#06B95F",
            strokeOpacity: 1,
            strokeWeight: 2,
            fillColor: "#06B95F",
            fillOpacity: 0.35,
            clickable: false,
            draggable: false,
            editable: false,
            visible: true,
          }}
        />
      )}
      {!localStorage.getItem("farmLocation") && (
        <IconButton
          sx={{
            fontSize: "1.2rem",
            fontWeight: "bold",
            position: "absolute",
            top: "47%",
            left: "50%",
            transform: "translate(-50%,-50%)",
            pointerEvents: "none",
          }}
        >
          <RoomIcon sx={{ color: "#FF0505", fontSize: "45px" }} />
        </IconButton>
      )}
      {createGeoFence &&
        !isFenceCircular &&
        localStorage.getItem("farmLocation") && (
          <Stack direction={"row"} gap={1} p={1}>
            <Button
              variant="contained"
              sx={{ fontSize: "1.2rem", fontWeight: "bold" }}
              onClick={handleStartOver}
            >
              Start Over
            </Button>
            <Button
              variant="contained"
              onClick={onPolygonSave}
              sx={{ fontSize: "1.2rem", fontWeight: "bold" }}
            >
              Save
            </Button>
          </Stack>
        )}
    </GoogleMap>
  ) : (
    <Skeleton width={mapWidth} height={mapHeight} />
  );
};

export default GetMap;
