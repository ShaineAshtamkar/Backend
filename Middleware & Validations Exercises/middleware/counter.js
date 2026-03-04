let requestCount = 0
const LIMIT = 10;
const WINDOW = 60 * 1000;//max 10 requests per IP per minute ,60*10000 ms=60 secs

const map = new Map();

const counter = (req, res, next) => {
    requestCount++
    req.requestCount = requestCount
    next()
}

const rateLimit = (req, res, next) => {
    const ip = req.ip;
    const now = Date.now();

    if (!map.has(ip) || now > map.get(ip).reset) {
        map.set(ip, { count: 1, reset: now + WINDOW });
        return next();
    }

    const data = map.get(ip);//value of the key ip
    data.count++;

    if (data.count > LIMIT) {
        return res.fail(429, "Too many requests (wait 1 minute)");
    }

    next();
};

module.exports = { counter, rateLimit }