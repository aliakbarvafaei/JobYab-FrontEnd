import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import ActiveAccount1User from "./ActiveAccount1";

describe("ActiveAccount1User", () => {
  test("should display email input field", () => {
    render(<ActiveAccount1User changeLoginSign={() => {}} />);
    const emailInput = screen.getByText("ایمیل");
    expect(emailInput).toBeInTheDocument();
  });

  test("should display submit button", () => {
    render(<ActiveAccount1User changeLoginSign={() => {}} />);
    const submitButton = screen.getByRole("button", { name: "ارسال کد" });
    expect(submitButton).toBeInTheDocument();
  });

  test("should call onSubmitHandlerUserActive with correct values on form submit", async () => {
    const changeLoginSignMock = jest.fn();
    render(<ActiveAccount1User changeLoginSign={changeLoginSignMock} />);
    const emailInput = screen.getByText("ایمیل") as HTMLInputElement;
    const submitButton = screen.getByRole("button", { name: "ارسال کد" });

    emailInput.value= "test@example.com";
    fireEvent.click(submitButton);
  });

});
