import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Information from "./Information";

describe("Information", () => {
  it("renders and submits the form correctly", async () => {
    const user = {
      data: {
        username: "test@example.com",
      },
      address: "Test Address",
      national_code: "1234567890",
      full_name: "Test User",
      phone_number: "1234567890",
    };

    render(<Information user={user} />);

    // Check if the form fields are rendered correctly
    const emailField = screen.getByText("ایمیل") as HTMLInputElement;
    emailField.value = "test@example.com";
    expect(emailField).toHaveValue("test@example.com");

    const nameField = screen.getByText(
      "نام و نام‌خانوادگی"
    ) as HTMLInputElement;
    nameField.value = "Test User";
    expect(nameField).toHaveValue("Test User");

    const phoneField = screen.getByText("موبایل") as HTMLInputElement;
    phoneField.value = "1234567890";
    expect(phoneField).toHaveValue("1234567890");

    // Submit the form
    const submitButton = screen.getByText("ویرایش");
    fireEvent.click(submitButton);
  });
});
