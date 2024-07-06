import inquirer from "inquirer";
import chalk from "chalk";
console.log(chalk.blue("Welcome to the Number Guessing Game!"));

const playGame = async () => {
  const randomNum = Math.floor(Math.random() * 10) + 1;

  const { guess } = await inquirer.prompt([
    {
      type: "number",
      name: "guess",
      message: chalk.cyan(
        "I'm thinking of a number between 1 and 10. Guess what it is!"
      ),
      validate: (input) => {
        const num = parseInt(input);
        if (isNaN(num)) {
          return chalk.red("Please enter a valid number.");
        }
        if (num < 1 || num > 10) {
          return chalk.red("Please enter a number between 1 and 10.");
        }
        return true;
      },
    },
  ]);

  if (guess === randomNum) {
    console.log(chalk.green("Congratulations! You guessed correctly."));
  } else {
    console.log(
      chalk.red(
        `Sorry, you guessed ${guess}. The correct number was ${randomNum}.`
      )
    );
  }

  const { playAgain } = await inquirer.prompt([
    {
      type: "confirm",
      name: "playAgain",
      message: chalk.yellow("Do you want to play again?"),
      default: false,
    },
  ]);

  if (playAgain) {
    console.log(chalk.blue("sure, Let's play the game again!"));

    await playGame();
  } else {
    console.log(chalk.blue("Thank you for playing! Goodbye!"));
  }
};

playGame();
