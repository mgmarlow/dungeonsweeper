# Simple game template

Because sometimes you don't need HTML5 canvas.

This template is inspired by 
[Lichess](https://github.com/lichess-org/lila/tree/master), using
the tiny virtual DOM library [snabbdom](https://github.com/snabbdom/snabbdom)
to drive a game that manually controls rendering behavior with the DOM.
For the types of games that I build (turn-based puzzle/tactical games),
it's a great fit. The HTML5 canvas is overkill for games that can get
by just using the plain ol' DOM.

## Get started

Click "Use this template" in the upper-right corner of the repository page.

1. Install dependencies:

```
yarn install
```

2. Run the development server:

```
yarn dev
```

You can also use `yarn lint` and `yarn typecheck` to check your source
files with Prettier and TypeScript, respectively.

## Publishing

When it comes time to publish your game, run `yarn build` and upload the
contents of the `dist/` folder to your static file host of choice.
