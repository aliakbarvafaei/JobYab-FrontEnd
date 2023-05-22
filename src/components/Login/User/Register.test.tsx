import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import RegisterUser from "./Register";

describe("RegisterUser", () => {
  test("should register a user", async () => {
    render(<RegisterUser changeLoginSign={() => {}} />);

    const nameInput = screen.getByText(
      "نام و نام‌خانوادگی"
    ) as HTMLInputElement;
    const emailInput = screen.getByText("ایمیل") as HTMLInputElement;
    const phoneInput = screen.getByText("موبایل") as HTMLInputElement;
    const passwordInput = screen.getByText("رمزعبور") as HTMLInputElement;
    const submitButton = screen.getByRole("button", { name: "ثبت نام" });

    emailInput.value = "john@example.com";
    nameInput.value = "John Doe";
    phoneInput.value = "1234567890";
    passwordInput.value = "password123";

    await waitFor(() => {
      expect(nameInput).toHaveValue("John Doe");
    });

    await waitFor(() => {
      expect(emailInput).toHaveValue("john@example.com");
    });

    await waitFor(() => {
      expect(phoneInput).toHaveValue("1234567890");
    });

    await waitFor(() => {
      expect(passwordInput).toHaveValue("password123");
    });

    fireEvent.click(submitButton);

  });
});
