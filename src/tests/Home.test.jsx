import { describe, it, expect, vi } from "vitest";
import React, { useRef, useState } from "react";
import { render, fireEvent, waitFor, waitUntil, act } from "@testing-library/react";

import { RouterProvider, createMemoryRouter } from "react-router";
import routes from "../routes";

import userEvent from "@testing-library/user-event";

describe("Home", () => {
  it("Check home page", () => {
    const router = createMemoryRouter(routes, {
      initialEntries: ["/home"],
      initialIndex: 0,
    });
    const { getAllByRole } = render(
      <RouterProvider router={router}></RouterProvider>
    );
    const headers = getAllByRole("heading");
    expect(headers).toHaveLength(2);
    expect(headers[0].textContent).toStrictEqual(
      "Welcome to Hanazon! The randomest shopping experience ever!"
    );
    expect(headers[1].textContent).toStrictEqual("Click to start ");
  });

  it("Check link on slideshow", async () => {
    
    const user = userEvent.setup();
    const router = createMemoryRouter(routes, {
      initialEntries: ["/home"],
      initialIndex: 0,
    });
    const { getByRole, getAllByRole } = render(
      <RouterProvider router={router}></RouterProvider>
    );
    const links = getAllByRole("link");
    await user.click(links[4]);
    let main = getByRole("main");
    expect(main.textContent).toStrictEqual("Gimme a minute to grab my bag...");

    await waitFor(
      () => {
        let headers = getAllByRole("heading");

        expect(headers[0].textContent).toBe("Shop till you drop!");
        
        let article = getAllByRole("article");
        expect(article.length).toBe(20);

      },
      { timeout: 1000 }
    );

    
  });

  it.skip("Check home page arrow icon", async () => {
    vi.mock("react", async () => {
      const originalModule = await vi.importActual("react");

      return {
        ...originalModule,
        useRef: vi.fn(() => {
          return {
            current: { offsetTop: 100 },
          };
        }),
      };
    });

    const makeResponse = (n = 100) => {
      return { current: { offsetTop: n } };
    };

    vi.mocked(useRef)
      .mockReturnValueOnce(makeResponse(100))
      .mockReturnValueOnce(makeResponse(110))
      .mockReturnValueOnce(makeResponse(120))
      .mockReturnValueOnce(makeResponse(130))
      .mockReturnValueOnce(makeResponse(140))
      .mockReturnValueOnce(makeResponse(150))
      .mockReturnValueOnce(makeResponse(160))
      .mockReturnValueOnce(makeResponse(170))
      .mockReturnValueOnce(makeResponse(180))
      .mockReturnValueOnce(makeResponse(190))
      .mockReturnValueOnce(makeResponse(200))
      .mockReturnValueOnce(makeResponse(210))
      .mockReturnValueOnce(makeResponse(220))
      .mockReturnValueOnce(makeResponse(230));

    const router = createMemoryRouter(routes, {
      initialEntries: ["/"],
      initialIndex: 0,
    });
    const { getAllByRole, findByTestId } = render(
      <RouterProvider router={router}></RouterProvider>
    );

    fireEvent(window, new Event("resize"));
    const arrow = await findByTestId("arrow");
    console.log(arrow.getAttribute("alt"));
    /*
    await waitFor(() => {
      expect(arrow.getAttribute("alt")).toBe("arrow pointing down");
    });
    */

    console.log(useRef.mock.results);
    vi.doUnmock("react");
  });
});
