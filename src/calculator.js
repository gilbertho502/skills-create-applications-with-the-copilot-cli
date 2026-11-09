// Supported operations: arithmetic operations and square root.
function modulo(a, b) {
  if (!Number.isFinite(a) || !Number.isFinite(b)) {
    throw new Error("Both operands must be finite numbers.");
  }
  if (b === 0) {
    throw new Error("Cannot take modulo by zero.");
  }
  return a % b;
}

function power(base, exponent) {
  if (!Number.isFinite(base) || !Number.isFinite(exponent)) {
    throw new Error("Both operands must be finite numbers.");
  }
  return base ** exponent;
}

function squareRoot(n) {
  if (!Number.isFinite(n)) {
    throw new Error("The operand must be a finite number.");
  }
  if (n < 0) {
    throw new Error("Cannot calculate the square root of a negative number.");
  }
  return Math.sqrt(n);
}

function calculate(operation, left, right) {
  if (operation === "sqrt" || operation === "squareRoot") {
    return squareRoot(left);
  }
  if (!Number.isFinite(left) || !Number.isFinite(right)) {
    throw new Error("Both operands must be finite numbers.");
  }

  switch (operation) {
    case "add":
    case "+":
      return left + right;
    case "subtract":
    case "-":
      return left - right;
    case "multiply":
    case "*":
      return left * right;
    case "divide":
    case "/":
      if (right === 0) {
        throw new Error("Cannot divide by zero.");
      }
      return left / right;
    case "modulo":
    case "%":
      return modulo(left, right);
    case "power":
    case "^":
      return power(left, right);
    default:
      throw new Error(`Unsupported operation: ${operation}`);
  }
}

function run(argv) {
  const [operation, leftArgument, rightArgument, ...extraArguments] = argv;
  const isSquareRoot = operation === "sqrt" || operation === "squareRoot";
  const left = Number(leftArgument);
  const right = Number(rightArgument);

  if (
    !operation ||
    leftArgument === undefined ||
    leftArgument.trim() === "" ||
    (isSquareRoot
      ? rightArgument !== undefined || extraArguments.length > 0
      : rightArgument === undefined ||
        rightArgument.trim() === "" ||
        extraArguments.length > 0) ||
    !Number.isFinite(left) ||
    (!isSquareRoot && !Number.isFinite(right))
  ) {
    throw new Error(
      "Usage: node src/calculator.js <add|subtract|multiply|divide|modulo|power|sqrt|+|-|*|/|%|^> <number> [number]",
    );
  }

  console.log(calculate(operation, left, right));
}

if (require.main === module) {
  try {
    run(process.argv.slice(2));
  } catch (error) {
    console.error(error.message);
    process.exitCode = 1;
  }
}

module.exports = { calculate, modulo, power, squareRoot };
