import { Injectable } from '@angular/core';
import {
    HttpEvent, 
    HttpInterceptor, 
    HttpHandler, 
    HttpRequest
} from '@angular/common/http';

import { Observable } from 'rxjs';

/** 
 * Pass untouched request through to the next request handler. 
 **/
@Injectable()
export class ServerInterceptor implements HttpInterceptor 
{

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> 
    {
        const auxReq = req.clone({
            url : `http://localhost:3000${req.url}`
        })


        return next.handle(auxReq);
    }
}