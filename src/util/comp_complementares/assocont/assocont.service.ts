import { UrlService } from './../../url-service/url.service';
import { Cadastro } from './../../../viewmodel/cadastro/cadastro';
import { RequestOptions, Headers, Http } from '@angular/http';
import { Injectable } from '@angular/core';

import 'rxjs/add/operator/toPromise';
import 'rxjs/Rx';

@Injectable()
export class AssocontService {

    constructor(
        private urlService: UrlService) { }

    private handleError(error: any): Promise<any> {
        return Promise.reject(error);
    }
}