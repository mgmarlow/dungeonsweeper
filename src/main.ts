import {
  init,
  styleModule,
  propsModule,
  eventListenersModule,
  attributesModule,
  VNode,
} from "snabbdom";
import Game from "./game";
import { view } from "./view";

let vnode: VNode;

const patch = init([
  propsModule,
  eventListenersModule,
  styleModule,
  attributesModule,
]);

window.addEventListener("DOMContentLoaded", () => {
  const container = document.querySelector<HTMLDivElement>("#app")!;

  const game = new Game(render);

  function render() {
    vnode = patch(vnode, view(game));
  }

  // Initial render.
  vnode = patch(container, view(game));
});
