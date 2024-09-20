const levelOne = [
  "p......",
  ".......",
  "g......",
  "www....",
  "g.w....",
  ".......",
  "..w....",
];

// TEMP
const PLAYER = "p";
const WALL = "w";
const EMPTY = ".";
const GHOST = "g";

export type Tile = typeof PLAYER | typeof EMPTY | typeof WALL | typeof GHOST;

// TODO: Eventually might want to move the player to its own index
// or its own layer, since the player can perhaps overlap with certain
// tiles (e.g. items).
export interface Level {
  width: number;
  height: number;
  tiles: Tile[][];
}

export const createLevel = (raw: string[]): Level => {
  let height = raw.length;
  // Assumed square levels.
  let width = raw[0].length;

  const tiles: Tile[][] = raw.reduce((acc, cur) => {
    const row: Tile[] = [];
    for (let i = 0; i < cur.length; i++) {
      const token = cur[i];
      // TODO: validate token.
      row.push(token as Tile);
    }

    acc.push(row);

    return acc;
  }, [] as Tile[][]);

  return {
    width,
    height,
    tiles,
  };
};

class Point {
  constructor(
    public col: number,
    public index: number,
  ) {}

  add(other: Point): Point {
    return new Point(this.col + other.col, this.index + other.index);
  }
}

const move = (origin: Point): Point[] => {
  const dirs = [
    { col: 0, index: 1 },
    { col: 0, index: 2 },
    { col: 1, index: 0 },
    { col: 2, index: 0 },
    { col: 0, index: -1 },
    { col: 0, index: -2 },
    { col: -1, index: 0 },
    { col: -2, index: 0 },
  ];

  return dirs.flatMap((dir) => {
    const result = new Point(dir.col, dir.index).add(origin);

    // TODO: Need to check level width/height as well.
    if (
      result.col >= 0 &&
      result.col <= 7 &&
      result.index <= 7 &&
      result.index >= 0
    ) {
      return result;
    } else {
      // Lazy filterMap.
      return [];
    }
  });
};

class Game {
  level: Level;

  constructor(private render: () => void) {
    this.level = createLevel(levelOne);
  }

  get tiles(): Tile[][] {
    return this.level.tiles;
  }
}

export default Game;
