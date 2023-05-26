import React from "react";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { createMemoryHistory } from "history";
import configureStore from "redux-mock-store";
import { Router } from "react-router-dom";
import NewPost from "./NewPost";

const mockStore = configureStore([]);

describe("NewPost", () => {
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
  it("renders the header and new post component", () => {
    // Render the NewPost component
    render(
      <Provider store={store}>
        <Router history={history}>
          <NewPost />
        </Router>
      </Provider>
    );

    // Assert that the new post component is rendered
    const newPostComponent = screen.getByTestId("new-post");
    expect(newPostComponent).toBeInTheDocument();
  });
});
