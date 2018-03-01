import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Analitico } from '../../../viewmodel/manobrar/analitico';
import { SuperComponentService } from '../../../util/supercomponent/supercomponent.service';
import { ToastyComponent } from '../../toasty/toasty.component';
import { SystemHolderService } from '../../../util/holder/systemHolder.service';
import { VariavelHolderService } from '../../../util/holder/variavelholder.service';

@Component({
    selector: 'validacoes-manobra-table-component',
    templateUrl: 'validacoes-manobra-table.component.html',
    styleUrls: ['validacoes-manobra-table.component.css']
})

export class ValidacoesManobraTableComponent extends SuperComponentService implements OnInit, OnChanges {

    @Input() public analitico: Analitico;

    constructor(public toastyComponent: ToastyComponent,
        public systemHolderService: SystemHolderService,
        public variavelHolderService: VariavelHolderService) {
        super(toastyComponent, systemHolderService);
    }

    public ngOnInit() { }

    public ngOnChanges(changes: SimpleChanges) {
        if (changes.analitico.currentValue) {
            this.mountAlert();
        }
    }

    public mountAlert() {
        this.variavelHolderService.cadastro.asserts.forEach(element => {
            if (element.asserts === "REDE_CONFIAVEL" && this.analitico.manobrar && this.analitico.conclusao.motivo.motivo != "Trocar Modem") {
                let msg: string;
                let type: string;
                if (element.value) {
                    msg = "Rede confiável.";
                    type = "info";
                } else {
                    msg = "Rede não confiável, necessária revisão.";
                    type = "warning";
                }
                super.callAlert(type, msg);
            }
        });
    }

}