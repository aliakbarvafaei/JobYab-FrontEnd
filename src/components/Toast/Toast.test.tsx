import React from "react";
import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import Toast from "./Toast";
import { useToast } from "../../contexts/ToastState";

jest.mock("../../contexts/ToastState", () => ({
  useToast: jest.fn(),
}));

describe("Toast", () => {
  it("renders the toast component with the correct props and calls the destroyToast function when the close button is clicked", async () => {
    // Define mock props
    const mockProps = {
      type: "1",
      description: "This is a success message",
      indexKey: 123,
      destroyToast: jest.fn(),
    };

    // Mock the useToast hook
    (useToast as jest.Mock).mockReturnValue({ setToastState: jest.fn() });

    // Render the Toast component
    render(<Toast {...mockProps} />);

    // Verify that the toast component is rendered with the correct props
    expect(screen.getByText("This is a success message")).toBeInTheDocument();

    // Find and click the close button
    const closeButton =screen.getByText("X");
    fireEvent.click(closeButton);

    // Wait for the destroyToast function to be called
    await waitFor(() => {
      // Verify that the destroyToast function is called with the correct indexKey
      expect(mockProps.destroyToast).toHaveBeenCalledWith(123);
    });
  });
});
