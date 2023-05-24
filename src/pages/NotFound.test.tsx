import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";
import NotFound from "./NotFound";

const mockStore = configureStore([]);

describe("NotFound", () => {
  const mockScrollTo = jest.fn();
  global.scrollTo = mockScrollTo;
  window.scrollTo = jest.fn();
  let store: any;
  let history: any;

  beforeEach(() => {
    store = mockStore({
      userAuth: {
        role: "admin", // Provide a valid role value
        token: "some-token", // Provide a valid token value
      },
    });
    history = createMemoryHistory();
  });

  test("renders the component correctly", () => {
    render(
      <Provider store={store}>
        <Router history={history}>
          <NotFound />
        </Router>
      </Provider>
    );
  });

  test("handles home button click correctly", () => {
    render(
      <Provider store={store}>
        <Router history={history}>
          <NotFound />
        </Router>
      </Provider>
    );

    // Simulate clicking the home button
    fireEvent.click(screen.getByText("برگشت به صفحه اصلی"));
  });
});
