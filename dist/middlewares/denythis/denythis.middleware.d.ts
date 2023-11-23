import { NestMiddleware } from '@nestjs/common';
import { Request } from 'express';
export declare class DenythisMiddleware implements NestMiddleware {
    use(req: Request, res: any, next: () => void): void;
}
