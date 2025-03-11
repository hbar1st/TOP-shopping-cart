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

describe("Shop pagef", () => {
  let products = [
    {
      category: "women's clothing",
      description:
        "100% Polyester, Machine wash, 100% cationic polyester interlock, Machine Wash & Pre Shrunk for a Great Fit, Lightweight, roomy and highly breathable with moisture wicking fabric which helps to keep moisture away, Soft Lightweight Fabric with comfortable V-neck collar and a slimmer fit, delivers a sleek, more feminine silhouette and Added Comfort",
      id: 19,
      image: "./assets/red-shirt.jpg",
      price: 7.95,
      rating: {
        rate: 4.5,
        count: 146,
      },
      title: "Opna Women's Short Sleeve Moisture",
    },
    {
      category: "women's clothing",
      description:
        "95%Cotton,5%Spandex, Features: Casual, Short Sleeve, Letter Print,V-Neck,Fashion Tees, The fabric is soft and has some stretch., Occasion: Casual/Office/Beach/School/Home/Street. Season: Spring,Summer,Autumn,Winter.",
      id: 20,
      image: "./assets/purple-shirt.jpg",
      price: 12.99,
      rating: { rate: 3.6, count: 145 },
      title: "DANVOUY Womens T Shirt Casual Cotton Short",
    },
  ];
  it("Add to cart", async () => {
    const user = userEvent.setup();
    /*
    const router = createMemoryRouter(routes, {
      initialEntries: ["/home"],
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
    */
  });
});
