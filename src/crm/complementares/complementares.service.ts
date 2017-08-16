import { UrlService } from './../../util/url-service/url.service';
import { Http } from '@angular/http';
import { Injectable } from '@angular/core';

@Injectable()
export class ComplementaresService {

    constructor(
        private urlService: UrlService) { }

    private handleError(error: any): Promise<any> {
        return Promise.reject(error);
    }
}