import { LinhaComponent } from './tdm/actions/linha/linha.component';
import { LinhaResetDePortaService } from './tdm/general-services/linha-reset-de-porta.service';
import { ServicoLinhaService } from './tdm/actions/servico/servico-linha.service';
import { NcosService } from './tdm/actions/ncos/ncos.service';
import { HolderCompsService } from './../../util/component-holder/services/holder-comps.service';
import { CadastroLinha } from './../../viewmodel/cadastro-linha/cadastro-linha';
import { Linha } from './../../viewmodel/cadastro/linha';
import { BrancoComponent } from './../../branco/branco.component';
import { HolderService } from './../../util/holder/holder.service';
import { ToastyComponent } from './../../util/toasty/toasty.component';
import { ConfiguracaoLinhaService } from './configuracao-linha.service';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'configuracao-linha-component',
    templateUrl: 'configuracao-linha.component.html',
    styleUrls: ['configuracao-linha.component.css']
})

export class ConfiguracaoLinhaComponent implements OnInit {

    constructor(
        public holderService: HolderService) { }

    ngOnInit() {


    }

}