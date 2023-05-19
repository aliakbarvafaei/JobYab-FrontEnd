import { render, fireEvent } from "@testing-library/react";
import DetailHeader from ".";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";


const mockStore = configureStore([]);

describe("DetailHeader Component", () => {
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
  it("renders correctly", () => {
    const { asFragment } = render(
      <Provider store={store}>
        <Router history={history}>
          <DetailHeader />
        </Router>
      </Provider>
    );
    expect(asFragment()).toMatchSnapshot();
  });

  test("renders DetailHeader component without error", () => {
    render(
      <Provider store={store}>
        <Router history={history}>
          <DetailHeader />
        </Router>
      </Provider>
    );
  });

  it("calls onclick function when button is clicked", () => {
    const mockOnClick = jest.fn();
    const { getByText } = render(
      <Provider store={store}>
        <Router history={history}>
          <DetailHeader onclick={mockOnClick} />
        </Router>
      </Provider>
    );

    fireEvent.click(getByText("اطلاعات شرکت"));
    expect(mockOnClick).toHaveBeenCalled();
  });
  test('clicking "اطلاعات شرکت" button calls onclick function', () => {
    const mockOnClick = jest.fn();
    const { getByText } = render(
      <Provider store={store}>
        <Router history={history}>
          <DetailHeader onclick={mockOnClick} haveCompanyDetail />
        </Router>
      </Provider>
    );

    const infoButton = getByText("اطلاعات شرکت");
    fireEvent.click(infoButton);

    expect(mockOnClick).toHaveBeenCalled();
  });
});
