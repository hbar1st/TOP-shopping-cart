import { describe, it, expect, vi } from "vitest";

import { render, within, screen, waitFor } from "@testing-library/react";

import {
  BrowserRouter,
  RouterProvider,
  MemoryRouter,
  createMemoryRouter,
} from "react-router-dom";
import userEvent from "@testing-library/user-event";

import App from "../components/App";
import routes from "../routes.jsx";

describe("App", () => {
  it("renders nav element", () => {
    const { getByRole } = render(<App />, { wrapper: BrowserRouter });
    const nav = getByRole("navigation");

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
    const router = createMemoryRouter(routes, {
      initialEntries: ["/", "/home"],
      initialIndex: 1,
    });

    render(<RouterProvider router={router} />, { wrapper: MemoryRouter });
    screen.debug();
    expect(screen.getByRole("heading")).toBeInTheDocument();
  });
});
