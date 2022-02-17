const ticker: Array<() => void> = [];
const tickerStart = () => {
  ticker.forEach((cb) => cb());
  window.requestAnimationFrame(tickerStart);
};

export function createTicker(cb: () => void) {
  ticker.push(cb);
  ticker.length === 1 && tickerStart();
}
