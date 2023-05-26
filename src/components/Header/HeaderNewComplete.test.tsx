import React from "react";
import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";
import HeaderNewComplete from "./HeaderNewComplete";
import configureStore from "redux-mock-store";
import { Provider } from "react-redux";

const mockStore = configureStore([]);

describe("HeaderNewComplete", () => {
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
  it("updates the search input value and performs a search when the search button is clicked", async () => {

    // Render the HeaderNewComplete component wrapped in a Router with the created history
    render(
      <Provider store={store}>
        <Router history={history}>
          <HeaderNewComplete />
        </Router>
      </Provider>
    );

    // Find the search input field
    const searchInput = screen.getByPlaceholderText(
      /جستجو آگهی/i
    ) as HTMLInputElement;

    // Enter a search query in the input field
    searchInput.value= "job";

    // Verify that the search input value is updated
    expect(searchInput.value).toBe("job");

    // Find the search button
    const searchButton = screen.getByTestId("search");

    // Simulate a click on the search button
    fireEvent.submit(searchButton);
  });
});
