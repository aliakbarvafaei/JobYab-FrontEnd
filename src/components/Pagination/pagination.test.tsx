import { render } from "@testing-library/react";
import CustomPagination from ".";

test("renders CustomPagination correctly", () => {
  const { container } = render(<CustomPagination count={10} />);
  expect(container.firstChild).toMatchSnapshot();
});
