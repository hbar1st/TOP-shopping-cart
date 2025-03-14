import { describe, it, expect, vi } from "vitest";
import { within, render } from "@testing-library/react";
import { RouterProvider, createMemoryRouter } from "react-router";
import { screen } from "@testing-library/dom";
import userEvent from "@testing-library/user-event";
import Modal from "../components/Modal.jsx";
import Nav from "../components/Modal.jsx";
import routes from "../routes";

beforeAll(() => {
  //we have to mock these because HTMLDialogElement is not supported yet by jsdom as of March 13, 2025
  HTMLDialogElement.prototype.show = vi.fn(function mock() {
    this.open = true;
  });

  HTMLDialogElement.prototype.showModal = vi.fn(function mock() {
    this.open = true;
  });

  HTMLDialogElement.prototype.close = vi.fn(function mock() {
    this.open = false;
  });
});

describe("Shop page", () => {
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

  it("Shop page display during network error", async () => {
    const user = userEvent.setup();

    vi.spyOn(Math, "random").mockReturnValue(0.8);

    // Give our mock only one product to avoid confusion when confirming the product card contents
    global.fetch = vi.fn().mockRejectedValue(new Error("Async error"));

    const router = createMemoryRouter(routes, {
      initialEntries: ["/"],
      initialIndex: 0,
    });
    const { getByRole, getAllByRole } = render(
      <RouterProvider router={router}></RouterProvider>
    );
    const links = getAllByRole("link");
    await user.click(links[2]);

    const content = getByRole("heading");
    expect(content.textContent).toBe(
      "Retail therapy aborted due to network error!"
    );
  });

  it("Product card display for in stock item", async () => {
    const user = userEvent.setup();

    vi.spyOn(Math, "random").mockReturnValue(0.8);

    // Give our mock only one product to avoid confusion when confirming the product card contents
    global.fetch = vi.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve([products[0]]),
      })
    );
    const router = createMemoryRouter(routes, {
      initialEntries: ["/"],
      initialIndex: 0,
    });
    const { getByRole, getAllByRole } = render(
      <RouterProvider router={router}></RouterProvider>
    );
    const links = getAllByRole("link");
    await user.click(links[2]);

    let article = getByRole("article");

    const productInputWidget = within(article).getByRole("group");
    expect(productInputWidget.getAttribute("id")).toBe(`${products[0].id}`);

    const productImg = within(article).getByRole("img");
    expect(productImg.getAttribute("alt")).toBe(`${products[0].title}`);
    expect(productImg.getAttribute("src")).toBe(`${products[0].image}`);

    const productTitle = within(article).getByRole("heading");
    expect(productTitle.textContent).toBe(`${products[0].title}`);

    const productDetails = within(article).getAllByRole("paragraph");

    expect(productDetails[0].textContent).toBe(`SKU # ${products[0].id}`);
    expect(productDetails[1].textContent).toBe(`$${products[0].price}`);
    const shortStockMsg = within(article).getByTestId("shortStockMsg");
    const regex = /Only (?<number>\d+) available/i;
    const stockNumber = shortStockMsg.textContent.match(regex).groups.number;

    expect(productDetails[2].textContent).toBe("Free Delivery");

    const buttons = within(article).getAllByRole("button");
    expect(buttons.length).toBe(3);
    expect(buttons[2].textContent).toBe("Add to Cart");
    expect(buttons[1].ariaLabel).toBe("subtract 1");
    expect(buttons[0].ariaLabel).toBe("add 1");

    const input = within(article).getByRole("spinbutton");
    expect(input.min).toBe(`0`);
    expect(input.max).toBe(`${stockNumber}`);
    expect(input.required).toBe(false);
    expect(input.value).toBe("");

    const rating = within(article).getByTestId("rating");
    expect(rating.textContent).toBe(`${products[0].rating.rate}`);
  });

  it("Product card display for out of stock item", async () => {
    const user = userEvent.setup();

    vi.spyOn(Math, "random").mockReturnValue(0.1);

    // Give our mock only one product to avoid confusion when confirming the product card contents
    global.fetch = vi.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve([products[0]]),
      })
    );

    const router = createMemoryRouter(routes, {
      initialEntries: ["/"],
      initialIndex: 0,
    });
    const { getByRole, getAllByRole } = render(
      <RouterProvider router={router}></RouterProvider>
    );
    const links = getAllByRole("link");
    await user.click(links[2]);

    let article = getByRole("article");

    const productInputWidget = within(article).getByRole("group");
    expect(productInputWidget.getAttribute("id")).toBe(`${products[0].id}`);

    const productImg = within(article).getByRole("img");
    expect(productImg.getAttribute("alt")).toBe(`${products[0].title}`);
    expect(productImg.getAttribute("src")).toBe(`${products[0].image}`);

    const productTitle = within(article).getByRole("heading");
    expect(productTitle.textContent).toBe(`${products[0].title}`);

    const productDetails = within(article).getAllByRole("paragraph");

    expect(productDetails[0].textContent).toBe(`SKU # ${products[0].id}`);
    expect(productDetails[1].textContent).toBe(`$${products[0].price}`);

    expect(productDetails[2].textContent).toBe("Out of Stock");

    const buttons = within(article).getAllByRole("button");
    expect(buttons.length).toBe(3);

    expect(buttons[2].textContent).toBe("Add to Cart");
    expect(buttons[2].disabled).toBe(true);

    expect(buttons[1].ariaLabel).toBe("subtract 1");
    expect(buttons[1].disabled).toBe(true);

    expect(buttons[0].ariaLabel).toBe("add 1");
    expect(buttons[0].disabled).toBe(true);

    const input = within(article).queryByRole("spinbutton");
    expect(input).not.toBeInTheDocument();
  });

  it("The Add 1 and Minus 1 buttons check from Shop", async () => {
    //buttons in the shop page behave differently than in the cart page! (watch out)

    const user = userEvent.setup();

    // Give our mock only one product to avoid confusion when confirming the product card contents
    // and ensure the stock is more than zero
    vi.spyOn(Math, "random").mockReturnValue(0.5); //this will give us 3 items in stock
    global.fetch = vi.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve([products[0]]),
      })
    );
    const router = createMemoryRouter(routes, {
      initialEntries: ["/"],
      initialIndex: 0,
    });
    const { getByRole, getAllByRole } = render(
      <RouterProvider router={router}></RouterProvider>
    );

    const links = getAllByRole("link");
    await user.click(links[2]); //goto the shop page

    let article = getByRole("article");

    const buttons = within(article).getAllByRole("button");
    expect(buttons.length).toBe(3);
    expect(buttons[1].ariaLabel).toBe("subtract 1");
    expect(buttons[0].ariaLabel).toBe("add 1");

    const shortStockMsg = within(article).getByTestId("shortStockMsg");

    expect("hidden").toBeOneOf(Object.values(shortStockMsg.classList));
    const regex = /Only (?<number>\d+) available/i;
    const stockNumber = shortStockMsg.textContent.match(regex).groups.number;
    
    for (let i = 0; i < stockNumber; i++) {
      await user.click(buttons[0]); //try to add 1 to the input
      const input = within(article).getByRole("spinbutton");
      expect(input.value).toBe(`${i + 1}`);
    }

    await user.click(buttons[0]); //try to add 1 to the input to go above the max stock available
    let input = within(article).getByRole("spinbutton");
    expect(input.value).toBe(`${stockNumber}`);
    expect("invalid-amt").toBeOneOf(Object.values(shortStockMsg.classList));

    for (let i = stockNumber; i > 1; i--) {
      await user.click(buttons[1]); //try to subtract 1 from the input value
      const input = within(article).getByRole("spinbutton");
      expect(input.value).toBe(`${i - 1}`);
    }

    await user.click(buttons[1]); //try to subtract the last 1 so the input goes blank
    input = within(article).getByRole("spinbutton");
    expect(input.value).toBe("");
    expect("hidden").toBeOneOf(Object.values(shortStockMsg.classList));
  });

  it("Add To Cart default amount", async () => {
    const user = userEvent.setup();

    // Give our mock only one product to avoid confusion when confirming the product card contents
    // and ensure the stock is more than zero
    vi.spyOn(Math, "random").mockReturnValue(0.5); //this will give us 3 items in stock
    global.fetch = vi.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve([products[0]]),
      })
    );
    const router = createMemoryRouter(routes, {
      initialEntries: ["/"],
      initialIndex: 0,
    });
    const { getByRole, getAllByRole } = render(
      <RouterProvider router={router}>
        <Nav cartItems={[products[0]]} />

        <Modal onClose={() => {}} showModalObj={products[0]} />
      </RouterProvider>
    );

    const links = getAllByRole("link");
    await user.click(links[2]); //goto the shop page

    const article = getByRole("article");

    let buttons = within(article).getAllByRole("button");
    expect(buttons.length).toBe(3);
    expect(buttons[2].textContent).toBe("Add to Cart");

    await user.click(buttons[2]); //attempt to add to the cart
    const dialog = screen.getByTestId("modal");
    expect(dialog.open).toBe(true);
    const header = within(dialog).getByText("Added to cart:");
    const image = within(dialog).getByAltText(
      "Opna Women's Short Sleeve Moisture"
    );
    const desc = within(dialog).getByRole("group");
    expect(desc.textContent).toBe(`Description${products[0].description}`);
    buttons = within(dialog).getAllByRole("button");
    expect(buttons.length).toBe(2);
    expect(buttons[0].textContent).toBe("Go to cart");
    expect(buttons[1].textContent).toBe("Continue Shopping");
    const amount = within(dialog).getByText(`Amount: 1`);
    await user.click(buttons[1]);

    const input = within(article).getByRole("spinbutton");
    expect(input.value).toBe("");
    const shortStockMsg = within(article).getByTestId("shortStockMsg");
    expect("hidden").toBeOneOf(Object.values(shortStockMsg.classList));
    const regex = /Only (?<number>\d+) available/i;
    const stockNumber = shortStockMsg.textContent.match(regex).groups.number;
    expect(stockNumber).toBe(`2`); //we started out with 3, then added one to cart, so should have 2 now

    buttons = within(article).getAllByRole("button");
    expect(buttons.length).toBe(3);

    expect(buttons[2].textContent).toBe("Add to Cart");
    expect(buttons[2].disabled).toBe(false);
  });

  it("Add To Cart inputed amount", async () => {
    const user = userEvent.setup();

    // Give our mock only one product to avoid confusion when confirming the product card contents
    // and ensure the stock is more than zero
    vi.spyOn(Math, "random").mockReturnValue(0.5); //this will give us 3 items in stock
    global.fetch = vi.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve([products[0]]),
      })
    );
    const router = createMemoryRouter(routes, {
      initialEntries: ["/"],
      initialIndex: 0,
    });
    const { getByRole, getAllByRole } = render(
      <RouterProvider router={router}>
        <Nav cartItems={[products[0]]} />

        <Modal onClose={() => {}} showModalObj={products[0]} />
      </RouterProvider>
    );

    const links = getAllByRole("link");
    await user.click(links[2]); //goto the shop page

    const article = getByRole("article");

    const input = within(article).getByRole("spinbutton");
    await user.type(input, "3");
    let buttons = within(article).getAllByRole("button");
    expect(buttons.length).toBe(3);
    expect(buttons[2].textContent).toBe("Add to Cart");

    await user.click(buttons[2]); //attempt to add to the cart
    const dialog = screen.getByTestId("modal");
    expect(dialog.open).toBe(true);
    const header = within(dialog).getByText("Added to cart:");
    const image = within(dialog).getByAltText(
      "Opna Women's Short Sleeve Moisture"
    );
    const desc = within(dialog).getByRole("group");
    expect(desc.textContent).toBe(`Description${products[0].description}`);
    buttons = within(dialog).getAllByRole("button");
    expect(buttons.length).toBe(2);
    expect(buttons[0].textContent).toBe("Go to cart");
    expect(buttons[1].textContent).toBe("Continue Shopping");
    const amount = within(dialog).getByText(`Amount: 3`);
    await user.click(buttons[1]);

    expect(input.value).toBe("");
    const shortStockMsg = within(article).getByTestId("shortStockMsg");
    expect("hidden").toBeOneOf(Object.values(shortStockMsg.classList));
    const regex = /Only (?<number>\d+) available/i;
    const stockNumber = shortStockMsg.textContent.match(regex).groups.number;
    expect(stockNumber).toBe(`0`); //we started out with 3, then added one to cart, so should have 2 now
    buttons = within(article).getAllByRole("button");
    expect(buttons.length).toBe(3);

    expect(buttons[2].textContent).toBe("Add to Cart");
    expect(buttons[2].disabled).toBe(true);
  });
});
