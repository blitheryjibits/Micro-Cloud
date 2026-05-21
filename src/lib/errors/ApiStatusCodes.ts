export const API_STATUS_CODES = {
  // --- 2xx Success ---
  200: 200, // OK — request succeeded
  201: 201, // Created — resource successfully created
  202: 202, // Accepted — request accepted for async processing
  203: 203, // Non-Authoritative Information — metadata modified by proxy
  204: 204, // No Content — success but no response body
  205: 205, // Reset Content — instructs client to reset form/view
  206: 206, // Partial Content — used for range/streaming responses

  // --- 3xx Redirection ---
  300: 300, // Multiple Choices — multiple possible responses
  301: 301, // Moved Permanently — resource moved to new URL
  302: 302, // Found — temporary redirect
  303: 303, // See Other — redirect using GET
  304: 304, // Not Modified — cached version is still valid
  307: 307, // Temporary Redirect — method must remain unchanged
  308: 308, // Permanent Redirect — method must remain unchanged

  // --- 4xx Client Errors ---
  400: 400, // Bad Request — invalid input or malformed request
  401: 401, // Unauthorized — authentication required
  402: 402, // Payment Required — reserved for future use
  403: 403, // Forbidden — authenticated but not allowed
  404: 404, // Not Found — resource does not exist
  405: 405, // Method Not Allowed — wrong HTTP method
  406: 406, // Not Acceptable — cannot return acceptable format
  407: 407, // Proxy Authentication Required
  408: 408, // Request Timeout — client took too long
  409: 409, // Conflict — resource conflict (e.g., duplicate)
  410: 410, // Gone — resource permanently removed
  411: 411, // Length Required — missing Content-Length
  412: 412, // Precondition Failed — conditional headers failed
  413: 413, // Payload Too Large — request body too big
  414: 414, // URI Too Long — URL too long
  415: 415, // Unsupported Media Type — invalid Content-Type
  416: 416, // Range Not Satisfiable — invalid range header
  417: 417, // Expectation Failed — Expect header not met
  418: 418, // I'm a teapot — fun Easter egg (RFC 2324)
  422: 422, // Unprocessable Entity — validation failed
  425: 425, // Too Early — server unwilling to process
  426: 426, // Upgrade Required — client must upgrade protocol
  428: 428, // Precondition Required — missing conditional headers
  429: 429, // Too Many Requests — rate limited
  431: 431, // Request Header Fields Too Large
  451: 451, // Unavailable For Legal Reasons

  // --- 5xx Server Errors ---
  500: 500, // Internal Server Error — unexpected failure
  501: 501, // Not Implemented — endpoint not implemented
  502: 502, // Bad Gateway — upstream server error
  503: 503, // Service Unavailable — server overloaded or down
  504: 504, // Gateway Timeout — upstream timeout
  505: 505, // HTTP Version Not Supported
  507: 507, // Insufficient Storage — server cannot store data
  511: 511, // Network Authentication Required
} as const;

export type StatusCodes = keyof typeof API_STATUS_CODES;
