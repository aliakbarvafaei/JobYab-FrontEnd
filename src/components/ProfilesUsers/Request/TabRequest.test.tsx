import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import BasicTabs from "./TabRequest";

describe("BasicTabs", () => {
  test("should render the component", () => {
    render(<BasicTabs />);

    // Assert the presence of tab labels
    const tab1 = screen.getByText("درخواست‌های ارسالی");
    const tab2 = screen.getByText("درحال بررسی");
    const tab3 = screen.getByText("پذیرفته یا رد");
    expect(tab1).toBeInTheDocument();
    expect(tab2).toBeInTheDocument();
    expect(tab3).toBeInTheDocument();

    // Assert the initial active tab
    const activeTab = screen.getByRole("tab", { selected: true });
    expect(activeTab).toHaveTextContent("درخواست‌های ارسالی");

    // Assert the presence of tab panels
    const tabPanel1 = screen.getAllByRole("tabpanel", { hidden: false })[0];
    const tabPanel2 = screen.getAllByRole("tabpanel", { hidden: true })[0];
    const tabPanel3 = screen.getAllByRole("tabpanel", { hidden: true })[1];
    expect(tabPanel1).toBeInTheDocument();
    expect(tabPanel2).toBeInTheDocument();
    expect(tabPanel3).toBeInTheDocument();
  });

  test("should switch between tabs", () => {
    render(<BasicTabs />);

    // Select the second tab
    const tab2 = screen.getByText("درحال بررسی");
    fireEvent.click(tab2);

    // Assert the updated active tab
    const activeTab = screen.getByRole("tab", { selected: true });
    expect(activeTab).toHaveTextContent("درحال بررسی");

    // Assert the visibility of tab panels
    const tabPanel1 = screen.getAllByRole("tabpanel", { hidden: true })[0];
    const tabPanel2 = screen.getAllByRole("tabpanel", { hidden: false })[0];
    const tabPanel3 = screen.getAllByRole("tabpanel", { hidden: true })[1];
    expect(tabPanel1).toBeInTheDocument();
    expect(tabPanel2).toBeInTheDocument();
    expect(tabPanel3).toBeInTheDocument();
  });
});
