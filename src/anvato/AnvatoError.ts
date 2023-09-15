export class AnvatoError extends Error {
  /**
   * Detailed error message.
   */
  errorDetails: string;

  /**
   * Error result code, e.g. 400.
   */
  errorCode?: number;

  /**
   * Error status, e.g. "INVALID_ARGUMENT"
   */
  errorStatus?: string;

  /**
   * Url from which the error originates.
   */
  url?: string;

  constructor(message: string, errorDetails: string, url?: string, errorCode?: number, errorStatus?: string) {
    super(message);
    this.url = url;
    this.errorDetails = errorDetails;
    this.errorCode = errorCode;
    this.errorStatus = errorStatus;
  }

  get name(): string {
    return 'AnvatoError';
  }
}
