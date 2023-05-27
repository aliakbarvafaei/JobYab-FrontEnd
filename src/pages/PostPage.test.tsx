import { render } from "@testing-library/react";
import PostPage from "./PostPage";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";

const mockStore = configureStore([]);

describe("Post Page", () => {
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
  test("renders correctly in Search Page", async () => {
    const { asFragment } = render(
      <Provider store={store}>
        <Router history={history}>
          <PostPage />
        </Router>
      </Provider>
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
