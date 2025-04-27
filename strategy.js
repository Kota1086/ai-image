function decideTrade(rate) {
    let decision = 'HOLD';
    if (rate > 0.92) {
        decision = 'SELL';
    } else if (rate < 0.91) {
        decision = 'BUY';
    } else {
        // AI-like weighted decision
        decision = Math.random() > 0.5 ? 'BUY' : 'SELL';
    }
    return decision;
}

module.exports = { decideTrade };