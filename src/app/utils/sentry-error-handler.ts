import { ErrorHandler, Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import * as Sentry from '@sentry/browser';

Sentry.init({
  dsn: environment.sentry.url,
  environment: environment.name
});

@Injectable()
export class SentryErrorHandler implements ErrorHandler {
  handleError(error) {
    Sentry.captureException(error.originalError || error);
  }
}
