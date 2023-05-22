import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import HeaderNewShort from "./HeaderNewShort";

const mockStore = configureStore([]);

describe("HeaderNewShort", () => {
  it("renders the component without errors", () => {
    const store = mockStore({
      userAuth: {
        role: "user",
        token: "abc123",
      },
    });

    render(
      <Provider store={store}>
        <BrowserRouter>
          <HeaderNewShort />
        </BrowserRouter>
      </Provider>
    );
  });

  it("opens the navigation menu on click", () => {
    const store = mockStore({
      userAuth: {
        role: "user",
        token: "abc123",
      },
    });

    render(
      <Provider store={store}>
        <BrowserRouter>
          <HeaderNewShort />
        </BrowserRouter>
      </Provider>
    );

    fireEvent.click(screen.getByLabelText("account of current user"));

    // Assert that the navigation menu is open
    expect(screen.getByRole("menu")).toBeInTheDocument();
  });
});
