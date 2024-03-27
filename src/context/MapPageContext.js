import { createContext, useState, useEffect, useRef } from "react";
import { request } from "../apis/axios-utils";
import useUserId from "../hooks/useUserId";
import useErrorMessage from "../hooks/useErrorMessage";
import toast from "react-hot-toast";

export const MapContext = createContext();

const geofenceInitialState = {
  farmLat: null,
  farmLng: null,
  circleLat: null,
  circleLng: null,
  radius: 300,
  polygon: [],
  geoFenceType: null,
  address: "",
  err: null,
};

export const MapContentProvider = ({ children }) => {
  const [userLiveLocation, setUserLiveLocation] = useState({
    lat: null,
    lng: null,
    radius: null,
  });
  const [detectLocation, setDetectLocation] = useState(true);
  const [saveLocationData, setSaveLocationData] = useState(false);
  const [onGeofenceEdit, setOnGeofenceEdit] = useState(false);
  const [openBackdropLoader, setOpenBackdropLoader] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [customError, setCustomError] = useState({
    error: false,
    message: null,
  });
  const [geofenceLoading, setGeofenceLoading] = useState(false);
  const [geoFenceType, setGeoFenceType] = useState(null);
  const [polygonPath, setPolygonPath] = useState([]);
  const [selectedFenceType, setSelectedFenceType] = useState("");
  const [customRadius, setCustomRadius] = useState(null);
  const [draggedFarmLocation, setDraggedFarmLocation] = useState({
    lat: 0,
    lng: 0,
  });

  const [circleGeoFence, setCircleGeoFence] = useState({
    radius: 0,
    position: null,
  });
  const [isGeoFenceSave, setIsGeoFenceSaved] = useState(false);
  const { getErrorMessage } = useErrorMessage();

  //SNACKBAR ALERT
  const [snackbarAlert, setSnackbarAlert] = useState({
    open: false,
    type: "",
    message: "",
  });

  //Snackbar alert
  const onSnackbarAlertClose = () => {
    setSnackbarAlert({ open: false, type: "", message: "" });
  };

  const openSnackbarAlert = (type, message) => {
    setSnackbarAlert({
      open: true,
      type,
      message,
    });
  };

  const mapRef = useRef(null);
  const drawingManagerRef = useRef(null);
  const dmPolygonRef = useRef(null);
  const finalPoly = useRef(null);
  const dmCircleRef = useRef(null);
  const finalCircle = useRef(null);

  const addCustomError = (message) => {
    setCustomError({ error: true, message });
  };

  const removeCustomError = () => {
    setCustomError({ error: false, message: null });
  };

  // auto detect the location of the user
  const detectAutoLocation = () => {
    if ("geolocation" in navigator) {
      navigator?.geolocation?.getCurrentPosition(function (position) {
        setUserLiveLocation({
          ...userLiveLocation,
          lat: position?.coords?.latitude,
          lng: position?.coords?.longitude,
        });
      });
    } else {
      // alert("Error:Make sure to allow location access");
    }
    setDetectLocation(false);
  };

  //geofence
  const [geofenceCoordinates, setGeofenceCoordinates] =
    useState(geofenceInitialState);

  const getAddress = async (latitude, longitude) => {
    const controller = new AbortController();
    const signal = controller.signal;
    try {
      const res = await request({
        url: `/user/getAaddress?lat=${latitude}&lng=${longitude}`,
        signal:signal,
      });
      if (res?.status === 200) {
        const { data } = res?.data;
        setGeofenceCoordinates({
          ...geofenceCoordinates,
          farmLat: data?.lat,
          farmLng: data?.lng,
          address: data?.Address,
        });
      } else {
        const message = getErrorMessage(res);
        throw new Error(message);
      }
      setOpenBackdropLoader(false);
    } catch (error) {
      toast.error(error.message);
      setOpenBackdropLoader(false);
    }

    setIsLoading(false);
  };

  const getCoordinates = () => {
    return new Promise(function (resolve, reject) {
      navigator?.geolocation?.getCurrentPosition(resolve, reject);
    });
  };

  // GET GEOFENCE ADDRESS BY LAT AND LNG
  const getGeolocationAddress = async (autoDetect, latitude, longitude) => {
    setOpenBackdropLoader(true);
    setIsLoading(true);
    if (autoDetect) {
      getCoordinates()
        .then((position) => {
          if (position?.coords) {
            let { latitude, longitude } = position?.coords;
            getAddress(latitude, longitude);
          }
        })
        .catch((err) => {
          setOpenBackdropLoader(false);
          toast.error(err.message);
          setIsLoading(false);
        });
    } else {
      getAddress(latitude, longitude);
    }
  };

  const [editedRadius, setEditedRadius] = useState(null);

  // HANDLE GEOFENCE ADDRESS EDIT
  const handleGeofenceAddressEdit = () => {
    localStorage.removeItem("geofence");
    localStorage.removeItem("farmLocation");
    setGeofenceCoordinates({
      ...geofenceCoordinates,
      address: "",
      radius: 300,
    });
  };

  const userId = useUserId();
  //HANDEL GEOFENCE SUBMIT AND CREATE A GEOFENCE
  const handleCreateGeofence = async (customRadius) => {
    if (isGeoFenceSave || selectedFenceType === "circular") {
      setGeofenceLoading(true);
      localStorage.setItem("geofence", "done");
      let circleBody;
      console.log(selectedFenceType);
      if (selectedFenceType === "circular") {
        circleBody = {
          Address: geofenceCoordinates?.address,
          farmLat: geofenceCoordinates?.farmLat,
          farmLng: geofenceCoordinates?.farmLng,
          centerLat: geofenceCoordinates?.farmLat,
          centerLng: geofenceCoordinates?.farmLng,
          radius: Number(customRadius) || Number(geofenceCoordinates?.radius),
        };
      } else {
        circleBody = {
          Address: geofenceCoordinates?.address,
          farmLat: geofenceCoordinates?.farmLat,
          farmLng: geofenceCoordinates?.farmLng,
          centerLat: circleGeoFence?.position?.lat,
          centerLng: circleGeoFence?.position?.lng,
          radius: circleGeoFence?.radius,
        };
      }

      const polygonBody = {
        Address: geofenceCoordinates?.address,
        farmLat: geofenceCoordinates?.farmLat,
        farmLng: geofenceCoordinates?.farmLng,
        coordinates: polygonPath,
      };

      const body =
        geoFenceType === "polygon" && selectedFenceType === "custom"
          ? polygonBody
          : circleBody;
      try {
        const res = await request({
          url: `/user/addGeofence?geofenceType=${
            selectedFenceType === "circular" ? "circle" : geoFenceType
          }`,
          method: "POST",
          data: body,
        });
        if (res?.status === 200) {
          toast.success(res?.data?.message);
          setCustomRadius(null);
        } else {
          throw new Error(getErrorMessage(res));
        }
      } catch (error) {
        toast.error(error?.message);
      } finally {
        setGeofenceLoading(false);
      }
    } else {
      toast.error("Please Save the geofence first");
    }
  };

  //HANDLE GEO FENCE EDIT CANCEL
  const handleGeofenceCancel = () => {
    localStorage.setItem("geofence", "done");
    setGeofenceCoordinates(JSON.parse(localStorage.getItem("prevGeofence")));
    handleStartOver();
    setEditedRadius(null);
  };

  //HANDLE GEOFENCE EDIT SAVE
  const handleGeofenceSave = (customRadius) => {
    if (isGeoFenceSave || selectedFenceType === "circular") {
      // setOnGeofenceEdit(false);
      // setSaveLocationData(true);
      handleCreateGeofence(customRadius);
      localStorage.setItem("geofence", "done");
    } else {
      toast.error("Please Saved the geofence first");
    }
  };

  //HANDLE GEOFENCE EDIT
  const handleGeofenceEdit = () => {
    localStorage.setItem("geofence", "edit");
    drawingManagerRef.current?.setMap(mapRef.current);
    localStorage.setItem("prevGeofence", JSON.stringify(geofenceCoordinates));
    setGeofenceCoordinates({ ...geofenceCoordinates, radius: 300, polygon: [] });
  };

  //GET GEOFENCE DETAILS
  useEffect(() => {
    setOpenBackdropLoader(true);
    request({ url: `/user/getUsersGeofence?userID=${userId}` })
      .then((res) => {
        const { data } = res?.data;
        const formattedData = {
          farmLat: data.farmLat,
          farmLng: data.farmLng,
          circleLat: data?.centerLat,
          circleLng: data?.centerLng,
          radius: data?.radius,
          polygon: data?.coordinates,
          geoFenceType: data?.geofenceType,
          address: data.Address,
          err: null,
        };
        setGeofenceCoordinates(formattedData);
      })
      .catch((err) => {
        // alert(err.message)
      })
      .finally(() => setOpenBackdropLoader(false));
  }, [geofenceLoading]);

  const handleStartOver = () => {
    if (geoFenceType === "polygon") {
      setPolygonPath([]);
      dmPolygonRef.current?.setMap(null);
    } else {
      setCircleGeoFence({
        radius: 0,
        position: null,
      });
      dmCircleRef.current?.setMap(null);
    }

    // enable drawing mode
    drawingManagerRef.current?.setMap(mapRef.current);

    // enable drawing control
    drawingManagerRef.current?.setOptions({
      drawingControl: true,
    });
  };

  const handleGeofenceType = (type) => {
    setSelectedFenceType(type);
    if (type === "custom") {
      setGeofenceCoordinates({
        ...geofenceCoordinates,
        radius: 300,
      });
    } else {
      dmPolygonRef.current?.setMap(null);
      finalPoly.current?.setMap(null);
      setGeofenceCoordinates({
        ...geofenceCoordinates,
        polygon: [],
      });
    }
  };

  const handleFarmLocationDrag = (e) => {
    setDraggedFarmLocation({ lat: e?.latLng?.lat(), lng: e?.latLng?.lng() });
  };

  const saveFarmLocation = () => {
    getGeolocationAddress(
      false,
      draggedFarmLocation?.lat || geofenceCoordinates?.farmLat,
      draggedFarmLocation?.lng || geofenceCoordinates?.farmLng
    );
    localStorage.setItem("farmLocation", "true");
    if (geofenceCoordinates?.geoFenceType) {
      localStorage.setItem("geofence", "edit");
    }
  };

  return (
    <MapContext.Provider
      value={{
        detectAutoLocation,
        userLiveLocation,
        setUserLiveLocation,
        detectLocation,
        setDetectLocation,
        saveLocationData,
        setSaveLocationData,
        onGeofenceEdit,
        setOnGeofenceEdit,
        getGeolocationAddress,
        isLoading,
        geofenceCoordinates,
        handleGeofenceAddressEdit,
        handleCreateGeofence,
        setGeofenceCoordinates,
        setEditedRadius,
        handleGeofenceSave,
        handleGeofenceCancel,
        handleGeofenceEdit,
        snackbarAlert,
        onSnackbarAlertClose,
        openSnackbarAlert,
        openBackdropLoader,
        customError,
        addCustomError,
        removeCustomError,
        polygonPath,
        setPolygonPath,
        circleGeoFence,
        setCircleGeoFence,
        geoFenceType,
        setGeoFenceType,
        isGeoFenceSave,
        setIsGeoFenceSaved,
        mapRef,
        drawingManagerRef,
        dmPolygonRef,
        finalPoly,
        dmCircleRef,
        finalCircle,
        handleStartOver,
        selectedFenceType,
        setSelectedFenceType,
        customRadius,
        setCustomRadius,
        handleGeofenceType,
        handleFarmLocationDrag,
        saveFarmLocation,
      }}
    >
      {children}
    </MapContext.Provider>
  );
};
