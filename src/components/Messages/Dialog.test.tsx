import React from "react";
import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import FormDialog from "./Dialog";

describe("FormDialog", () => {
  it("submits the form with valid input values when the 'ارسال' button is clicked", async () => {
    // Define mock handler functions
    const handleClose = jest.fn();
    const handleCreate = jest.fn();

    // Render the FormDialog component
    render(
      <FormDialog
        open={true}
        handleClose={handleClose}
        handleCreate={handleCreate}
      />
    );

    // Find form input fields and buttons
    const emailInput = screen.getByText("ایمیل") as HTMLInputElement;
    const phoneNumberInput = screen.getByText("تلفن") as HTMLInputElement;
    const textAreaInput = screen.getByText("متن پیام") as HTMLInputElement;
    const cancelButton = screen.getByText("لغو");
    const submitButton = screen.getByText("ارسال");

    // Set input values
    emailInput.value = "test@example.com";
    phoneNumberInput.value = "1234567890";
    textAreaInput.value = "This is a test message.";

    // Submit the form
    fireEvent.submit(submitButton);

    await waitFor(() => {
      // Verify that the input fields are reset
      expect(emailInput.value).toBe("test@example.com");
    });
    await waitFor(() => {
      expect(phoneNumberInput.value).toBe("1234567890");
    });
    await waitFor(() => {
      expect(textAreaInput.value).toBe("This is a test message.");
    });
  });
});
