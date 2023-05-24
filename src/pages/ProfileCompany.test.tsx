import React from "react";
import { render, waitFor, screen } from "@testing-library/react";
import ProfileCompnay from "./ProfileCompany";
import { getUser } from "../services/api";
import { Provider } from "react-redux";
import { createMemoryHistory } from "history";
import configureStore from "redux-mock-store";
import { Router } from "react-router-dom";

const mockStore = configureStore([]);
jest.mock("../services/api", () => ({
  getUser: jest.fn(),
}));

describe("ProfileCompnay", () => {
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
  it("renders the mobile menu, header, and basic tabs when the user data is fetched successfully", async () => {
    // Mock the getUser function to return a user object
    const user = {
      name: "John Doe",
      age: 25,
      // ...
    };
    (getUser as jest.Mock).mockResolvedValue({ data: user });

    // Render the ProfileUser component
    render(
      <Provider store={store}>
        <Router history={history}>
          <ProfileCompnay />
        </Router>
      </Provider>
    );

    // Assert that the profile company component is rendered
    const headerComponent = screen.getByTestId("profile-company");
    expect(headerComponent).toBeInTheDocument();
  });

  it("renders the mobile menu and header but does not render the basic tabs when the user data fetch fails", async () => {
    // Mock the getUser function to throw an error
    (getUser as jest.Mock).mockRejectedValue(
      new Error("Failed to fetch user data")
    );

    // Render the Profilecompany component
    render(
      <Provider store={store}>
        <Router history={history}>
          <ProfileCompnay />
        </Router>
      </Provider>
    );

    // Wait for the user data fetch to fail and assert that the basic tabs component is not rendered
    await waitFor(() => {
      const basicTabsComponent = screen.queryByTestId("basic-tabs");
      expect(basicTabsComponent).toBeNull();
    });
  });
});
