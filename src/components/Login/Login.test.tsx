import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import LoginBox from "./Login";
import { Provider } from "react-redux";
import { createMemoryHistory } from "history";
import configureStore from "redux-mock-store";
import { Router } from "react-router-dom";

const mockStore = configureStore([]);

describe("LoginBox", () => {
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

  it("renders the login form by default", () => {
    render(
      <Provider store={store}>
        <Router history={history}>
          <LoginBox />
        </Router>
      </Provider>
    );

    // Assert that the login form is rendered
    const loginForm = screen.getByText("ورود به بخش کارجو");
    expect(loginForm).toBeInTheDocument();
  });

  it('switches to the registration form when the "Register" tab is clicked', () => {
    render(
      <Provider store={store}>
        <Router history={history}>
          <LoginBox />
        </Router>
      </Provider>
    );

    // Click the "Register" tab
    const registerTab = screen.getByText("کارجو");
    fireEvent.click(registerTab);

    // Assert that the registration form is rendered
    const registrationForm = screen.getByText("ورود به بخش کارجو");
    expect(registrationForm).toBeInTheDocument();
  });
});
