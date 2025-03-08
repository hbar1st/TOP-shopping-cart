import matchMediaPolyfill from "mq-polyfill";
import { describe, it, expect, vi } from "vitest";

import {
  render,
  within,
  screen,
  waitFor,
  getByTestId,
  fireEvent,
} from "@testing-library/react";

import { RouterProvider, createMemoryRouter } from "react-router";
import routes from "../routes";
import userEvent from "@testing-library/user-event";
import { act } from "react";

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
    act(() => {
        window.resizeTo(300, 699);
    })
    fireEvent(window, new Event("resize"));
    screen.debug;
    const arrow = await findByTestId("arrow");
    console.log(arrow.getAttribute("alt"));
    await waitFor(() => {
      expect(arrow.getAttribute("alt")).toBe("arrow pointing down");
    });
  });
});
