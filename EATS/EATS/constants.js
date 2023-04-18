
const ERROR_MESSAGE = {
  BAD_REQUEST: "Bad request",
  UNAUTHORIZED: "Unauthorized",
  FORBIDDEN: "Forbidden",
  NOT_FOUND: "Not found",
  METHOD_NOT_ALLOWED: "Method not allowed",
  CONFLICT: "Conflict",
  INTERNAL_SERVER_ERROR: "Internal server error",
  SERVICE_UNAVAILABLE: "Service unavailable",
};

const STATUS_CODE = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  METHOD_NOT_ALLOWED: 405,
  CONFLICT: 409,
  INTERNAL_SERVER_ERROR: 500,
  SERVICE_UNAVAILABLE: 503,
};
 

const log4js = require('log4js');
const logger = log4js.getLogger();

// Configure Log4js
log4js.configure({
  appenders: {
    console: { type: 'console' },
    file: { type: 'file', filename: 'logs/errors.log' }
  },
  categories: {
    default: { appenders: ['console', 'file'], level: 'error' }
  }
});

module.exports={ERROR_MESSAGE,STATUS_CODE,logger}