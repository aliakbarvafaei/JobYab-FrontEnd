import { screen, render } from "@testing-library/react";
import SearchPage from "./SearchPage";
import configureStore from "redux-mock-store";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";

const mockStore = configureStore([]);
describe("Search Page", () => {
  let store: any;
  window.scrollTo = jest.fn();
  //   let history: any;

  beforeEach(() => {
    store = mockStore({
      userAuth: {
        role: "admin",
        token: "some-token",
      },
    });
  });
  test("check one property of fields", () => {
    render(
      <Router>
        <Provider store={store}>
          <SearchPage />
        </Provider>
      </Router>
    );
    const primaryButton = screen.getAllByRole("button")[1];
    expect(primaryButton).toHaveAttribute("aria-label", "حساب کاربری");
  });
  it("renders correctly in Search Page", () => {
    const { asFragment } = render(
      <Router>
        <Provider store={store}>
          <SearchPage />
        </Provider>
      </Router>
    );
    expect(asFragment()).toMatchSnapshot();
  });
  test("displays loading spinner while data is being fetched", () => {
    render(
      <Router>
        <Provider store={store}>
          <SearchPage />
        </Provider>
      </Router>
    );

    const loadingSpinner = screen.getByRole("progressbar");

    expect(loadingSpinner).toBeInTheDocument();
  });
  afterAll(() => {
    jest.clearAllMocks();
  });
});
