import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import MobileMenu from "./MobileMenu";

describe("MobileMenu", () => {
  const initialState = {
    userAuth: {
      role: "user",
      token: "token",
    },
  };

  const mockStore = configureStore([]);
  let store: any;
  let history: any;

  beforeEach(() => {
    store = mockStore(initialState);
    history = createMemoryHistory();
  });

  it("renders menu items correctly", () => {
    render(
      <Provider store={store}>
        <Router history={history}>
          <MobileMenu />
        </Router>
      </Provider>
    );

    const supportLink = screen.getByText("پشتیبانی");
    expect(supportLink).toBeInTheDocument();

    const bookmarksLink = screen.getByText("نشان شده‌ها");
    expect(bookmarksLink).toBeInTheDocument();
  });
  it("renders menu items", () => {
    render(
      <Provider store={store}>
        <Router history={history}>
          <MobileMenu />
        </Router>
      </Provider>
    );

    const companyLink = screen.getByText("کارفرما");
    expect(companyLink).toBeInTheDocument();

    const accountLink = screen.getByText("حساب");
    expect(accountLink).toBeInTheDocument();
  });

  it("handles logout correctly", () => {
    render(
      <Provider store={store}>
        <Router history={history}>
          <MobileMenu />
        </Router>
      </Provider>
    );

    const accountLink = screen.getByText("حساب");
    fireEvent.click(accountLink);

    const logoutOption = screen.getByText("خروج");
    expect(logoutOption).toBeInTheDocument();
  });
});
