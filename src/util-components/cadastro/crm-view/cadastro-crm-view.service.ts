import { Injectable } from '@angular/core';
import { SuperService } from '../../../util/superservice/super.service';
import { Http } from '@angular/http';
import { LinkService } from '../../../util/urlservice/link.service';

@Injectable()
export class CadastroCrmViewService extends SuperService {

    constructor(public http: Http) {
        super(http);
    }



}