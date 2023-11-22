import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';

@Injectable()
export class DenythisMiddleware implements NestMiddleware {
  use(req: Request, res: any, next: () => void) {
    const denyThisHeader: string | undefined = req.header('deny-this');
    if (denyThisHeader && denyThisHeader == 'true') {
      throw new UnauthorizedException();
    }
    next();
  }
}
