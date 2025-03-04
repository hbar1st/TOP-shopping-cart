# React + Vite + Vitest Shopping Cart project for The Odin Project
Live link https://top-shopping-cart-theta.vercel.app/home

This shopping cart SPA features inventory management in addition to the features required by The Odin Project shopping cart project description: https://www.theodinproject.com/lessons/node-path-react-new-shopping-cart

It use the FakeStoreAPI to generate 20 products for sale. It randomizes the amount of each product in stock and manages the remaining amounts as the user adds to cart or removes from cart (so long as the user doesn't refresh the page). 

Other features include:
- detecting when user types in an amount that is too large for available stock
- automatic add to cart of at least 1 quantity when button is pressed even if the user didn't specify the amount
- disabling Add to Cart button when out of stock or user types in a value larger than the available one
- display message indicating available stock value when user types in a too large number
- limit the incrementing of the input area in the Shop product cards to not go beyond the available stock
(while taking into account the amount already in the cart)
- 