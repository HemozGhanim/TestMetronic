import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
  HttpResponse,
  HttpStatusCode,
} from '@angular/common/http';
import { catchError, map, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  // GET request
  get<T>(apiUrl: string, endpoint: string): Observable<T> {
    return this.http
      .get<T>(`${apiUrl}/${endpoint}`, { observe: 'response' })
      .pipe(
        map((response) => this.handleResponse<T>(response)),
        catchError((error) => this.handleError(error))
      );
  }

  // POST request
  post<T>(apiUrl: string, endpoint: string, data: any): Observable<T> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http
      .post<T>(`${apiUrl}/${endpoint}`, data, {
        headers,
        observe: 'response',
      })
      .pipe(
        map((response) => this.handleResponse<T>(response)),
        catchError((error) => this.handleError(error))
      );
  }

  // PUT request
  put<T>(apiUrl: string, endpoint: string, data: any): Observable<T> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http
      .put<T>(`${apiUrl}/${endpoint}`, data, { headers, observe: 'response' })
      .pipe(
        map((response) => this.handleResponse<T>(response)),
        catchError((error) => this.handleError(error))
      );
  }

  // DELETE request
  delete<T>(apiUrl: string, endpoint: string): Observable<T> {
    return this.http
      .delete<T>(`${apiUrl}/${endpoint}`, { observe: 'response' })
      .pipe(
        map((response) => this.handleResponse<T>(response)),
        catchError((error) => this.handleError(error))
      );
  }
  // Handle the response based on the status code
  private handleResponse<T>(response: HttpResponse<T>): T {
    const { status, body } = response;
    if (status >= 100 && status < 200) {
      this.informationalResponses(status);
    } else if (status >= 200 && status < 300) {
      this.successResponses(status);
    } else if (status >= 300 && status < 400) {
      this.redirectionResponses(status);
    } else if (status >= 400 && status < 500) {
      this.clientErrorResponses(status);
    } else if (status >= 500) {
      this.serverErrorResponses(status);
    }
    return body as T;
  }

  // Handle errors based on status code
  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'An unknown error occurred!';
    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side error
      const status = error.status;
      if (status >= 400 && status < 500) {
        errorMessage = this.clientErrorResponses(status);
      } else if (status >= 500) {
        errorMessage = this.serverErrorResponses(status);
      }
    }
    return throwError(() => new Error(errorMessage));
  }

  // Informational responses (1xx)
  private informationalResponses(status: number): string {
    switch (status) {
      case HttpStatusCode.Continue:
        return 'Continue';
      case HttpStatusCode.SwitchingProtocols:
        return 'Switching Protocols';
      case 102:
        return 'Processing';
      case 103:
        return 'Early Hints';
      default:
        return `Unassigned informational response: ${status}`;
    }
  }

  // Success responses (2xx)
  private successResponses(status: number): string {
    switch (status) {
      case HttpStatusCode.Ok:
        return 'OK';
      case HttpStatusCode.Created:
        return 'Created';
      case HttpStatusCode.Accepted:
        return 'Accepted';
      case HttpStatusCode.NonAuthoritativeInformation:
        return 'Non-Authoritative Information';
      case HttpStatusCode.NoContent:
        return 'No Content';
      case HttpStatusCode.ResetContent:
        return 'Reset Content';
      case HttpStatusCode.PartialContent:
        return 'Partial Content';
      case 207:
        return 'Multi-Status';
      case 208:
        return 'Already Reported';
      case 226:
        return 'IM Used';
      default:
        return `Unassigned success response: ${status}`;
    }
  }

  // Redirection responses (3xx)
  private redirectionResponses(status: number): string {
    switch (status) {
      case HttpStatusCode.MultipleChoices:
        return 'Multiple Choices';
      case HttpStatusCode.MovedPermanently:
        return 'Moved Permanently';
      case HttpStatusCode.Found:
        return 'Found';
      case HttpStatusCode.SeeOther:
        return 'See Other';
      case HttpStatusCode.NotModified:
        return 'Not Modified';
      case 305:
        return 'Use Proxy';
      case HttpStatusCode.TemporaryRedirect:
        return 'Temporary Redirect';
      case HttpStatusCode.PermanentRedirect:
        return 'Permanent Redirect';
      default:
        return `Unassigned redirection response: ${status}`;
    }
  }

  // Client error responses (4xx)
  private clientErrorResponses(status: number): string {
    switch (status) {
      case HttpStatusCode.BadRequest:
        return 'Bad Request';
      case HttpStatusCode.Unauthorized:
        return 'Unauthorized';
      case HttpStatusCode.PaymentRequired:
        return 'Payment Required';
      case HttpStatusCode.Forbidden:
        return 'Forbidden';
      case HttpStatusCode.NotFound:
        return 'Not Found';
      case HttpStatusCode.MethodNotAllowed:
        return 'Method Not Allowed';
      case HttpStatusCode.NotAcceptable:
        return 'Not Acceptable';
      case HttpStatusCode.ProxyAuthenticationRequired:
        return 'Proxy Authentication Required';
      case HttpStatusCode.RequestTimeout:
        return 'Request Timeout';
      case HttpStatusCode.Conflict:
        return 'Conflict';
      case HttpStatusCode.Gone:
        return 'Gone';
      case HttpStatusCode.LengthRequired:
        return 'Length Required';
      case HttpStatusCode.PreconditionFailed:
        return 'Precondition Failed';
      case 413:
        return 'Content Too Large';
      case HttpStatusCode.UriTooLong:
        return 'URI Too Long';
      case HttpStatusCode.UnsupportedMediaType:
        return 'Unsupported Media Type';
      case HttpStatusCode.RangeNotSatisfiable:
        return 'Range Not Satisfiable';
      case HttpStatusCode.ExpectationFailed:
        return 'Expectation Failed';
      case 421:
        return 'Misdirected Request';
      case 422:
        return 'Unprocessable Content';
      case 423:
        return 'Locked';
      case 424:
        return 'Failed Dependency';
      case 425:
        return 'Too Early';
      case HttpStatusCode.UpgradeRequired:
        return 'Upgrade Required';
      case 428:
        return 'Precondition Required';
      case 429:
        return 'Too Many Requests';
      case 431:
        return 'Request Header Fields Too Large';
      case 451:
        return 'Unavailable For Legal Reasons';
      default:
        return `Unassigned client error: ${status}`;
    }
  }

  // Server error responses (5xx)
  private serverErrorResponses(status: number): string {
    switch (status) {
      case HttpStatusCode.InternalServerError:
        return 'Internal Server Error';
      case HttpStatusCode.NotImplemented:
        return 'Not Implemented';
      case HttpStatusCode.BadGateway:
        return 'Bad Gateway';
      case HttpStatusCode.ServiceUnavailable:
        return 'Service Unavailable';
      case HttpStatusCode.GatewayTimeout:
        return 'Gateway Timeout';
      case HttpStatusCode.HttpVersionNotSupported:
        return 'HTTP Version Not Supported';
      case 506:
        return 'Variant Also Negotiates';
      case 507:
        return 'Insufficient Storage';
      case 508:
        return 'Loop Detected';
      case 510:
        return 'Not Extended (OBSOLETED)';
      case 511:
        return 'Network Authentication Required';
      default:
        return `Unassigned server error: ${status}`;
    }
  }
}
