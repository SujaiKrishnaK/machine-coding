function rateLimiter(maxTokens, refillRate) {
  let tokens = maxTokens;
  let refilledAt = Date.now();

  const refill = () => {
    const now = Date.now();
    let elapsed = (now - refilledAt) / 1000;
    let tokensToAdd = Math.floor(elapsed * refillRate);

    if (tokensToAdd > 0) {
      tokens = Math.min(maxTokens, tokens + tokensToAdd);
      refilledAt = now;
    }
  };

  const allow = () => {
    refill();
    if (tokens > 0) {
      tokens -= 1;
      return true;
    }
    return false;
  };

  return {
    allow,
  };
}

const limiter = rateLimiter(2, 1);

const tryLimiter = () => {
  if (limiter.allow()) {
    console.log("allowed");
  } else {
    console.error("429 too many requests!");
  }
};
setTimeout(() => {
  tryLimiter();
}, 100);
setTimeout(() => {
  tryLimiter();
}, 100);
setTimeout(() => {
  tryLimiter();
}, 100);
setTimeout(() => {
  tryLimiter();
}, 100);
setTimeout(() => {
  tryLimiter();
}, 100);
