import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import Content from "./Content";
import { getMySentResumes } from "../../../services/api";
import { sentResume } from "../../../ts/interfaces";

jest.mock("../../../services/api");

describe("Content", () => {

  test("should render list of items when resumes are fetched", async () => {
    const mockResumes: sentResume[] = [
      {
        id: 1,
        sent_date: "s",
        state: "Wds",
        post: {
          id: 1,
          title: "dfvf",
          city: { id: 1, title: "qom" },
          cooperation_type: "fds",
          created_date: "cds",
          degree: "dsc",
          description: "dcsd",
          experience: "dsc",
          job_type: { id: 1, title: "fscv " },
          salary: "dsc",
          sarbazi: "hntght",
          sex: "RTe",
          skills: [{ id: 1, title: "qwer" }],
          state: { id: 1, title: "o;iuyjth" },
          user: "dsc",
        },
        resume: "sd",
      },
    ];
    (getMySentResumes as jest.Mock).mockResolvedValue({
      data: { data: mockResumes },
    });

    render(<Content index={2} />);
    await waitFor(() => {
      const items = screen.getAllByTestId("card-item");

      expect(items).toHaveLength(2);
    });
  });

  test("should render empty list message when no resumes are available", async () => {
    (getMySentResumes as jest.Mock).mockResolvedValue({
      data: { data: [] },
    });

    render(<Content index={1} />);
    await waitFor(() => {
      const emptyMessage = screen.getByText(
        "لیست درخواست‌های این بخش خالی است"
      );
      expect(emptyMessage).toBeInTheDocument();
    });
  });

  test("should handle API errors correctly", async () => {
    const errorMessage = "API error";
    (getMySentResumes as jest.Mock).mockRejectedValue(new Error(errorMessage));

    const { container } = render(<Content index={0} />);
    await waitFor(() => {
      const x = container.getElementsByClassName("fa-spinner");
      expect(x).toHaveLength(1);
    });
  });

});
