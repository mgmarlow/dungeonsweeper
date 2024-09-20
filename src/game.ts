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

export class Point {
  constructor(
    public index: number,
    public col: number,
  ) {}

  add(other: Point): Point {
    return new Point(this.index + other.index, this.col + other.col);
  }

  serialize(): string {
    return `${this.index}:${this.col}`;
  }
}

const moveArea = (origin: Point): Record<string, boolean> => {
  const dirs = [
    [0, 1],
    [0, 2],
    [1, 0],
    [2, 0],
    [0, -1],
    [0, -2],
    [-1, 0],
    [-2, 0],
  ];

  return dirs
    .flatMap(([index, col]) => {
      const result = new Point(index, col).add(origin);

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
    })
    .reduce(
      (acc, cur) => {
        acc[cur.serialize()] = true;
        return acc;
      },
      {} as Record<string, boolean>,
    );
};

class Game {
  level: Level;
  isAbilityQueued: boolean = false;
  availableMoves: Record<string, boolean> = {};

  constructor(private render: () => void) {
    this.level = createLevel(levelOne);
  }

  get tiles(): Tile[][] {
    return this.level.tiles;
  }

  // TODO: This is kinda lame. Probably should just track the player position separately.
  get player(): Point {
    for (let i = 0; i < this.level.tiles.length; i++) {
      const row = this.level.tiles[i];
      for (let col = 0; col < row.length; col++) {
        const token = row[col];
        if (token === "p") {
          return new Point(i, col);
        }
      }
    }

    throw new Error("no player found in level tiles");
  }

  cancel() {
    this.availableMoves = {};
    this.isAbilityQueued = false;
    this.render();
  }

  isMoveable(pt: Point): boolean {
    return !!this.availableMoves[pt.serialize()];
  }

  // Render the positional affect of an ability on the screen, before
  // the player actually uses it.
  showAbility(/* ability: Ability, maybe */) {
    this.availableMoves = moveArea(this.player);
    this.isAbilityQueued = true;
    this.render();
  }

  commitMove() {}
}

export default Game;
