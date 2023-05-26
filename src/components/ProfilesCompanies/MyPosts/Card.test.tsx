import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import CardItem from "./Card";
import * as api from "../../../services/api";

describe("CardItem", () => {
  const mockItem = {
    id: 1,
    title: "Test Title",
    skills: [
      { id: 1, title: "Skill 1" },
      { id: 2, title: "Skill 2" },
    ],
    user: { logo: null },
    city: { title: "Test City" },
    state: { title: "Test State" },
    cooperation_type: "Test Cooperation Type",
    salary: "Test Salary",
    created_date: new Date().toISOString(),
  };

  test("renders card item correctly", () => {
    render(<CardItem item={mockItem} />);

    // Assert item title is rendered
    const titleElement = screen.getByText(mockItem.title);
    expect(titleElement).toBeInTheDocument();

    // Assert item city and state are rendered
    const locationElement = screen.getByText(
      `${mockItem.city.title}, ${mockItem.state.title}`
    );
    expect(locationElement).toBeInTheDocument();

    // Assert item cooperation type and salary are rendered
    const cooperationElement = screen.getByText(
      `${mockItem.cooperation_type} (${mockItem.salary})`
    );
    expect(cooperationElement).toBeInTheDocument();

    // Assert item skills are rendered
    mockItem.skills.forEach((skill) => {
      const skillElement = screen.getByText(skill.title);
      expect(skillElement).toBeInTheDocument();
    });
  });

  test("calls hanldeUpdate when the update button is clicked", () => {
    // Mock the UpdatePost function
    jest.spyOn(api, "UpdatePost").mockResolvedValue({} as any);

    // Render the CardItem component
    render(
      <CardItem
        item={{
          id: 1,
          title: "Test Title",
          skills: [
            { id: 1, title: "Skill 1" },
            { id: 2, title: "Skill 2" },
          ],
          user: { logo: null },
          city: { title: "Test City" },
          state: { title: "Test State" },
          cooperation_type: "Test Cooperation Type",
          salary: "Test Salary",
          created_date: new Date().toISOString(),
        }}
      />
    );

    // Find the update button and click it
    const UpdateButton = screen.getByText("ویرایش");
    fireEvent.click(UpdateButton);
  });

  test("calls hanldeRemove when the remove button is clicked", async () => {
    // Mock the RemovePost function
    jest.spyOn(api, "RemovePost").mockResolvedValue({} as any);

    // Render the CardItem component
    render(
      <CardItem
        item={{
          id: 1,
          title: "Test Title",
          skills: [
            { id: 1, title: "Skill 1" },
            { id: 2, title: "Skill 2" },
          ],
          user: { logo: null },
          city: { title: "Test City" },
          state: { title: "Test State" },
          cooperation_type: "Test Cooperation Type",
          salary: "Test Salary",
          created_date: new Date().toISOString(),
        }}
      />
    );

    // Find the remove button and click it
    const removeButton = screen.getByText("حذف");
    fireEvent.click(removeButton);

    // Verify that RemovePost was called with the correct arguments
    expect(api.RemovePost).toHaveBeenCalledWith(1);
  });
});
