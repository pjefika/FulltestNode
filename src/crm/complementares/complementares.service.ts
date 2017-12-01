import { UrlService } from './../../util/url-service/url.service';
import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { SuperService } from 'util/superservice/super.service';

@Injectable()
export class ComplementaresService extends SuperService {

    constructor() {
        super();
    }
}