import { h } from "snabbdom";
import Game, { type Tile } from "./game";
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

const Board = (tiles: Tile[][]) => {
  const content = tiles.map((row) => {
    const rowContent = row.map((token: Tile) => {
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

      return h(
        "div.square",
        {
          style: {
            backgroundColor: "#b58863",
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
    [h("button", "move"), h("button", "attack")],
  );
};

export const view = (game: Game) => {
  return h(
    "div.container",
    { style: { display: "flex", justifyContent: "center" } },
    [Board(game.tiles), Sidebar(game)],
  );
};
