import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CallAlertService } from 'util/callalerts/call-alert.service';
import { ToastyComponent } from 'util/toasty/toasty.component';
import { Analitico } from 'viewmodel/manobra/analitico';
import { HolderService } from 'util/holder/holder.service';

@Component({
    selector: 'table-validacoes-component',
    templateUrl: 'table-validacoes.component.html',
    styleUrls: ['table-validacoes.component.css']
})

export class TableValidacoesComponent extends CallAlertService implements OnInit, OnChanges {

    @Input() public analitico: Analitico;

    constructor(public toastyComponent: ToastyComponent, private holderService: HolderService) {
        super(toastyComponent);
    }

    public ngOnInit() { }

    public ngOnChanges(changes: SimpleChanges) {
        //console.log(changes.analitico);
        if (changes.analitico.currentValue) {
            this.mountAlert();
        }
    }

    public mountAlert() {
        this.holderService.cadastro.asserts.forEach(element => {
            if (element.asserts === "REDE_CONFIAVEL" && this.analitico.manobrar && this.analitico.conclusao.motivo.motivo != "Trocar Modem") {
                let msg: string;
                let type: string;
                if (element.value) {
                    msg = "Rede confiável.";
                    type = "alert-info";
                } else {
                    msg = "Rede não confiável, necessária revisão.";
                    type = "alert-warning";
                }
                super.callAlert(true, type, msg);
            }
        });
    }

}