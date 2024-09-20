class Game {
  constructor(
    private render: () => void,
    public count = 0,
  ) {}

  increment() {
    this.count++;
    this.render();
  }

  decrement() {
    this.count--;
    this.render();
  }
}

export default Game;
