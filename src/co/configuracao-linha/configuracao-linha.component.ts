import { HolderService } from './../../util/holder/holder.service';
import { Component, OnInit } from '@angular/core';
import { CallAlertService } from 'util/callalerts/call-alert.service';
import { ToastyComponent } from 'util/toasty/toasty.component';

@Component({
    selector: 'configuracao-linha-component',
    templateUrl: 'configuracao-linha.component.html',
    styleUrls: ['configuracao-linha.component.css'],
})

export class ConfiguracaoLinhaComponent extends CallAlertService implements OnInit {

    constructor(
        public holderService: HolderService,
        public toastyComponent: ToastyComponent) {
        super(toastyComponent);
    }

    public ngOnInit() {
        if (!this.holderService.cadastro.linha.tipo) {
            this.notimplemented();
        }
        // this.holderService.resumoInfosAtivo = true;
        this.holderService.btnResumoInfosAtivo = true;
    }

    public notimplemented() {
        super.callAlert(true, "alert-warning", "Funcionalidade indisponivel para este tipo de Central.");
    }

}