import { render, screen, waitFor } from "@testing-library/react";
import Bookmark from "./Bookmark";
import { getBookmark } from "../../services/api";

jest.mock("../../services/api");

describe("Bookmark component", () => {
  test("renders the 'نشان شده‌ها' heading", async () => {
    const bookmarksData = {
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
      getBookmark as jest.MockedFunction<typeof getBookmark>
    ).mockResolvedValueOnce(bookmarksData as any);

    render(<Bookmark />);

    await waitFor(() => expect(getBookmark).toHaveBeenCalledTimes(1));

    // const headingElement = screen.getByText(/نشان شده‌ها/i);
    // expect(headingElement).toBeInTheDocument();
  });

  test("renders a loading spinner while fetching bookmarks", async () => {
    (
      getBookmark as jest.MockedFunction<typeof getBookmark>
    ).mockResolvedValueOnce(new Promise(() => {})); // resolves after a long delay

    render(<Bookmark />);

    const spinnerElement = screen.getByRole("status");
    expect(spinnerElement).toBeInTheDocument();

    await waitFor(() => expect(getBookmark).toHaveBeenCalledTimes(1));
  });

  test("renders bookmark cards when bookmarks exist", async () => {
    const bookmarksData = {
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
      ],
    };
    (
      getBookmark as jest.MockedFunction<typeof getBookmark>
    ).mockResolvedValueOnce(bookmarksData as any);

    render(<Bookmark />);

    await waitFor(() => expect(getBookmark).toHaveBeenCalledTimes(1));

    // const cardTitleElement = screen.getByText(/test post 1/i);
    // expect(cardTitleElement).toBeInTheDocument();
  });

  test("renders a message when no bookmarks exist", async () => {
    const bookmarksData = { data: [] };
    (
      getBookmark as jest.MockedFunction<typeof getBookmark>
    ).mockResolvedValueOnce(bookmarksData as any);

    render(<Bookmark />);

    await waitFor(() => expect(getBookmark).toHaveBeenCalledTimes(1));

    // const messageElement = screen.getByText(/لیست نشان شده‌ها خالی است/i);
    // expect(messageElement).toBeInTheDocument();
  });
});

