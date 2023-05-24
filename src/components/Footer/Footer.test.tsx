import React from "react";
import { render, screen } from "@testing-library/react";
import Footer from "./Footer";
import { BrowserRouter as Router } from "react-router-dom";

describe("Footer", () => {
  it("renders MainFooter component", () => {
    // Render the Footer component
    render(
      <Router>
        <Footer />
      </Router>
    );

    // Find the MainFooter component by its test ID
    const mainFooter = screen.getByTestId("main-footer");

    // Assert that the MainFooter component is rendered
    expect(mainFooter).toBeInTheDocument();
  });
});
