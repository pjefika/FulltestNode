import { UrlService } from './../../url-service/url.service';
import { Cadastro } from './../../../viewmodel/cadastro/cadastro';
import { RequestOptions, Headers, Http } from '@angular/http';
import { Injectable } from '@angular/core';

import 'rxjs/add/operator/toPromise';
import 'rxjs/Rx';
import { SuperService } from 'util/superservice/super.service';

@Injectable()
export class AssocontService extends SuperService {

    constructor() {
        super();
    }
}