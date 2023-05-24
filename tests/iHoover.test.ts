import { iHoover, Directions } from '../src/iHoover';

test('executeCommands moves the iHoover correctly', () => {
  const hoover = new iHoover(5, 5, Directions.NORTH);
  const result = hoover.executeCommands(10, 10, 'DADADADAA');

  expect(result.x).toBe(5);
  expect(result.y).toBe(6);
  expect(result.direction).toBe(Directions.NORTH);
});

test('iHoover throws an error when moving out of grid bounds', () => {
  const hoover = new iHoover(0, 0, Directions.SOUTH);
  expect(() => hoover.executeCommands(10, 10, 'A')).toThrow(
    "Le déplacement hors des limites de la grille n'est pas autorisé.",
  );
});

test('iHoover throws an error when spawning out of grid bounds', () => {
  const hoover = new iHoover(15, 15, Directions.SOUTH);
  expect(() => hoover.executeCommands(10, 10, 'D')).toThrow(
    'X et Y doivent être supérieurs à la position actuelle.',
  );
});
