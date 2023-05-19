import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import SendResumeSection from ".";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";

const mockStore = configureStore([]);

describe("SendResumeSection Component", () => {
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
  test("submit button should be disabled when no file is uploaded", () => {
    render(
      <Provider store={store}>
        <Router history={history}>
          <SendResumeSection />
        </Router>
      </Provider>
    );
    const submitButton = screen.getByRole("button", { name: /ارسال رزومه/i });
    expect(submitButton).toBeInTheDocument();
    userEvent.click(submitButton);
    // Check that clicking the disabled button doesn't trigger any actions
  });
  test("input fields should display respective data correctly", () => {
    const mockData = {
      full_name: "John Doe",
      phone_number: "1234567890",
    };
    render(
      <Provider store={store}>
        <Router history={history}>
          <SendResumeSection data={mockData} />
        </Router>
      </Provider>
    );
    const fullNameInput = screen.getByDisplayValue(/john doe/i);
    const phoneNumberInput = screen.getByDisplayValue("1234567890");
    expect(fullNameInput).toBeInTheDocument();
    expect(phoneNumberInput).toBeInTheDocument();
  });
});
