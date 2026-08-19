import { randomUUID } from "node:crypto";

export function requestIdMiddleware(req, res, next) {
  const incomingId = req.get("X-Request-ID");

  const requestId = incomingId || randomUUID();

  req.requestId = requestId;

  res.setHeader("X-Request-ID", requestId);

  next();
}
