import { describe, it, expect, vi } from "vitest";

import { render, within, screen, waitFor } from "@testing-library/react";

import { RouterProvider, createMemoryRouter } from "react-router-dom";
import routes from "../routes";
import userEvent from "@testing-library/user-event";

import App from "../components/App";

describe("App", () => {
  it("renders nav element", () => {
    const router = createMemoryRouter(routes, {initialEntries:["/"], initialIndex: 0});
    const { getByRole } = render(<RouterProvider router={router}></RouterProvider>);
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
    const router = createMemoryRouter(routes, {initialEntries:["/"], initialIndex: 0});
    const { getByRole } = render(<RouterProvider router={router}></RouterProvider>);

    console.log(screen.getAllByRole("heading").length);
  });
});