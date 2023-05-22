import { render, screen } from "@testing-library/react";
import Messages from "./Messages";
import { getMessages } from "../../services/api";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";

const mockStore = configureStore([]);

jest.mock("../../services/api", () => ({
  getMessages: jest.fn(),
  AddMessages: jest.fn(),
}));

describe("Messages", () => {
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

  test("should fetch and render messages", async () => {
    // arrange
    const mockMessages = [
      {
        email: "john@example.com",
        phone_number: "1234567890",
        text: "Hello, world!",
        created_date: "2023-01-01",
      },
    ];
    (
      getMessages as jest.MockedFunction<typeof getMessages>
    ).mockResolvedValueOnce(mockMessages as any);

    // act
    render(
      <Provider store={store}>
        <Router history={history}>
          <Messages />
        </Router>
      </Provider>
    );

    // Assert
    expect(getMessages).toHaveBeenCalledTimes(1);

    const email = screen.getByText("نوشتن پیام") as HTMLInputElement;
    email.value = "test@gmail.com";
    expect(email.value).toBe("test@gmail.com");

    const phoneNumberCell = screen.getByText("نوشتن پیام") as HTMLInputElement;
    phoneNumberCell.value = "12345678910";
    expect(phoneNumberCell.value).toBe("12345678910");

    const textCell = screen.getByText("نوشتن پیام") as HTMLInputElement;
    textCell.value = "Hello!";
    expect(textCell.value).toBe("Hello!");
  });
});
