import { render, screen } from "@testing-library/react";
import CustomizedTables from "./Table";

describe("CustomizedTables", () => {
  test("should render table rows with provided data", () => {
    // Arrange
    const data = [
      {
        email: "test@example.com",
        phone_number: "1234567890",
        text: "Hello!",
        created_date: "2023-01-01",
      },
    ];

    // act
    render(<CustomizedTables data={data} />);

    // assert
    const emailCell = screen.getByText("test@example.com");
    const phoneNumberCell = screen.getByText("1234567890");
    const textCell = screen.getByText("Hello!");

    expect(emailCell).toBeInTheDocument();
    expect(phoneNumberCell).toBeInTheDocument();
    expect(textCell).toBeInTheDocument();
  });
});