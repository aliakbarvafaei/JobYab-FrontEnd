import React from "react";
import { render, screen } from "@testing-library/react";
import UpdatePost from "./UpdatePost";
import { Provider } from "react-redux";
import { createMemoryHistory } from "history";
import configureStore from "redux-mock-store";
import { Router } from "react-router-dom";

const mockStore = configureStore([]);

describe("UpdatePost", () => {
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
  it("renders the header and update post component", () => {
    // Render the UpdatePost component
    render(
      <Provider store={store}>
        <Router history={history}>
          <UpdatePost />
        </Router>
      </Provider>
    );

    // Assert that the update post component is rendered
    const updatePostComponent = screen.getByTestId("update-post");
    expect(updatePostComponent).toBeInTheDocument();
  });
});
