import React from "react";
import { render, screen } from "@testing-library/react";
import Login from "./Login";
import { Provider } from "react-redux";
import { createMemoryHistory } from "history";
import configureStore from "redux-mock-store";
import { Router } from "react-router-dom";

const mockStore = configureStore([]);

describe("Login", () => {
  let store: any;
  let history: any;

  beforeEach(() => {
    store = mockStore({
      userAuth: {
        role: "admin",
        token: "some-token",
      },
    });
    history = createMemoryHistory();
  });
  it("displays the login box", () => {
    // Render the Login component
    render(
      <Provider store={store}>
        <Router history={history}>
          <Login />
        </Router>
      </Provider>
    );

    // Assert that the login box is displayed
    const loginBox = screen.getByTestId("login-box");
    expect(loginBox).toBeInTheDocument();
  });
});
