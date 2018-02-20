import { Injectable } from '@angular/core';
import { SuperService } from '../../util/superservice/super.service';
import { UrlService } from '../../util/urlservice/url.service';
import { Linha } from '../../viewmodel/cadastro/linha';
import { CadastroLinha } from '../../viewmodel/linha/cadlinha';

@Injectable()
export class ConfiguracaoLinhaService extends SuperService {

    constructor(private urlService: UrlService) {
        super();
    }

}