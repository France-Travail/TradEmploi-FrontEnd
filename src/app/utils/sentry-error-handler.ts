import { ErrorHandler, Injectable } from '@angular/core';
import * as Sentry from '@sentry/browser';
import { environment } from '../../environments/environment';

Sentry.init({
  dsn: environment.sentry.url,
  environment: environment.name
});

@Injectable()
export class SentryErrorHandler implements ErrorHandler {
  handleError(error) {
    if (environment.name === 'production') {
      Sentry.captureException(error.originalError || error);
    }
  }
}
