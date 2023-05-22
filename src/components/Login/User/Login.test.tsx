import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";
import LoginUser from "./Login";

const mockStore = configureStore([]);

describe("LoginUser", () => {
  let store: any;
  let history: any;

  beforeEach(() => {
    store = mockStore({});
    history = createMemoryHistory();
  });

  test("renders the component correctly", () => {
    render(
      <Provider store={store}>
        <Router history={history}>
          <LoginUser changeLoginSign={() => {}} />
        </Router>
      </Provider>
    );

  });

  test("handles form submission successfully", () => {
    render(
      <Provider store={store}>
        <Router history={history}>
          <LoginUser changeLoginSign={() => {}} />
        </Router>
      </Provider>
    );

    // Fill in the email and password fields
    const email = screen.getByText("ایمیل") as HTMLInputElement;
    const pass = screen.getByText("رمزعبور") as HTMLInputElement;

    email.value = "test@gmail.com";
    pass.value = "password123";

    // Submit the form
    fireEvent.click(screen.getByText("ورود"));

    // Add your assertions here
    expect(email.value).toBe("test@gmail.com");
    expect(pass.value).toBe("password123");
  });

});
