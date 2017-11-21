import { UrlService } from './../../url-service/url.service';
import { Cadastro } from './../../../viewmodel/cadastro/cadastro';
import { RequestOptions, Headers, Http } from '@angular/http';
import { Injectable } from '@angular/core';

import 'rxjs/add/operator/toPromise';
import 'rxjs/Rx';
import { SuperService } from 'util/superservice/super.service';
import { InfoRequest } from 'viewmodel/url/infos-url';

@Injectable()
export class AssocontService extends SuperService {

    private infoResquest: InfoRequest;

    constructor(
        private urlService: UrlService) {
        super();
    }
}