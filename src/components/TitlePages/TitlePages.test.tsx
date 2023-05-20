import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { createMemoryHistory } from "history";
import { Router } from "react-router-dom";
import TitlePages from "./TitlePages";

describe("TitlePages component", () => {
  const mockScrollTo = jest.fn();
  global.scrollTo = mockScrollTo;
  window.scrollTo = jest.fn();
  
  test("navigates to home page on click", () => {
    const history = createMemoryHistory();
    const pushSpy = jest.fn(); // Create a mock function
    history.push = pushSpy; // Assign the mock function to history.push
    render(
      <Router history={history}>
        <TitlePages title="Test Title" />
      </Router>
    );

    const homeLink = screen.getByText("خانه");
    fireEvent.click(homeLink);

    expect(pushSpy).toHaveBeenCalledWith("/home");
    // expect(window.scrollTo).toHaveBeenCalledWith({
    //   top: 0,
    //   left: 0,
    //   behavior: "smooth",
    // });
  });
});
