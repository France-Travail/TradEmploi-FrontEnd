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
    if (environment.name !== 'local') {
      Sentry.captureException(error.originalError || error);
    }
  }
}
