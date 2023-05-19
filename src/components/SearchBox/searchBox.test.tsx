import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import SearchBox from ".";
import SearchOutlined from "@mui/icons-material/SearchOutlined";

describe("SearchBox Component", () => {
  test("renders correct placeholder text", () => {
    const placeholderText = "جستجو";
    render(<SearchBox placeholder={placeholderText} icon={<div />} />);
    const inputElement = screen.getByPlaceholderText(placeholderText);
    expect(inputElement).toBeInTheDocument();
  });

  test("renders icon element", () => {
    const iconElement = <div data-testid="icon" />;
    render(<SearchBox icon={iconElement} />);
    const icon = screen.getByTestId("icon");
    expect(icon).toBeInTheDocument();
  });

  test("renders with default props when not provided", () => {
    const iconElement = <div />;
    render(<SearchBox icon={iconElement} />);
    const inputElement = screen.getByPlaceholderText("جستجو");
    expect(inputElement).toBeInTheDocument();
  });

  test("input field is focused when clicked", () => {
    const iconElement = <div />;
    render(<SearchBox icon={iconElement} />);
    const inputElement = screen.getByPlaceholderText("جستجو");
    userEvent.click(inputElement);
    expect(inputElement).toHaveFocus();
  });
  test("updates the search input when user types", () => {
    const { getByRole } = render(<SearchBox icon={<SearchOutlined />} />);
    const input = getByRole("textbox");
    fireEvent.change(input, { target: { value: "Test" } });
    expect(input).toHaveValue("Test");
  });
  test("applies the placeholder prop to the search input", () => {
    const { getByPlaceholderText } = render(
      <SearchBox icon={<SearchOutlined />} placeholder="Search..." />
    );
    expect(getByPlaceholderText("Search...")).toBeInTheDocument();
  });
  test("renders the SearchBox component", () => {
    const { getByRole } = render(<SearchBox icon={<SearchOutlined />} />);
    expect(getByRole("textbox")).toBeInTheDocument();
  });
});
