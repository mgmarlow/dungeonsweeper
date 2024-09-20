import { h } from "snabbdom";
import Game from "./game";

export const view = (game: Game) => {
  return h("div", [
    h("p", `count: ${game.count}`),
    h("button", { on: { click: () => game.increment() } }, "+"),
    h("button", { on: { click: () => game.decrement() } }, "-"),
  ]);
};
