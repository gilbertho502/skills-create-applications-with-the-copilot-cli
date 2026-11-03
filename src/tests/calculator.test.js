const assert = require("node:assert/strict");
const { describe, it } = require("node:test");
const { calculate } = require("../calculator");

describe("calculate", () => {
  describe("addition", () => {
    it("adds the example values from the image", () => {
      assert.equal(calculate("+", 2, 3), 5);
    });

    it("supports the operation name and negative operands", () => {
      assert.equal(calculate("add", -2, 3), 1);
    });
  });

  describe("subtraction", () => {
    it("subtracts the example values from the image", () => {
      assert.equal(calculate("-", 10, 4), 6);
    });

    it("supports the operation name and negative results", () => {
      assert.equal(calculate("subtract", 4, 10), -6);
    });
  });

  describe("multiplication", () => {
    it("multiplies the example values from the image", () => {
      assert.equal(calculate("*", 45, 2), 90);
    });

    it("supports the operation name and negative operands", () => {
      assert.equal(calculate("multiply", -3, 4), -12);
    });
  });

  describe("division", () => {
    it("divides the example values from the image", () => {
      assert.equal(calculate("/", 20, 5), 4);
    });

    it("supports the operation name and decimal results", () => {
      assert.equal(calculate("divide", 5, 2), 2.5);
    });

    it("throws when dividing by zero", () => {
      assert.throws(() => calculate("/", 20, 0), {
        message: "Cannot divide by zero.",
      });
    });
  });

  it("rejects unsupported operations", () => {
    assert.throws(() => calculate("power", 2, 3), {
      message: "Unsupported operation: power",
    });
  });

  it("rejects non-finite operands", () => {
    assert.throws(() => calculate("+", Number.NaN, 1), {
      message: "Both operands must be finite numbers.",
    });
    assert.throws(() => calculate("-", 1, Number.POSITIVE_INFINITY), {
      message: "Both operands must be finite numbers.",
    });
  });
});
