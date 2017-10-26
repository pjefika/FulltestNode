import { UrlService } from './../../url-service/url.service';
import { Cadastro } from './../../../viewmodel/cadastro/cadastro';
import { Http, RequestOptions, Headers } from '@angular/http';
import { Injectable } from '@angular/core';

import 'rxjs/add/operator/toPromise';
import 'rxjs/Rx';

@Injectable()
export class ResetService {

    constructor(
        private urlService: UrlService) { }

    private handleError(error: any): Promise<any> {
        return Promise.reject(error);
    }

}