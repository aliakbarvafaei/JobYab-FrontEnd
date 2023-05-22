import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { getMyPosts } from "../../../services/api";
import MyPosts from "./MyPosts";

jest.mock("../../../services/api", () => ({
  getMyPosts: jest.fn(),
}));

describe("MyPosts component", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  test("renders the آگهی های من heading", async () => {
    const postsData = {
      data: [
        {
          id: 1,
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
        },
        {
          id: 2,
          post: {
            id: 2,
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
        },
      ],
    };
    (
      getMyPosts as jest.MockedFunction<typeof getMyPosts>
    ).mockResolvedValueOnce(postsData as any);

    render(<MyPosts />);

    await waitFor(() => expect(getMyPosts).toHaveBeenCalledTimes(1));
  });

  test("renders posts correctly when data is available", async () => {
    const mockPosts = { data: [{ id: 1, title: "fvdsx" }] };
    (
      getMyPosts as jest.MockedFunction<typeof getMyPosts>
    ).mockResolvedValueOnce(mockPosts as any);
    render(<MyPosts />);

    await screen.findByText("آگهی‌های من"); // Wait for the component to finish rendering

    expect(
      screen.queryByText("لیست آگهی‌های این بخش خالی است")
    ).not.toBeInTheDocument();
  });
});
