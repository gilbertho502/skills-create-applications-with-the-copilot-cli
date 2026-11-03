// Supported operations: addition (+), subtraction (-), multiplication (*), and division (/).
function calculate(operation, left, right) {
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
    default:
      throw new Error(`Unsupported operation: ${operation}`);
  }
}

function run(argv) {
  const [operation, leftArgument, rightArgument, ...extraArguments] = argv;
  const left = Number(leftArgument);
  const right = Number(rightArgument);

  if (
    !operation ||
    leftArgument === undefined ||
    rightArgument === undefined ||
    leftArgument.trim() === "" ||
    rightArgument.trim() === "" ||
    extraArguments.length > 0 ||
    !Number.isFinite(left) ||
    !Number.isFinite(right)
  ) {
    throw new Error(
      "Usage: node src/calculator.js <add|subtract|multiply|divide|+|-|*|/> <number> <number>",
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

module.exports = { calculate };
