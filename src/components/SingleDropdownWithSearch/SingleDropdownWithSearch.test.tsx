import { render, screen } from "@testing-library/react";

import SingleDropdownWithSearch from ".";

describe("SingleDropdownWithSearch.test Component", () => {
  it("renders correctly", () => {
    const { asFragment } = render(
      <SingleDropdownWithSearch onChange={() => {}} />
    );
    expect(asFragment()).toMatchSnapshot();
  });
  it("Existence of options' label in document", () => {
    const data = [
      { label: "تست1", value: "1" },
      { label: "تست2", value: "2" },
      { label: "تست3", value: "3" },
      { label: "تست4", value: "4" },
    ];
    render(<SingleDropdownWithSearch onChange={() => {}} options={data} />);
    expect(screen.getByText(data[0].label)).toBeInTheDocument();
    expect(screen.getByText(data[1].label)).toBeInTheDocument();
    expect(screen.getByText(data[2].label)).toBeInTheDocument();
    expect(screen.getByText(data[3].label)).toBeInTheDocument();
  });
});
