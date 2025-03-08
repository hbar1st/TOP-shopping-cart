import { describe, it, expect, vi } from "vitest";
import { useRef } from "react";

import { render, fireEvent } from "@testing-library/react";

import { RouterProvider, createMemoryRouter } from "react-router";
import routes from "../routes";

describe("Home", () => {
  it("Check home page", async () => {
    const router = createMemoryRouter(routes, {
      initialEntries: ["/"],
      initialIndex: 0,
    });
    const { getAllByRole, findByTestId } = render(
      <RouterProvider router={router}></RouterProvider>
    );
    const headers = getAllByRole("heading");
    expect(headers).toHaveLength(2);
    expect(headers[0].textContent).toStrictEqual(
      "Welcome to Hanazon! The randomest shopping experience ever!"
    );
    expect(headers[1].textContent).toStrictEqual("Click to start ");

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
      .mockReturnValueOnce(makeResponse(180));

    fireEvent(window, new Event("resize"));
    const arrow = await findByTestId("arrow");
    console.log(arrow.getAttribute("alt"));
    /*
    await waitFor(() => {
      expect(arrow.getAttribute("alt")).toBe("arrow pointing down");
    });
    */

    console.log(useRef());
    console.log(useRef.mock.results);
    vi.doUnmock("react");
  });
});
