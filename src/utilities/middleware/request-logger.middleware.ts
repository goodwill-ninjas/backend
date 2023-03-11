import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request } from 'express';

@Injectable()
export class RequestLogger implements NestMiddleware {
  use(req: Request, _res: Response, next: NextFunction): void {
    Logger.log('', '----- Request START -----');
    Logger.log(`Method: ${req.method}`, 'Request');
    Logger.log(`Path: ${req.path}`, 'Request');
    // Logger.log(`Headers:\n${JSON.stringify(req.headers, null, 2)}`, 'Request'); // Uncomment for all headers instead of just cookies.
    this.prettyCookiesLog(req.headers.cookie);
    Logger.log(`Body:\n${JSON.stringify(req.body, null, 2)}`, 'Request');
    Logger.log('', '----- Request END -----');

    next();
  }

  /*
   * If cookies are defined logs the string in a more readable format.
   * "foo=abc; bar=xyz"
   *      =>
   * 1. foo=abc
   * 2. bar=xyz
   */
  prettyCookiesLog(cookies: string | undefined): void {
    if (!cookies) {
      Logger.log('No cookies found', 'Request');
      return;
    }

    Logger.log('Cookies: ', 'Request');
    cookies
      .split(';')
      .forEach((cookie, n) =>
        Logger.log(
          `${n + 1}: ${cookie.replace(/(.;)/g, '').trim()}`,
          'Request',
        ),
      );
  }
}
