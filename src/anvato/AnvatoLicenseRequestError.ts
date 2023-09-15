/**
 * Example:
 *
 * {
 *  "error": {
 *    "code": 400,
 *    "message": "Invalid query params: eqp expired\ndrmErrorCode: 1004\nreferenceId: 2785c18e2c5c7b9123152e4ec9dba558",
 *    "status": "INVALID_ARGUMENT"
 *  }
 * }
 *
 */
export interface AnvatoLicenseRequestError {
  error: {
    code: number;
    message: string;
    status: string;
  };
}
