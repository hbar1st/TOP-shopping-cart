import { describe, it, expect, vi } from "vitest";

import { render, within, screen, waitFor } from "@testing-library/react";

import { BrowserRouter, MemoryRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";

import App from "../components/App";

describe("App", () => {
  it("renders nav element", () => {
    const { getByRole } = render(<App />, { wrapper: BrowserRouter });
    const nav = getByRole("navigation");
    screen.debug();

    // check if App components renders nav element
    expect(nav).toBeInTheDocument();

    // confirm number and content of links in the nav
    const logoLinks = within(nav).getAllByRole("link");
    expect(logoLinks).toHaveLength(4);
    expect(logoLinks[0].ariaLabel).toStrictEqual("Hanazon logo");
    expect(logoLinks[1].textContent).toStrictEqual("Home");
    expect(logoLinks[2].textContent).toStrictEqual("Shop");
    expect(logoLinks[3].ariaLabel).toStrictEqual("0 items in cart");
  });

  it("full app rendering/navigating", async () => {
    render(
      <MemoryRouter initialEntries={["/home"]}>
        <App />
      </MemoryRouter>
    );

    expect(screen.getByRole("heading")).toBeInTheDocument();
  });
});
/*
    const mockedUsedNavigate = vi.fn();
    vi.mock("react-router-dom", () => ({
      ...vi.requireActual("react-router-dom"),
      useNavigate: () => mockedUsedNavigate,
    }));
    */
//expect(screen.getByText(/you are home/i)).toBeInTheDocument()

/** 
    await waitFor(() => {
      expect(getByRolr('heading')).toBeInTheDocument()
    },{ timeout: 5000 })
    */

/**
 * Sample tests below
 */
/*
describe("something truthy and falsy", () => {
  it("true to be true", () => {
    expect(true).toBe(true);
    
    //expect(.textContent).toMatch(/our first test/i);
  });

  it("false to be false", () => {
    expect(false).toBe(false);
  });
});

*/
/*
describe("App component", () => {
  it("renders correct heading", () => {
    render(<App />);
    expect(screen.getByRole("heading").textContent).toMatch(/our first test/i);
  });
});


describe("App component", () => {
  it("renders magnificent monkeys", () => {
    // since screen does not have the container property, we'll destructure render to obtain a container for this test
    const { container } = render(<App />);
    expect(container).toMatchSnapshot();
  });

  it("renders radical rhinos after button click", async () => {
    const user = userEvent.setup();

    render(<App />);
    const button = screen.getByRole("button", { name: "Click Me" });

    await user.click(button);

    expect(screen.getByRole("heading").textContent).toMatch(/radical rhinos/i);
  });
});
*/
