import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import CardItem from "./Card";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";

const mockStore = configureStore([]);

describe("CardItem", () => {
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

  const mockItem = {
    id: 1,
    post: {
      id: 1,
      title: "Test Post",
      skills: [
        { id: 1, title: "Skill 1" },
        { id: 2, title: "Skill 2" },
      ],
      user: { logo: null },
      created_date: new Date().toISOString(),
      city: { id: 1, title: "City" },
      state: { id: 1, title: "State" },
      cooperation_type: "Type",
      salary: "Salary",
      degree: "Rewq",
      description: "Qwert",
      experience: "redwsedf",
      job_type: { id: 1, title: "Wfr" },
      sarbazi: "thgrfvdsx",
      sex: "gbhgfds,",
    },
  };

  test("renders the component correctly", () => {
    render(
      <Provider store={store}>
        <Router history={history}>
          <CardItem item={mockItem} />
        </Router>
      </Provider>
    );
  });

  test("handles remove button click correctly", () => {
    render(
      <Provider store={store}>
        <Router history={history}>
          <CardItem item={mockItem} />
        </Router>
      </Provider>
    );

    // clicking the remove button
    fireEvent.click(screen.getByText("حذف"));
  });
});
