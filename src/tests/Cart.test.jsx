import { describe, it, expect, vi } from "vitest";
import { within, render } from "@testing-library/react";
import { RouterProvider, createMemoryRouter } from "react-router";
import { screen, waitFor } from "@testing-library/dom";
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

  Element.prototype.scrollIntoView = vi.fn(function mock() {});
});

describe("Cart page", () => {
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

  // all products checked should have 3 items in stock
  const checkCartItem = (product, article) => {
    const image = within(article).getByAltText(`${product.title}`);

    const productDetails = within(article).getAllByRole("paragraph");
    expect(productDetails[0].textContent).toBe(`SKU # ${product.id}`);
    expect(productDetails[1].textContent).toBe(`$${product.price}`);

    const shortStockMsg = within(article).getByTestId("shortStockMsg");
    const regex = /Only (?<number>\d+) available/i;
    const stockNumber = shortStockMsg.textContent.match(regex).groups.number;
    expect(stockNumber).toBe(`3`);
    const rating = within(article).getByTestId("rating");
    expect(rating.textContent).toBe(`${product.rating.rate}`);

    const itemButtons = within(article).getAllByRole("button");
    expect(itemButtons.length).toBe(3);
    expect(itemButtons[2].textContent).toBe("Delete");
    expect(itemButtons[1].ariaLabel).toBe("subtract 1");
    expect(itemButtons[0].ariaLabel).toBe("add 1");

    const itemImage = within(article).getByAltText(`${product.title}`);
  };

  it("Cart with one item", async () => {
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
    const { getByRole, getAllByRole, getByAltText, getByTestId } = render(
      <RouterProvider router={router}>
        <Nav cartItems={[products[0]]} />

        <Modal onClose={() => {}} showModalObj={products[0]} />
      </RouterProvider>
    );

    const links = getAllByRole("link");
    await user.click(links[2]); //goto the shop page

    let article = getByRole("article");

    let buttons = within(article).getAllByRole("button");
    expect(buttons.length).toBe(3);
    expect(buttons[2].textContent).toBe("Add to Cart");

    await user.click(buttons[2]); //attempt to add to the cart
    const dialog = screen.getByTestId("modal");
    expect(dialog.open).toBe(true);
    buttons = within(dialog).getAllByRole("button");
    expect(buttons.length).toBe(2);
    expect(buttons[0].textContent).toBe("Go to cart");
    await user.click(buttons[0]); //attempt to go to the cart
    article = getByRole("article");
    const headers = getAllByRole("heading");
    expect(headers.length).toBe(2);
    expect(headers[0].textContent).toBe("Shopping Cart");
    expect(headers[1].textContent).toBe(products[0].title);

    checkCartItem(products[0], article);
    const checkout = getByTestId("checkout");

    const cartSummary = within(checkout).getByRole("paragraph");
    expect(cartSummary.textContent).toBe(
      `Subtotal (1 items): $${products[0].price}`
    );
    const checkoutButtons = within(checkout).getAllByRole("button");
    expect(checkoutButtons.length).toBe(2);
    expect(checkoutButtons[0].textContent).toBe("Checkout Now");
    expect(checkoutButtons[1].textContent).toBe("Checkout With PayPal");
  });

  it("Checkout Now from cart", async () => {
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
    const { getByRole, getAllByRole, getByAltText, getByTestId } = render(
      <RouterProvider router={router}>
        <Nav cartItems={[products[0]]} />

        <Modal onClose={() => {}} showModalObj={products[0]} />
      </RouterProvider>
    );

    const links = getAllByRole("link");
    await user.click(links[2]); //goto the shop page

    let article = getByRole("article");

    let buttons = within(article).getAllByRole("button");
    expect(buttons.length).toBe(3);
    expect(buttons[2].textContent).toBe("Add to Cart");

    await user.click(buttons[2]); //attempt to add to the cart
    const dialog = screen.getByTestId("modal");
    expect(dialog.open).toBe(true);
    buttons = within(dialog).getAllByRole("button");
    expect(buttons.length).toBe(2);
    expect(buttons[0].textContent).toBe("Go to cart");
    await user.click(buttons[0]); //attempt to go to the cart
    article = getByRole("article");
    const headers = getAllByRole("heading");
    expect(headers.length).toBe(2);
    expect(headers[0].textContent).toBe("Shopping Cart");
    expect(headers[1].textContent).toBe(products[0].title);

    const checkout = getByTestId("checkout");

    const checkoutButtons = within(checkout).getAllByRole("button");
    expect(checkoutButtons.length).toBe(2);
    expect(checkoutButtons[0].textContent).toBe("Checkout Now");
    expect(checkoutButtons[1].textContent).toBe("Checkout With PayPal");

    await user.click(checkoutButtons[0]); //attempt to checkout with the first button

    const thankYou = getByRole("heading");
    expect(thankYou.textContent).toBe("Thanks for shopping!");

    //now check the cart is empty
    await user.click(links[3]);
    let main = getByRole("main");
    expect(main.textContent).toStrictEqual("Shopping CartYour cart is empty.");
  });

  it("Checkout With Paypal from cart", async () => {
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
    const { getByRole, getAllByRole, getByAltText, getByTestId } = render(
      <RouterProvider router={router}>
        <Nav cartItems={[products[0]]} />

        <Modal onClose={() => {}} showModalObj={products[0]} />
      </RouterProvider>
    );

    const links = getAllByRole("link");
    await user.click(links[2]); //goto the shop page

    let article = getByRole("article");

    let buttons = within(article).getAllByRole("button");
    expect(buttons.length).toBe(3);
    expect(buttons[2].textContent).toBe("Add to Cart");

    await user.click(buttons[2]); //attempt to add to the cart
    const dialog = screen.getByTestId("modal");
    expect(dialog.open).toBe(true);
    buttons = within(dialog).getAllByRole("button");
    expect(buttons.length).toBe(2);
    expect(buttons[0].textContent).toBe("Go to cart");
    await user.click(buttons[0]); //attempt to go to the cart
    article = getByRole("article");
    const headers = getAllByRole("heading");
    expect(headers.length).toBe(2);
    expect(headers[0].textContent).toBe("Shopping Cart");
    expect(headers[1].textContent).toBe(products[0].title);

    const checkout = getByTestId("checkout");

    const checkoutButtons = within(checkout).getAllByRole("button");
    expect(checkoutButtons.length).toBe(2);
    expect(checkoutButtons[0].textContent).toBe("Checkout Now");
    expect(checkoutButtons[1].textContent).toBe("Checkout With PayPal");

    await user.click(checkoutButtons[1]); //attempt to checkout with the second button

    const thankYou = getByRole("heading");
    expect(thankYou.textContent).toBe("Thanks for shopping!");

    //now check the cart is empty
    await user.click(links[3]);
    let main = getByRole("main");
    expect(main.textContent).toStrictEqual("Shopping CartYour cart is empty.");
  });

  it("Delete from cart", async () => {
    const user = userEvent.setup();

    // Give our mock two products
    // and ensure the stock is more than zero
    vi.spyOn(Math, "random").mockReturnValue(0.5); //this will give us 3 items in stock for each one
    global.fetch = vi.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(products),
      })
    );
    const router = createMemoryRouter(routes, {
      initialEntries: ["/"],
      initialIndex: 0,
    });
    const { getAllByRole, getByTestId } = render(
      <RouterProvider router={router}>
        <Nav cartItems={[products[0]]} />

        <Modal onClose={() => {}} showModalObj={products[0]} />
      </RouterProvider>
    );

    const links = getAllByRole("link");
    await user.click(links[2]); //goto the shop page

    let articles = getAllByRole("article");
    expect(articles.length).toBe(2);

    for (let i = 0; i < articles.length; i++) {
      let buttons = within(articles[i]).getAllByRole("button");
      expect(buttons.length).toBe(3);
      expect(buttons[2].textContent).toBe("Add to Cart");

      await user.click(buttons[2]); //attempt to add to the cart
      const dialog = screen.getByTestId("modal");
      expect(dialog.open).toBe(true);

      buttons = within(dialog).getAllByRole("button");
      expect(buttons.length).toBe(2);
      expect(buttons[1].textContent).toBe("Continue Shopping");
      await user.click(buttons[1]);
    }

    //check nav shows 2 products added
    const navLinks = getAllByRole("link");
    expect(navLinks.length).toBe(4);
    expect(navLinks[3].textContent).toBe(`2`); //two items indicated in the nav bar
    await user.click(links[3]); //go to the cart page

    let cartArticles = getAllByRole("article");
    expect(cartArticles.length).toBe(2); //two items in the cart

    const checkout = getByTestId("checkout");
    const cartSummary = within(checkout).getByRole("paragraph");
    expect(cartSummary.textContent).toBe(
      `Subtotal (${products.length} items): $${
        products[0].price + products[1].price
      }`
    );
    const itemButtons = within(cartArticles[0]).getAllByRole("button");
    expect(itemButtons.length).toBe(3);
    expect(itemButtons[2].textContent).toBe("Delete");
    await user.click(itemButtons[2]);

    cartArticles = getAllByRole("article");
    expect(cartArticles.length).toBe(1); //one item left in the cart

    expect(cartSummary.textContent).toBe(
      `Subtotal (1 items): $${products[1].price}`
    );
  });

  it("Cart with multiple products", async () => {
    const user = userEvent.setup();

    // Give our mock two products
    // and ensure the stock is more than zero
    vi.spyOn(Math, "random").mockReturnValue(0.5); //this will give us 3 items in stock
    global.fetch = vi.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(products),
      })
    );
    const router = createMemoryRouter(routes, {
      initialEntries: ["/"],
      initialIndex: 0,
    });
    const { getByRole, getAllByRole, getByTestId } = render(
      <RouterProvider router={router}>
        <Nav cartItems={[products[0]]} />

        <Modal onClose={() => {}} showModalObj={products[0]} />
      </RouterProvider>
    );

    const links = getAllByRole("link");
    await user.click(links[2]); //goto the shop page

    let articles = getAllByRole("article");
    expect(articles.length).toBe(2);

    for (let i = 0; i < articles.length; i++) {
      let buttons = within(articles[i]).getAllByRole("button");
      expect(buttons.length).toBe(3);
      const input = within(articles[i]).getByRole("spinbutton");
      await user.type(input, "3");
      expect(buttons[2].textContent).toBe("Add to Cart");

      await user.click(buttons[2]); //attempt to add to the cart
      const dialog = screen.getByTestId("modal");
      expect(dialog.open).toBe(true);

      buttons = within(dialog).getAllByRole("button");
      expect(buttons.length).toBe(2);
      expect(buttons[1].textContent).toBe("Continue Shopping");

      const amount = within(dialog).getByText(`Amount: 3`);
      await user.click(buttons[1]);
    }

    await user.click(links[3]); //go to the cart page

    const cartArticles = getAllByRole("article");
    const headers = getAllByRole("heading");
    expect(headers.length).toBe(3);
    expect(headers[0].textContent).toBe("Shopping Cart");
    expect(headers[1].textContent).toBe(products[0].title);
    expect(headers[2].textContent).toBe(products[1].title);

    checkCartItem(products[0], cartArticles[0]);
    checkCartItem(products[1], cartArticles[1]);
    const checkout = getByTestId("checkout");

    const cartSummary = within(checkout).getByRole("paragraph");
    expect(cartSummary.textContent).toBe(
      `Subtotal (6 items): $${products[0].price * 3 + products[1].price * 3}`
    );
  });

  it("Add or Subtract amounts from cart", async () => {
    const user = userEvent.setup();

    // Give our mock two products
    // and ensure the stock is more than zero
    vi.spyOn(Math, "random").mockReturnValue(0.5); //this will give us 3 items in stock
    global.fetch = vi.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(products),
      })
    );
    const router = createMemoryRouter(routes, {
      initialEntries: ["/"],
      initialIndex: 0,
    });
    const { getByRole, getAllByRole, getByTestId } = render(
      <RouterProvider router={router}>
        <Nav cartItems={[products[0]]} />

        <Modal onClose={() => {}} showModalObj={products[0]} />
      </RouterProvider>
    );

    const links = getAllByRole("link");
    await user.click(links[2]); //goto the shop page

    let articles = getAllByRole("article");
    expect(articles.length).toBe(2);

    for (let i = 0; i < articles.length; i++) {
      let buttons = within(articles[i]).getAllByRole("button");
      expect(buttons.length).toBe(3);
      const input = within(articles[i]).getByRole("spinbutton");
      await user.type(input, "3");
      expect(buttons[2].textContent).toBe("Add to Cart");

      await user.click(buttons[2]); //attempt to add to the cart
      const dialog = screen.getByTestId("modal");
      expect(dialog.open).toBe(true);

      buttons = within(dialog).getAllByRole("button");
      expect(buttons.length).toBe(2);
      expect(buttons[1].textContent).toBe("Continue Shopping");

      const amount = within(dialog).getByText(`Amount: 3`);
      await user.click(buttons[1]);
    }

    await user.click(links[3]); //go to the cart page

    const cartArticles = getAllByRole("article");

    //target the 2nd product for this testing
    const buttons = within(cartArticles[1]).getAllByRole("button");
    expect(buttons.length).toBe(3);
    expect(buttons[1].ariaLabel).toBe("subtract 1");
    expect(buttons[0].ariaLabel).toBe("add 1");

    const shortStockMsg = within(cartArticles[1]).getByTestId("shortStockMsg");
    expect("hidden").toBeOneOf(Object.values(shortStockMsg.classList));
    await user.click(buttons[0]); //try to add 1 to the input to go above the max stock available
    let input = within(cartArticles[1]).getByRole("spinbutton");
    expect(input.value).toBe("3");

    const regex = /Only (?<number>\d+) available/i;
    expect("invalid-amt").toBeOneOf(Object.values(shortStockMsg.classList));

    await user.click(buttons[1]); //try to subtract 1 from the input value
    expect(input.value).toBe(`2`);
    expect("hidden").toBeOneOf(Object.values(shortStockMsg.classList));
    //also the total amount of items in the cart should now be 5 (as we subtracted one)

    const checkout = getByTestId("checkout");
    const cartSummary = within(checkout).getByRole("paragraph");
    expect(cartSummary.textContent).toBe(
      `Subtotal (5 items): $${products[0].price * 3 + products[1].price * 2}`
    );

    await user.click(buttons[1]); //try to subtract another 1 from the input value leaving 1 of this item
    expect(input.value).toBe("1");

    await user.click(buttons[0]); //try to add  1 from the input value leaving 1 of this item
    expect(input.value).toBe("2");

    expect(cartSummary.textContent).toBe(
      `Subtotal (5 items): $${products[0].price * 3 + products[1].price * 2}`
    );

    await user.click(buttons[1]); //try to subtract another 1 from the input value leaving 1 of this item

    //final subtraction should cause the entire product to be removed
    await user.click(buttons[1]); //try to subtract another 1 from the input value leaving none of this item

    articles = getAllByRole("article");
    expect(articles.length).toBe(1);

    expect(cartSummary.textContent).toBe(
      `Subtotal (3 items): $${products[0].price * 3}`
    );
  });
});
