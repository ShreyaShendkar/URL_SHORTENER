const WINDOW_MS = 15 * 60 * 1000; // 15 minutes
const MAX_REQUESTS = 60;
const requestMap = new Map();

function rateLimiter(req, res, next) {
  const ip = req.ip || req.headers['x-forwarded-for'] || req.socket.remoteAddress;
  if (!ip) return next();

  const now = Date.now();
  const windowStart = now - WINDOW_MS;
  const timestamps = requestMap.get(ip) || [];
  const recent = timestamps.filter((time) => time > windowStart);

  if (recent.length >= MAX_REQUESTS) {
    return res.status(429).json({ error: 'Too many requests. Please try again later.' });
  }

  recent.push(now);
  requestMap.set(ip, recent);
  next();
}

export default rateLimiter;
