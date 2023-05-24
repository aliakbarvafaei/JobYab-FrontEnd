import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import BasicTabs from "./Tab";

describe("BasicTabs", () => {
  test("should display tabs correctly", () => {
    render(<BasicTabs user={{}} />);
    const requestTab = screen.getByRole("tab", { name: "درخواست‌های من" });
    const informationTab = screen.getByRole("tab", { name: "اطلاعات" });
    const messagesTab = screen.getByRole("tab", { name: "پیام‌ها" });
    const bookmarkTab = screen.getByRole("tab", { name: "نشان شده‌ها" });

    expect(requestTab).toBeInTheDocument();
    expect(informationTab).toBeInTheDocument();
    expect(messagesTab).toBeInTheDocument();
    expect(bookmarkTab).toBeInTheDocument();
  });

  test("should switch tabs correctly", () => {
    render(<BasicTabs user={{}} />);
    const requestTab = screen.getByRole("tab", { name: "درخواست‌های من" });

    fireEvent.click(requestTab);
    expect(screen.getByText("درخواست‌های ارسالی")).toBeInTheDocument();
  });
});
