import { h } from "snabbdom";
import Game, { Point, type Tile } from "./game";
import player from "./img/player.png";
import ghost from "./img/ghost.png";
import wall from "./img/wall.png";

const TILE_SIZE = 64;

const tileSrc = (token: string): string | undefined => {
  switch (token) {
    case "p":
      return player;
    case "g":
      return ghost;
    case "w":
      return wall;
  }
};

const Board = (game: Game) => {
  const content = game.tiles.map((row, i) => {
    const rowContent = row.map((token: Tile, col) => {
      const point = new Point(i, col);
      const tileContent = [];
      const src = tileSrc(token);

      if (src) {
        tileContent.push(
          h("img", {
            attrs: { src },
            style: {
              imageRendering: "pixelated",
              width: "100%",
              height: "100%",
            },
          }),
        );
      }

      const bg = game.isMoveable(point) ? "#819669" : "#b58863";

      return h(
        "div.square",
        {
          style: {
            backgroundColor: bg,
            display: "inline-block",
            width: `${TILE_SIZE}px`,
            height: `${TILE_SIZE}px`,
          },
        },
        tileContent,
      );
    });

    return h("div.rank", { style: { display: "flex" } }, rowContent);
  });

  return h("div.board", content);
};

const Sidebar = (game: Game) => {
  const content = [
    h("button", { on: { click: () => game.showAbility() } }, "move"),
    h("button", "attack"),
  ];

  if (game.isAbilityQueued) {
    content.push(h("button", { on: { click: () => game.cancel() } }, "cancel"));
  }

  return h(
    "div.sidebar",
    {
      style: {
        padding: "1rem",
        backgroundColor: "#161512",
        display: "flex",
        flexDirection: "column",
      },
    },
    content,
  );
};

export const view = (game: Game) => {
  return h(
    "div.container",
    { style: { display: "flex", justifyContent: "center" } },
    [Board(game), Sidebar(game)],
  );
};
