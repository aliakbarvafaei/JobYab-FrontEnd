import "./index.css";
import "../node_modules/font-awesome/css/font-awesome.min.css";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { ToastProvider } from "./contexts/ToastState";
import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { indexRoutes } from "./routes";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { Provider } from "react-redux";
import { store } from "./redux/store";

const theme = createTheme({
  palette: {
    primary: {
      main: "#1976D2",
    },
    secondary: {
      main: "#D8DBE2",
    },
  },
  typography: {
    fontFamily: "IRANSans",
  },
  components: {
    MuiTypography: {
      styleOverrides: {
        root: {
          fontFamily: "IRANSans",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          fontFamily: "IRANSans",
        },
        outlinedSizeSmall: {
          fontFamily: "IRANSans",
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          fontFamily: "IRANSans",
        },
      },
    },
    MuiInput: {
      styleOverrides: {
        root: {
          fontFamily: "IRANSans",
        },
      },
    },
    MuiPagination: {
      styleOverrides: {
        root: {
          fontFamily: "IRANSans",
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        elevation: {
          boxShadow: "none",
        },
      },
    },
    MuiMenu: {
      styleOverrides: {
        list: {
          border: "2px solid #1976D2",
        },
      },
    },
  },
});
const App: React.FC = () => (
  <BrowserRouter>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <ToastProvider>
          <Switch>
            <TransitionGroup timeout={300} classNames="fade">
              {indexRoutes.map((prop, key) => {
                return (
                  <CSSTransition timeout={300} classNames="fade" key={key}>
                    <Route
                      path={prop.path}
                      key={key}
                      component={prop.component}
                    />
                  </CSSTransition>
                );
              })}
            </TransitionGroup>
          </Switch>
        </ToastProvider>
      </ThemeProvider>
    </Provider>
  </BrowserRouter>
);

export default App;
