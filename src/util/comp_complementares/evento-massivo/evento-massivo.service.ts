import { Injectable } from '@angular/core';
import { SuperService } from 'util/superservice/super.service';
import { UrlService } from 'util/url-service/url.service';

@Injectable()
export class EventoMAssivoService extends SuperService {

    constructor(private urlService: UrlService) {
        super();
    }

    
}