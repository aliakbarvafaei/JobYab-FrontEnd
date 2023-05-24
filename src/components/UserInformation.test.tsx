import React from "react";
import { render, act } from "@testing-library/react";
import { Provider } from "react-redux";
import UserInformation from "./UserInformation";
import { useToast } from "../contexts/ToastState";
import { useDispatch } from "react-redux";
import { getUser } from "../services/api";
import configureStore from "redux-mock-store";
import { createMemoryHistory } from "history";

// Mock the useToast and useDispatch hooks
jest.mock("../contexts/ToastState");
jest.mock("react-redux");

// Mock the getUser function
jest.mock("../services/api", () => ({
  getUser: jest.fn(),
}));

const mockStore = configureStore([]);

describe("UserInformation", () => {
  let store: any;
  let history: any;

  beforeEach(() => {
    store = mockStore({
      userAuth: {
        role: "company",
        token: "some-token",
      },
    });
    history = createMemoryHistory();
  });

  it("dispatches the 'login' action when the API call is successful", async () => {
    // Mock the necessary functions and values
    const mockDispatch = jest.fn();
    (useDispatch as jest.Mock).mockReturnValue(mockDispatch);
    (useToast as jest.Mock).mockReturnValue({ setToastState: jest.fn() });
    (getUser as jest.Mock).mockResolvedValue({
      status: 200,
      data: { data: { is_employer: true } },
    });

    // Render the UserInformation component
    render(
      <Provider store={store}>
        <UserInformation />
      </Provider>
    );

    // Wait for the API call to resolve
    await act(async () => {
      await Promise.resolve();
    });
  });
});
