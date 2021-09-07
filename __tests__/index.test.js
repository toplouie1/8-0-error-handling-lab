const {
  getCartTotal,
  filterProductsByPriceRange,
  getTotalOfAllProductsByPriceRange,
} = require("../");

const products = [
  { id: 1, name: "Panel Headboard", priceInCents: 12332 },
  { id: 2, name: "Low Profile Sleigh Bed", priceInCents: 22999 },
  { id: 3, name: "Oval 100% Cotton Solid Bath Rug", priceInCents: 1399 },
  { id: 4, name: "Abstract Light Gray Area Rug", priceInCents: 33999 },
  { id: 5, name: "Multi Game Table", priceInCents: 81743 },
];

describe("getCartTotal()", () => {
  test("should add up the price of all items in the cart and return the total", () => {
    const actual = getCartTotal(products);
    const expected = 152472;
    expect(actual).toEqual(expected);
  });

  test("should throw an error if the cart is empty", () => {
    expect(() => getCartTotal([])).toThrow();
  });
});

describe("filterProductsByPriceRange()", () => {
  test("should return an array of all products that have a price within the price range (inclusive)", () => {
    const min = 10000;
    const max = 30000;
    const actual = filterProductsByPriceRange(products, min, max);
    const expected = [
      products[0], // Panel Headboard
      products[1], // Low Profile Sleigh Bed
    ];

    expect(actual).toEqual(expected);
  });

  test("should return an empty array if no items fit within the price range", () => {
    const min = 10000;
    const max = 11000;
    const actual = filterProductsByPriceRange(products, min, max);
    const expected = [];

    expect(actual).toEqual(expected);
  });

  test("should throw an error if any of the products is missing the `priceInCents` key", () => {
    expect(() =>
      filterProductsByPriceRange([
        ...products,
        { id: 6, name: "L-Shaped Desk" },
      ])
    ).toThrow();
  });

  test("should throw an error if the products array is empty", () => {
    expect(() => filterProductsByPriceRange([], 10000, 30000)).toThrow();
  });

  test("should throw an error if either the `min` or `max` value is not a number", () => {
    expect(() =>
      filterProductsByPriceRange(products, 10000, "30000")
    ).toThrow();
  });

  test("should throw an error if the `min` value is greater than the `max` value", () => {
    expect(() => filterProductsByPriceRange([], 30000, 10000)).toThrow();
  });

  test("should throw an error if either the `min` or `max` value is less than 0", () => {
    expect(() => filterProductsByPriceRange(products, -10000, 30000)).toThrow();
  });

  test("should throw an error if the `max` value is equal to 0", () => {
    expect(() => filterProductsByPriceRange(products, 0, 0)).toThrow();
  });
});

describe("getTotalOfAllProductsByPriceRange()", () => {
  test("should return the total of all products within the price range (inclusive)", () => {
    const min = 30000;
    const max = 100000;
    const actual = getTotalOfAllProductsByPriceRange(products, min, max);
    const expected = 115742;

    expect(actual).toEqual(expected);
  });

  test("should return 0 if no products fit within the price range", () => {
    const min = 100000;
    const max = 200000;
    const actual = getTotalOfAllProductsByPriceRange(products, min, max);
    const expected = 0;

    expect(actual).toEqual(expected);
  });

  test("should return 0 if any error occurs in the function", () => {
    // Nothing in the products array.
    expect(getTotalOfAllProductsByPriceRange([], 1000, 2000)).toEqual(0);

    // `priceInCents` key is missing from product
    expect(
      getTotalOfAllProductsByPriceRange(
        [...products, { id: 6, name: "L-Shaped Desk" }],
        1000,
        2000
      )
    ).toEqual(0);

    // `max` is less than `min`
    expect(getTotalOfAllProductsByPriceRange(products, 1000, 500)).toEqual(0);

    // `max` or `min` is not a number.
    expect(getTotalOfAllProductsByPriceRange(products, "100", 50000)).toEqual(
      0
    );

    // `max` or `min` is less than 0.
    expect(getTotalOfAllProductsByPriceRange(products, -500, 50000)).toEqual(0);

    // `max` is equal to 0.
    expect(getTotalOfAllProductsByPriceRange(products, 0, 0)).toEqual(0);
  });
});
