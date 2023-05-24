import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Information from "./Information";

test("renders profile form correctly", () => {
  //arrange
  const mockUser = {
    type: "حقیقی",
    data: {
      username: "test@example.com",
    },
    introduction: "Some bio",
    company_persian_name: "شرکت فارسی",
    company_english_name: "English Company",
    company_phone_number: "12345678901",
    website: "www.example.com",
    number_of_personnel: "1",
    activity_field: "فناوری اطلاعات",
  };

  //act
  render(<Information user={mockUser} />);

  //assertion
  expect(screen.getByText("ایمیل")).toBeInTheDocument();
  expect(screen.getByText("نام شرکت (فارسی)")).toBeInTheDocument();
  expect(screen.getByText("نام شرکت (انگلیسی)")).toBeInTheDocument();
  expect(screen.getByText("شماره تماس شرکت")).toBeInTheDocument();
  expect(screen.getByText("تعداد پرسنل")).toBeInTheDocument();
  expect(screen.getByText("حوزه فعالیت")).toBeInTheDocument();
  expect(screen.getByText("حقیقی")).toBeInTheDocument();
  expect(screen.getByText("حقوقی")).toBeInTheDocument();
  expect(screen.getByRole("button", { name: "ویرایش" })).toBeInTheDocument();
});

test("submits form correctly", async () => {
  //arrange
  const mockUser = {
    type: "حقیقی",
    data: {
      username: "test@example.com",
    },
    introduction: "Some bio",
    company_persian_name: "شرکت فارسی",
    company_english_name: "English Company",
    company_phone_number: "12345678901",
    website: "www.example.com",
    number_of_personnel: "1",
    activity_field: "فناوری اطلاعات",
  };

  //act
  render(<Information user={mockUser} />);

  //assertion
  fireEvent.click(screen.getByRole("button", { name: "ویرایش" }));
});
