import React from "react";
import { render, screen } from "@testing-library/react";
import Request from "./Request";

describe("Request", () => {
  test("should render the component", () => {
    render(<Request />);
    const title = screen.getByText("درخواست‌ها");
    const basicTabs = screen.getByRole("tabpanel");
    expect(title).toBeInTheDocument();
    expect(basicTabs).toBeInTheDocument();
  });
});
