import { render, screen } from "@testing-library/react";
import SimilarPost from ".";

describe("SimilarPost Component", () => {
  const testData = {
    id: 1,
    title: "",
    user: {
      activity_field: "",
      company_english_name: "",
      company_persian_name: "",
      company_phone_number: "",
      id: 1,
      introduction: "",
      level: "",
      logo: null,
      number_of_personnel: "",
      type: "",
      user: 2,
      website: null,
    },
  };
  test("renders SimilarPost component", () => {
    // @ts-ignore
    render(<SimilarPost data={testData} />);
  });
  test("displays user information correctly", () => {
    const testData = {
      id: 1,
      user: { company_persian_name: "Test Company", logo: null },
      title: "Test post",
    };
    // @ts-ignore
    render(<SimilarPost data={testData} />);
    expect(
      screen.getByText(testData.user.company_persian_name)
    ).toBeInTheDocument();
  });
  it("renders with given props", () => {
    const data = {
      id: 1,
      user: {
        logo: null,
        company_persian_name: "Test Company",
      },
      title: "Test Title",
    };
    // @ts-ignore
    render(<SimilarPost data={data} />);
    expect(screen.getByAltText(testData.user.introduction)).toBeInTheDocument();
    expect(screen.getByAltText(testData.user.level)).toBeInTheDocument();
    expect(
      screen.getByAltText(testData.user.number_of_personnel)
    ).toBeInTheDocument();
  });
});
