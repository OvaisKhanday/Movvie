import { fireEvent, render, screen } from "@testing-library/react";
import App from "../App";

describe("counter", () => {
  test("count is 0", () => {
    render(<App />);
    const counterElement = screen.getByTestId("counter");
    expect(counterElement).toHaveTextContent("0");
  });
  test("count increments to 1", () => {
    render(<App />);
    const counterText = screen.getByTestId("counter");
    const counterIncrementButton = screen.getByTestId("counter-increment");
    fireEvent.click(counterIncrementButton);
    expect(counterText).toHaveTextContent("1");
  });
});
