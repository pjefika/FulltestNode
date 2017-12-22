import { Injectable } from '@angular/core';
import { SuperService } from 'util/superservice/super.service';
import { UrlService } from 'util/url-service/url.service';
import { Cadastro } from 'viewmodel/cadastro/cadastro';
import { ResultNormal } from 'viewmodel/confPorta/viewhold/resultNormal';
import { EstadoPorta } from 'viewmodel/confPorta/estadoPorta';

@Injectable()
export class GenericStackBlockService extends SuperService {

    constructor(private urlService: UrlService) {
        super();
    }

}