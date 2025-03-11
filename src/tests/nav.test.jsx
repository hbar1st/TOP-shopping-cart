import { describe, it, expect, vi } from "vitest";
import React, { useRef, useState } from "react";
import {
  render,
  fireEvent,
  waitFor,
  waitUntil,
  act,
} from "@testing-library/react";

import { RouterProvider, createMemoryRouter } from "react-router";
import routes from "../routes";

import userEvent from "@testing-library/user-event";

describe("Nav links", () => {
  it("Check link to Shop", async () => {
    const user = userEvent.setup();
    const router = createMemoryRouter(routes, {
      initialEntries: ["/"],
      initialIndex: 0,
    });
    const { getByRole, getAllByRole } = render(
      <RouterProvider router={router}></RouterProvider>
    );
    const links = getAllByRole("link");
    await user.click(links[2]);
    let main = getByRole("main");
    expect(main.textContent).toStrictEqual("Gimme a minute to grab my bag...");

    await waitFor(
      () => {
        let heading = getByRole("heading");

        expect(heading.textContent).toBe("Shop till you drop!");

        let article = getAllByRole("article");
        expect(article.length).toBe(20);
      },
      { timeout: 1000 }
    );
  });

  it("Check link to Home", async () => {
    const user = userEvent.setup();
    const router = createMemoryRouter(routes, {
      initialEntries: ["/shop"],
      initialIndex: 0,
    });
    const { getByRole, getAllByRole } = render(
      <RouterProvider router={router}></RouterProvider>
    );
    const links = getAllByRole("link");
    await user.click(links[1]);
    let main = getByRole("main");
    expect(main.textContent).toStrictEqual(
      "Welcome to Hanazon! The randomest shopping experience ever!Click to start "
    );
  });

  it("Check link to Cart", async () => {
    const user = userEvent.setup();
    const router = createMemoryRouter(routes, {
      initialEntries: ["/"],
      initialIndex: 0,
    });
    const { getByRole, getAllByRole } = render(
      <RouterProvider router={router}></RouterProvider>
    );
    const links = getAllByRole("link");
    await user.click(links[3]);
    let main = getByRole("main");
    expect(main.textContent).toStrictEqual("Shopping CartYour cart is empty.");
  });
});
