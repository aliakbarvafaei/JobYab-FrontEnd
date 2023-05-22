import React from "react";
import { render, screen } from "@testing-library/react";
import Option from "./Option";

describe("Option", () => {
  it("renders 1", () => {
    render(<Option />);

    const freeImage = screen.getByAltText("Free");
    expect(freeImage).toBeInTheDocument();
  });
  it("renders 2", () => {
    render(<Option />);

    const freeTitle = screen.getByText("ارسال رزومه رایگان");
    expect(freeTitle).toBeInTheDocument();
  });
  it("renders 3", () => {
    render(<Option />);

    const freeDescription = screen.getByText(
      "ارسال رزومه برای شرکت‌ها به صورت کاملا رایگان"
    );
    expect(freeDescription).toBeInTheDocument();
  });
  it("renders 4", () => {
    render(<Option />);

    const clockImage = screen.getByAltText("clock");
    expect(clockImage).toBeInTheDocument();
  });
  it("renders 5", () => {
    render(<Option />);

    const clockTitle = screen.getByText("پشتیبانی تمام وقت");
    expect(clockTitle).toBeInTheDocument();
  });
  it("renders 6", () => {
    render(<Option />);

    const clockDescription = screen.getByText("پشتیبانی برای تمامی اعضای سایت");
    expect(clockDescription).toBeInTheDocument();
  });
  it("renders 7", () => {
    render(<Option />);

    const speakerImage = screen.getByAltText("speaker");
    expect(speakerImage).toBeInTheDocument();
  });
  it("renders 8", () => {
    render(<Option />);

    const speakerTitle = screen.getByText("پیشنهاد فوق‌العاده اشتراک");
    expect(speakerTitle).toBeInTheDocument();
  });
  it("renders 9", () => {
    render(<Option />);

    const speakerDescription = screen.getByText(
      "اشتراک‌های ماهانه با تخفیف برای اعضای عادی و شرکت"
    );
    expect(speakerDescription).toBeInTheDocument();
  });
});
