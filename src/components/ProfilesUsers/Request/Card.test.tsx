import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import CardItem from "./Card";

describe("CardItem", () => {
  const sampleItem = {
    index: 0,
    item: {
      post: {
        skills: [
          { id: 1, title: "Skill 1" },
          { id: 2, title: "Skill 2" },
        ],
        id: 1,
        title: "Sample Post",
        user: {
          logo: null,
        },
        city: { id: 1, title: "City" },
        state: { id: 1, title: "State" },
        cooperation_type: "Full-time",
        salary: "1000",
        sarbazi: "moaf",
        created_date: "string",
        degree: "rgfvdcsx",
        description: "fvcdxs",
        experience: "erre",
        job_type: { id: 1, title: "RTedws" },
        sex: "man",
      },
      sent_date: "2023-05-17",
      state: "Sent",
      resume: "fvds",
      id: 1,
    },
  };

  it("renders card item correctly", () => {
    render(
      <MemoryRouter>
        <CardItem {...sampleItem} />
      </MemoryRouter>
    );

    // Check if the post title is rendered
    const postTitle = screen.getByText("Sample Post");
    expect(postTitle).toBeInTheDocument();

    // Check if the post location is rendered
    const postLocation = screen.getByText("City, State");
    expect(postLocation).toBeInTheDocument();

    // Check if the post details are rendered
    const postDetails = screen.getByText("Full-time (1000)");
    expect(postDetails).toBeInTheDocument();

    // Check if the skills are rendered
    const skill1 = screen.getByText("Skill 1");
    const skill2 = screen.getByText("Skill 2");
    expect(skill1).toBeInTheDocument();
    expect(skill2).toBeInTheDocument();

    // Check if the sent status button is rendered
    const sentButton = screen.getByText("ارسال شد");
    expect(sentButton).toBeInTheDocument();
  });
});
