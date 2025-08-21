export function parseBounds(bounds) {
  const match = /\[(\d+),(\d+)\]\[(\d+),(\d+)\]/.exec(bounds);
  if (!match) return { x1: 0, y1: 0, x2: 0, y2: 0, width: 0, height: 0 };
  const x1 = parseInt(match[1], 10);
  const y1 = parseInt(match[2], 10);
  const x2 = parseInt(match[3], 10);
  const y2 = parseInt(match[4], 10);
  return { x1, y1, x2, y2, width: x2 - x1, height: y2 - y1 };
}

export function isGenericId(id) {
  return /^(btn|button|text|label)\d+$/i.test(id);
}

export function chunk(items, fn, done, chunkSize = 50) {
  let index = 0;
  function work(deadline) {
    while (index < items.length && (deadline ? deadline.timeRemaining() > 0 : true)) {
      fn(items[index], index);
      index++;
      if (chunkSize && index % chunkSize === 0) break;
    }
    if (index < items.length) {
      if ('requestIdleCallback' in window) {
        requestIdleCallback(work);
      } else {
        setTimeout(work, 0);
      }
    } else if (done) {
      done();
    }
  }
  if ('requestIdleCallback' in window) {
    requestIdleCallback(work);
  } else {
    setTimeout(work, 0);
  }
}
