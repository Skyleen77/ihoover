enum Directions {
  NORTH = 'N',
  EAST = 'E',
  SOUTH = 'S',
  WEST = 'W',
}

enum Commands {
  FORWARD = 'A',
  RIGHT = 'D',
  LEFT = 'G',
}

class iHoover {
  x: number;
  y: number;
  direction: Directions;

  constructor(x: number, y: number, direction: Directions) {
    this.x = x;
    this.y = y;
    this.direction = direction;
  }

  move(maxX: number, maxY: number) {
    const { futureX, futureY } = this.getFuturePosition();

    if (futureX < 0 || futureX >= maxX || futureY < 0 || futureY >= maxY) {
      throw new Error(
        "Le déplacement hors des limites de la grille n'est pas autorisé.",
      );
    }

    this.x = futureX;
    this.y = futureY;
  }

  getFuturePosition() {
    let futureX = this.x;
    let futureY = this.y;

    switch (this.direction) {
      case Directions.NORTH:
        futureY += 1;
        break;
      case Directions.EAST:
        futureX += 1;
        break;
      case Directions.SOUTH:
        futureY -= 1;
        break;
      case Directions.WEST:
        futureX -= 1;
        break;
    }

    return { futureX, futureY };
  }

  turn(direction: Commands) {
    const directions = [
      Directions.NORTH,
      Directions.EAST,
      Directions.SOUTH,
      Directions.WEST,
    ];
    let index = directions.indexOf(this.direction);

    if (direction === Commands.RIGHT) {
      index = (index + 1) % directions.length;
    } else if (direction === Commands.LEFT) {
      index = (index - 1 + directions.length) % directions.length;
    }

    this.direction = directions[index];
  }

  executeCommands(maxX: number, maxY: number, commands: string) {
    if (maxX <= this.x || maxY <= this.y) {
      throw new Error('X et Y doivent être supérieurs à la position actuelle.');
    }

    for (const command of commands) {
      switch (command) {
        case Commands.FORWARD:
          this.move(maxX, maxY);
          break;
        case Commands.LEFT:
        case Commands.RIGHT:
          this.turn(command as Commands);
          break;
      }
    }

    return { x: this.x, y: this.y, direction: this.direction };
  }
}

export { iHoover, Directions };
