import { successResponse } from "../shared/infrastructure/http/responses/api-response.js";

import { getHealthStatus } from "./health.service.js";

export async function healthController(req, res, next) {
  try {
    const health = await getHealthStatus();

    const statusCode = health.status === "ok" ? 200 : 503;

    return successResponse({
      res,

      data: health,

      statusCode,
    });
  } catch (error) {
    next(error);
  }
}
