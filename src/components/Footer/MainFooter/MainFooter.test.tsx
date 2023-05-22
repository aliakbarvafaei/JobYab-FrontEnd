import React from "react";
import { render, screen } from "@testing-library/react";
import MainFooter from "./MainFooter";
import { MemoryRouter } from "react-router-dom";

describe("MainFooter", () => {
  it("renders the component without errors", () => {
    render(
      <MemoryRouter>
        <MainFooter />
      </MemoryRouter>
    );
  });

  it("displays the correct text content", () => {
    render(
      <MemoryRouter>
        <MainFooter />
      </MemoryRouter>
    );

    // Assert
    expect(screen.getByText("JOBYAB")).toBeInTheDocument();
    expect(
      screen.getByText(
        "ما در جاب یاب به شما کمک می‌کنیم تا بتوانید از فرصت های شغلی مختلف باخبر باشید و براحتی در جاب یاب صاحب کار شوید."
      )
    ).toBeInTheDocument();
  });

  it("displays the correct text content 2", () => {
    render(
      <MemoryRouter>
        <MainFooter />
      </MemoryRouter>
    );

    // Assert
    expect(screen.getByText("حساب کاربری")).toBeInTheDocument();
    expect(screen.getByText("آگهی های من")).toBeInTheDocument();
    expect(screen.getByText("پروفایل")).toBeInTheDocument();
    expect(screen.getByText("آگهی")).toBeInTheDocument();
  });

  it("displays the correct text content 3", () => {
    render(
      <MemoryRouter>
        <MainFooter />
      </MemoryRouter>
    );

    // Assert
    expect(screen.getByText("نشان شده‌ها")).toBeInTheDocument();
    expect(screen.getByText("فوری")).toBeInTheDocument();
    expect(screen.getByText("درباره ما")).toBeInTheDocument();
    expect(screen.getByText("اصفهان، دانشگاه اصفهان")).toBeInTheDocument();
    expect(screen.getByText("تلفن : 09123456789")).toBeInTheDocument();
    expect(screen.getByText("ایمیل : jobyab@gmail.com")).toBeInTheDocument();
  });

  it("renders social media icons", () => {
    render(
      <MemoryRouter>
        <MainFooter />
      </MemoryRouter>
    );

    // Assert
    expect(screen.getByTestId("facebook-icon")).toBeInTheDocument();
    expect(screen.getByTestId("google-plus-icon")).toBeInTheDocument();
  });
  it("renders social media icons 2", () => {
    render(
      <MemoryRouter>
        <MainFooter />
      </MemoryRouter>
    );

    // Assert
    expect(screen.getByTestId("twitter-icon")).toBeInTheDocument();
    expect(screen.getByTestId("instagram-icon")).toBeInTheDocument();
    expect(screen.getByTestId("wifi-icon")).toBeInTheDocument();
  });
});
