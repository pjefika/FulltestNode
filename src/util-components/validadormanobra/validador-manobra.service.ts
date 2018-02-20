import { Injectable } from '@angular/core';
import { SuperService } from '../../util/superservice/super.service';
import { UrlService } from '../../util/urlservice/url.service';

@Injectable()
export class ValidadorManobraService extends SuperService {

    constructor(private urlService: UrlService) {
        super();
    }


}