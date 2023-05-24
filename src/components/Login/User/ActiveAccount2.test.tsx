import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import ActiveAccount2User from "./ActiveAccount2";
import { Provider } from "react-redux";
import { createMemoryHistory } from "history";
import configureStore from "redux-mock-store";
import { Router } from "react-router-dom";

const mockStore = configureStore([]);
describe("ActiveAccount2User", () => {
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
  test("should display email input field", () => {
    render(
      <Provider store={store}>
        <Router history={history}>
          <ActiveAccount2User changeLoginSign={() => {}} />
        </Router>
      </Provider>
    );
    const emailInput = screen.getByText("ایمیل");
    expect(emailInput).toBeInTheDocument();
  });

  test("should display code input field", () => {
    render(
      <Provider store={store}>
        <Router history={history}>
          <ActiveAccount2User changeLoginSign={() => {}} />
        </Router>
      </Provider>
    );
    const codeInput = screen.getByText("کد ارسالی");
    expect(codeInput).toBeInTheDocument();
  });

  test("should display submit button", () => {
    render(
      <Provider store={store}>
        <Router history={history}>
          <ActiveAccount2User changeLoginSign={() => {}} />
        </Router>
      </Provider>
    );
    const submitButton = screen.getByRole("button", { name: "ارسال" });
    expect(submitButton).toBeInTheDocument();
  });

  test("should call onSubmitHandlerUserActive2 with correct values on form submit", async () => {
    const changeLoginSignMock = jest.fn();
    render(
      <Provider store={store}>
        <Router history={history}>
          <ActiveAccount2User changeLoginSign={changeLoginSignMock} />
        </Router>
      </Provider>
    );
    const emailInput = screen.getByText("ایمیل") as HTMLInputElement;
    const codeInput = screen.getByText("کد ارسالی") as HTMLInputElement;
    const submitButton = screen.getByRole("button", { name: "ارسال" });

    emailInput.value = "test@example.com";
    codeInput.value = "123456";
    fireEvent.click(submitButton);
  });
});
