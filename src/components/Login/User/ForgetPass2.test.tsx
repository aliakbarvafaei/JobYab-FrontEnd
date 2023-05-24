import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import ForgetPass2User from "./ForgetPass2";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";

const mockStore = configureStore([]);

describe("ForgetPass2User", () => {
  let store: any;

  beforeEach(() => {
    store = mockStore({});
  });
  it("submits the form with correct values", () => {
    // Mock the necessary dependencies and context
    const changeLoginSignMock = jest.fn();
    const setToastStateMock = jest.fn();
    const resetPassAPIMock = jest.fn().mockResolvedValue({ status: 200 });

    // Render the component
    render(
      <Router>
        <Provider store={store}>
          <ForgetPass2User changeLoginSign={changeLoginSignMock} />
        </Provider>
      </Router>
    );

    // Fill in the form inputs
    const emailInput = screen.getByText("ایمیل") as HTMLInputElement;
    emailInput.value = "test@example.com";

    const codeInput = screen.getByText("کد ارسالی") as HTMLInputElement;
    codeInput.value = "123456";

    const passwordInput = screen.getByText("رمز جدید") as HTMLInputElement;
    passwordInput.value = "newPassword";

    // Submit the form
    const submitButton = screen.getByText("ارسال");
    fireEvent.click(submitButton);
  });
});
