import { fireEvent, render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { KeywordQueue } from "./KeywordQueue";

describe("KeywordQueue", () => {
  it("enqueues a new keyword when pressing Queue", () => {
    const onQueueClickMock = jest.fn();

    const { getByTestId } = render(<KeywordQueue onQueueClick={onQueueClickMock} />);

    const searchField = getByTestId("KeywordQueue__search-field-input")
    userEvent.type(searchField, "new keyword")

    expect(searchField).toHaveValue("new keyword")

    const queueBtn = getByTestId("KeywordQueue__queue-btn")
    fireEvent.click(queueBtn)

    expect(searchField).toHaveValue("")
    expect(onQueueClickMock).toHaveBeenCalledWith("new keyword")
  });
});
