import { render, screen, fireEvent } from "@testing-library/react";
import Post from ".";

describe("Post Component", () => {
  test("Post component renders correctly with all props", () => {
    const onClickMock = jest.fn();
    const data = {
      id: 1,
      title: "Test Post",
      created_date: "2022-05-19T13:14:24.693Z",
      user: {
        logo: "/path/to/logo.png",
        company_persian_name: "Test Company",
      },
      state: { title: "Test State" },
      city: { title: "Test City" },
      cooperation_type: "Test Contract",
      skills: [{ title: "test skill 1" }, { title: "test skill 2" }],
    };

    // @ts-ignore
    render(<Post onClick={onClickMock} data={data} />);

    const postTitleElement = screen.getByText(data.title);
    expect(postTitleElement).toBeInTheDocument();

    const postCompanyElement = screen.getByText(data.user.company_persian_name);
    expect(postCompanyElement).toBeInTheDocument();

    const postLocationElement = screen.getByText(
      `${data.state.title} ${data.city.title}`
    );
    expect(postLocationElement).toBeInTheDocument();

    const postContractElement = screen.getByText(
      `قرارداد ${data.cooperation_type}`
    );
    expect(postContractElement).toBeInTheDocument();

    const resumeButtonElement = screen.getByRole("button", {
      name: /ارسال رزومه/i,
    });
    expect(resumeButtonElement).toBeInTheDocument();
  });

  test("Post component calls onClick prop when resume button is clicked", () => {
    const onClickMock = jest.fn();
    const data = {
      id: 1,
      title: "Test Post",
      created_date: "2022-05-19T13:14:24.693Z",
      user: {
        logo: "/path/to/logo.png",
        company_persian_name: "Test Company",
      },
      state: { title: "Test State" },
      city: { title: "Test City" },
      cooperation_type: "Test Contract",
      skills: [{ title: "test skill 1" }, { title: "test skill 2" }],
    };
    //@ts-ignore
    render(<Post onClick={onClickMock} data={data} />);

    const resumeButtonElement = screen.getByRole("button", {
      name: /ارسال رزومه/i,
    });
    fireEvent.click(resumeButtonElement);

    expect(onClickMock).toHaveBeenCalledTimes(1);
    expect(onClickMock).toHaveBeenCalledWith(data.id);
  });
});
