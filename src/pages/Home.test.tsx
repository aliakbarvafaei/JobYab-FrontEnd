import React from "react";
import { render, screen } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store"; // Import your Redux store configuration

import Home from "./Home";

const mockStore = configureStore([]);

describe("Home", () => {
  let store: any;

  beforeEach(() => {
    store = mockStore({
      userAuth: {
        role: "admin",
        token: "some-token",
      },
    });
  });

  test("renders the component correctly", () => {
    render(
      <Router>
        <Provider store={store}>
          <Home />
        </Provider>
      </Router>
    );

    // Assertions
    expect(screen.getByText("آگهی های فوری")).toBeInTheDocument();
    expect(screen.getByText("آخرین آگهی ها")).toBeInTheDocument();
  });
});
