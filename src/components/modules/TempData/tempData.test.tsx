import { render } from "@testing-library/react";
import TempData from ".";

describe("TempData Component", () => {
  test("renders TempData component without crashing", () => {
    render(<TempData />);
  });

  test("displays expected text in TempData component", () => {
    const { getByText } = render(<TempData />);
    expect(getByText(/فناوری دراپ محیطی پویا/i)).toBeInTheDocument();
    expect(
      getByText(/همفکری و طراحی رابط کاربری با اعضای تیم/i)
    ).toBeInTheDocument();
    expect(getByText(/امکان استخدام پس از دوره کارآموزی/i)).toBeInTheDocument();
  });
});
