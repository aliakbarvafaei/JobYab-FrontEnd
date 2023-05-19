import { render } from "@testing-library/react";
import CompanyPage from "./companyPage";
import { getPostDetail } from "../services/api";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";

const mockStore = configureStore([]);

jest.mock("../services/api", () => ({
  getPostDetail: jest.fn(),
}));

describe("CompanyDetail", () => {
  const mockScrollTo = jest.fn();
  global.scrollTo = mockScrollTo;
  window.scrollTo = jest.fn();
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

  test("should fetch and render detail of company", async () => {
    const mockData = [
      {
        user: {
          company_persian_name: "جابینجا",
          type: "کارفرما",
          introduction: "توضیحات شرکت",
          website: "www.jobyab.ir",
          number_of_personnel: "کمتر از 10 نفر",
        },
        state: {
          title: "اصفهان",
        },
        city: {
          title: "اصفهان",
        },
      },
    ];
    (
      getPostDetail as jest.MockedFunction<typeof getPostDetail>
    ).mockResolvedValueOnce(mockData as any);

    const { container } = render(
      <Provider store={store}>
        <Router history={history}>
          <CompanyPage />
        </Router>
      </Provider>
    );
      
    expect(getPostDetail).toHaveBeenCalledTimes(1);

    // Assertions
    const companyIntroduction = container.getElementsByClassName(
      "introduction"
    )[0] as HTMLInputElement;
    companyIntroduction.value = mockData[0].user.introduction;
    expect(companyIntroduction).toHaveStyle("fontSize: 15;");
    expect(companyIntroduction).toHaveValue("توضیحات شرکت");
    //----------------
    const companyWebsite = container.getElementsByClassName(
      "website"
    )[0] as HTMLInputElement;
    companyWebsite.value = mockData[0].user.website;
    expect(companyWebsite).toHaveValue("www.jobyab.ir");
    //----------------
    const company_count = container.getElementsByClassName(
      "companyCount"
    )[0] as HTMLInputElement;
    company_count.value = mockData[0].user.number_of_personnel;
    expect(company_count).toHaveValue("کمتر از 10 نفر");
  });
  afterAll(() => {
    jest.clearAllMocks();
  });
});
