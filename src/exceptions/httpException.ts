export class HttpException extends Error {
  public status: number;
  public message: string;
  public error: object | string | null;
  public success?: boolean;

  constructor(status: number, message: string, error: object | string | null) {
    super(message);
    this.success = false;
    this.status = status;
    this.message = message;
    this.error = error;
  }
}
