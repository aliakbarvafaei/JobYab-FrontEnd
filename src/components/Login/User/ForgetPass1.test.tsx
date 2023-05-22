import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store"; // Import your Redux store configuration

import ForgetPass1User from "./ForgetPass1";

const mockStore = configureStore([]);

describe("ForgetPass1User", () => {
  let store: any;

  beforeEach(() => {
    store = mockStore({});
  });

  test("submits the form and calls the appropriate functions", async () => {
    const changeLoginSignMock = jest.fn();
    const setToastStateMock = jest.fn();

    render(
      <Router>
        <Provider store={store}>
          <ForgetPass1User changeLoginSign={changeLoginSignMock} />
        </Provider>
      </Router>
    );

    const emailInput = screen.getByText("ایمیل") as HTMLInputElement;
    const submitButton = screen.getByText("ارسال کد");

    // Enter a valid email in the input field
    emailInput.value = "test@example.com";

    // Submit the form
    fireEvent.click(submitButton);

    // Assertions
    expect(emailInput.value).toBe("test@example.com");
    expect(changeLoginSignMock).toHaveBeenCalledTimes(0);
    expect(setToastStateMock).toHaveBeenCalledTimes(0);
  });

  test("renders the component correctly", () => {
    render(
      <Router>
        <Provider store={store}>
          <ForgetPass1User changeLoginSign={() => {}} />
        </Provider>
      </Router>
    );

    // Assertions
    expect(screen.getByText("فراموشی رمز حساب کارجو")).toBeInTheDocument();
  });
  test("renders the component", () => {
    render(
      <Router>
        <Provider store={store}>
          <ForgetPass1User changeLoginSign={() => {}} />
        </Provider>
      </Router>
    );

    // Assertions
    expect(screen.getByText("ایمیل")).toBeInTheDocument();
  });
  test("renders", () => {
    render(
      <Router>
        <Provider store={store}>
          <ForgetPass1User changeLoginSign={() => {}} />
        </Provider>
      </Router>
    );

    // Assertions
    expect(screen.getByText("ارسال کد")).toBeInTheDocument();
    expect(screen.getByText("بازگشت")).toBeInTheDocument();
  });
});
