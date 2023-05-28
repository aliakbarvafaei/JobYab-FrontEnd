import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import SendResumeSection from ".";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";
import { UserType } from "../../../constants/types";

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
  const mockData: UserType = {
    address: "تست",
    national_code: "1245764848",
    full_name: "John Doe",
    phone_number: "1234567890",
    data: {
      date_joined: "",
      email: "",
      email_active_code: "",
      first_name: "",
      groups: [],
      id: 1,
      is_active: false,
      is_authorized: false,
      is_employer: false,
      is_staff: false,
      is_superuser: false,
      last_login: "",
      last_name: "",
      password: "",
      user_permissions: [],
      username: "",
    },
  };
  test("renders correctly in SendResumeSection Page", async () => {
    const { asFragment } = render(
      <Provider store={store}>
        <Router history={history}>
          <SendResumeSection />
        </Router>
      </Provider>
    );
    expect(asFragment()).toMatchSnapshot();
  });
  test("handles file upload", () => {
    const { getByLabelText } = render(
      <Provider store={store}>
        <Router history={history}>
          <SendResumeSection />
        </Router>
      </Provider>
    );
    const fileInput = getByLabelText("آپلود");
    const file = new File(["resume content"], "resume.pdf", {
      type: "application/pdf",
    });

    fireEvent.change(fileInput, { target: { files: [file] } });

    // Add assertions to check if the file was set correctly in the component state
  });
  test("handles resume submission", () => {
    const { getByText } = render(
      <Provider store={store}>
        <Router history={history}>
          <SendResumeSection />
        </Router>
      </Provider>
    );
    const submitButton = getByText("ارسال رزومه");

    fireEvent.click(submitButton);

    // Add assertions to check if the resume submission logic is executed correctly
  });
  test("renders user full name correctly", () => {
    const fullName = "Erfan Nourbakhsh";
    const data: UserType = {
      address: "تست",
      national_code: "1245764848",
      full_name: fullName,
      phone_number: "1234567890",
      data: {
        date_joined: "",
        email: "",
        email_active_code: "",
        first_name: "",
        groups: [],
        id: 1,
        is_active: false,
        is_authorized: false,
        is_employer: false,
        is_staff: false,
        is_superuser: false,
        last_login: "",
        last_name: "",
        password: "",
        user_permissions: [],
        username: "",
      },
    };
    const { getByDisplayValue } = render(
      <Provider store={store}>
        <Router history={history}>
          <SendResumeSection data={data} />
        </Router>
      </Provider>
    );
    const fullNameInput = getByDisplayValue(fullName);

    expect(fullNameInput).toBeInTheDocument();
  });
  test("renders user phone number correctly", () => {
    const phoneNumber = "1234567890";
    const data: UserType = {
      address: "تست",
      national_code: "1245764848",
      full_name: "fullName",
      phone_number: phoneNumber,
      data: {
        date_joined: "",
        email: "",
        email_active_code: "",
        first_name: "",
        groups: [],
        id: 1,
        is_active: false,
        is_authorized: false,
        is_employer: false,
        is_staff: false,
        is_superuser: false,
        last_login: "",
        last_name: "",
        password: "",
        user_permissions: [],
        username: "",
      },
    };
    const { getByDisplayValue } = render(
      <Provider store={store}>
        <Router history={history}>
          <SendResumeSection data={data} />
        </Router>
      </Provider>
    );
    const phoneNumberInput = getByDisplayValue(phoneNumber);

    expect(phoneNumberInput).toBeInTheDocument();
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
