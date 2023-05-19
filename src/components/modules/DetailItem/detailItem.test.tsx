import { render, screen } from "@testing-library/react";
import DetailItem from ".";
import LogoDev from "@mui/icons-material/LogoDev";

describe("DetailItem Component", () => {
  test("renders DetailItem component", () => {
    render(
      <DetailItem title="Test Title" value="Test Value" logo={<LogoDev />} />
    );

    expect(screen.getByText("Test Title:")).toBeInTheDocument();
    expect(screen.getByText("Test Value")).toBeInTheDocument();
  });

  test("renders DetailItem component logo", () => {
    render(
      <DetailItem title="Test Title" value="Test Value" logo={<LogoDev />} />
    );

    expect(screen.getByRole("button")).toHaveClass(
      "MuiButtonBase-root MuiIconButton-root Mui-disabled"
    );
  });
  test("renders DetailItem component styles", () => {
    render(
      <DetailItem title="Test Title" value="Test Value" logo={<LogoDev />} />
    );

    const item = screen.getByText("Test Title:");

    expect(item).toHaveStyle({ fontWeight: "bold" });
    expect(item).toHaveClass("smmin:text-[13px] sm:text-[14px]");
    expect(screen.getByText("Test Value")).toHaveClass(
      "smmin:text-[13px] sm:text-[14px]"
    );
  });
});
