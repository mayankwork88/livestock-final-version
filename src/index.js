import ReactDOM from "react-dom/client";
import { QueryClientProvider, QueryClient } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MapContentProvider } from "./context/MapPageContext";
import { CollarContextProvider } from "./context/CollarContext";
import { LivestockContextProvider } from "./context/LivestockContext";
import { ProfileContextProvider } from "./context/profileContext";
import { AuthContextProvider } from "./context/AuthContext";
import { NotificationContextProvider } from "./context/NotificationContext";
import { LivestockHealthContextProvider } from "./context/LivestockHealthContext";
import { AlertsContextProvider } from "./context/AlertsContext";
import { DeviceDetailContextProvider } from "./context/DeviceDetailContext";
import { UserManagementContextProvider } from "./Role/Admin/UserManagemnet/context/UserManagementContext";
import { createTheme, ThemeProvider, CssBaseline } from "@mui/material";
import "./assets/css/style.css";
import "./assets/css/header.css";
import "./index.css";
import { ShowToast } from "./ComponentsV2";
import App from "./App";

const labelFontSize = "1.5rem";
const theme = createTheme({
  palette: {
    primary: {
      main: "#B58B5D",
    },
  },
  components: {
    MuiInputLabel: {
      styleOverrides: {
        root: {
          fontSize: labelFontSize,
        },
      },
    },
    MuiFormHelperText: {
      styleOverrides: {
        root: {
          fontSize: "1.2rem",
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          fontSize: labelFontSize,
        },
      },
    },
  },
});

const queryClient = new QueryClient();

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <AuthContextProvider>
        <NotificationContextProvider>
          <UserManagementContextProvider>
            <MapContentProvider>
              <CollarContextProvider>
                <DeviceDetailContextProvider>
                  <LivestockContextProvider>
                    <LivestockHealthContextProvider>
                      <ProfileContextProvider>
                        <AlertsContextProvider>
                          <ThemeProvider theme={theme}>
                            <CssBaseline />
                            <Routes>
                              <Route path="/*" element={<App />} />
                            </Routes>
                          </ThemeProvider>
                        </AlertsContextProvider>
                      </ProfileContextProvider>
                    </LivestockHealthContextProvider>
                  </LivestockContextProvider>
                </DeviceDetailContextProvider>
              </CollarContextProvider>
            </MapContentProvider>
          </UserManagementContextProvider>
        </NotificationContextProvider>
      </AuthContextProvider>
    </BrowserRouter>
    <ReactQueryDevtools initialIsOpen={false} />
    <ShowToast />
  </QueryClientProvider>
);
