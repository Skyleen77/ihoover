import inquirer from 'inquirer';
import { Directions, iHoover } from './iHoover';

function validator(
  inputString: string,
  regex: RegExp,
  errorMessage: string,
): boolean | string {
  if (regex.test(inputString)) {
    return true;
  } else {
    return errorMessage;
  }
}

function validateGridSize(inputString: string): boolean | string {
  return validator(
    inputString,
    /^[1-9]\d* [1-9]\d*$/,
    'Veuillez entrer deux nombres supérieurs à 0 séparés par un espace.',
  );
}
function validateInitialPosition(inputString: string): boolean | string {
  return validator(
    inputString,
    /^[0-9]\d* [0-9]\d* [NESW]$/,
    'Veuillez entrer deux chiffres et une lettre entre N E S et W séparés par un espace.',
  );
}
function validateCommands(inputString: string): boolean | string {
  return validator(
    inputString,
    /^[DGA]*$/,
    'Veuillez saisir une séquence de lettres entre D G et A.',
  );
}

inquirer
  .prompt([
    {
      type: 'input',
      message:
        'Entrez la taille de la grille au format "x y" (par exemple 10 10) :',
      name: 'gridSize',
      validate: validateGridSize,
    },
    {
      type: 'input',
      message: `Entrez la position initiale et la direction de l'iHoover au format "direction x y" (par exemple 5 5 N) :`,
      name: 'initialPosition',
      validate: validateInitialPosition,
    },
    {
      type: 'input',
      message:
        "Entrez une séquence de commandes entre 'D', 'G' et 'A' (ex. DADADADAA) :",
      name: 'commands',
      validate: validateCommands,
    },
  ])
  .then((answers) => {
    const gridSize = answers.gridSize;
    const initialPosition = answers.initialPosition;
    const commands = answers.commands;

    const [maxX, maxY] = gridSize.split(' ').map(Number);

    const [x, y, direction] = initialPosition.split(' ');

    const hoover = new iHoover(Number(x), Number(y), direction as Directions);

    try {
      const result = hoover.executeCommands(maxX, maxY, commands);

      console.log(
        `Position finale: x=${result.x} y=${result.y} direction=${result.direction}`,
      );
    } catch (err: any) {
      console.error(err.message);
    }
  })
  .catch((err) => {
    console.error(err);
  });
