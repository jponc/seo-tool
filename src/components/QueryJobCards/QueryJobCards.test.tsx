import { fireEvent, render } from "@testing-library/react";
import { QueryJob } from "../../types";
import { QueryJobCards } from "./QueryJobCards";

const buildQueryJob = ({
  id = "123",
  keyword = "hello world",
  completedAt = new Date().toISOString(),
  createdAt = new Date().toISOString(),
}: {
  id?: string;
  keyword?: string;
  completedAt?: string | null;
  createdAt?: string;
}): QueryJob => {
  return {
    id,
    keyword,
    completed_at: completedAt,
    created_at: createdAt,
  };
};

describe("QueryJobCards", () => {
  it("shows query job keyword", () => {
    const queryJob = buildQueryJob({ keyword: "hello world" });

    const { getByText } = render(
      <QueryJobCards
        queryJobs={[queryJob]}
        onClick={jest.fn()}
        onDelete={jest.fn()}
      />
    );
    expect(getByText("hello world")).toBeInTheDocument();
  });

  it("shows completed pill for completed query job", () => {
    const queryJob = buildQueryJob({ completedAt: new Date().toISOString() });

    const { getByText } = render(
      <QueryJobCards
        queryJobs={[queryJob]}
        onClick={jest.fn()}
        onDelete={jest.fn()}
      />
    );

    expect(getByText("Completed")).toBeInTheDocument();
  });

  it("shows processing pill for processing query job", () => {
    const queryJob = buildQueryJob({
      completedAt: null,
      createdAt: new Date().toISOString(),
    });

    const { getByText } = render(
      <QueryJobCards
        queryJobs={[queryJob]}
        onClick={jest.fn()}
        onDelete={jest.fn()}
      />
    );

    expect(getByText("Processing")).toBeInTheDocument();
  });

  it("shows failed pill for query job that's been processing for more than 30 minutes", () => {
    const d = new Date();
    d.setDate(d.getDate() - 1);
    const queryJob = buildQueryJob({
      completedAt: null,
      createdAt: d.toISOString(),
    });

    const { getByText } = render(
      <QueryJobCards
        queryJobs={[queryJob]}
        onClick={jest.fn()}
        onDelete={jest.fn()}
      />
    );

    expect(getByText("Error")).toBeInTheDocument();
  });

  it("triggers onDelete when clicking the bin icon", () => {
    const queryJob = buildQueryJob({ id: "123" });
    const onDeleteMock = jest.fn();

    const { getByTestId } = render(
      <QueryJobCards
        queryJobs={[queryJob]}
        onClick={jest.fn()}
        onDelete={onDeleteMock}
      />
    );

    fireEvent.click(getByTestId("QueryJobCards__delete-btn"));

    expect(onDeleteMock).toHaveBeenCalledWith("123");
  });

  it("triggers onClick with queryJobId when clicking the card", () => {});
});
