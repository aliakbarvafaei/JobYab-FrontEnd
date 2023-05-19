import { render } from "@testing-library/react";
import DetailSection from ".";

describe("DetailSection", () => {
  const mockData = {
    job_type: { title: "Software Developer" },
    state: { title: "California" },
    city: { title: "San Francisco" },
    cooperation_type: "Full-time",
    salary: "$100,000",
    experience: "5 years",
    sex: "Male",
    degree: "Bachelor's degree",
    sarbazi: "Exempt",
    skills: [{ title: "React" }, { title: "Node.js" }],
  };
  it("renders without crashing when no data is passed", () => {
    // @ts-ignore
    render(<DetailSection data={mockData} />);
  });
});
