import { ObjectValid } from './../../../viewmodel/fulltest/objectValid';
import { Component, OnInit, Input } from '@angular/core';
import { CallAlertService } from 'util/callalerts/call-alert.service';
import { ToastyComponent } from 'util/toasty/toasty.component';
import { Valids } from 'viewmodel/fulltest/validacao';
import { HolderService } from 'util/holder/holder.service';

@Component({
    selector: 'fulltest-table-component',
    templateUrl: 'fulltest-table.component.html',
    styleUrls: ['fulltest-table.component.css']
})
//So passar ObjectValid que ira montar a tabela com as validações Fulltest
export class FulltestTableComponent extends CallAlertService implements OnInit {

    @Input() public objectValid: ObjectValid;

    @Input() public msgAtivo?: boolean = true;

    constructor(public toastyComponent: ToastyComponent,
        private holderService: HolderService) {
        super(toastyComponent);
    }

    public ngOnInit() {
        super.callAlert(true, this.objectValid.resultado ? 'alert-success' : 'alert-danger', this.objectValid.mensagem);
    }

    public hasRowDetail(valid: Valids) {
        if (this.holderService.cadastro) {
            if ((valid.nome.includes("Porta")) ||
                (valid.mensagem.includes("Cliente sem")) ||
                (valid.nome == 'MAC do Equipamento' && (!valid.resultado || this.holderService.cadastro.rede.planta != 'VIVO2')) ||
                (valid.nome == 'Associação Serial ONT' && (valid.resultado || this.holderService.cadastro.rede.planta != 'VIVO2')) ||
                (valid.nome == 'Afetação Vizinhança')) {
                return false;
            }
            return true;
        }
    }

    public hasExclamationSign(valid: Valids) {
        if (this.holderService.cadastro) {
            if ((!valid.resultado && valid.foiCorrigido) ||
                (valid.resultado && valid.nome.includes('MAC') && this.holderService.cadastro.rede.planta == 'VIVO2') ||
                (valid.nome == 'Associação Serial ONT' && this.holderService.cadastro.rede.planta == 'VIVO2' && !valid.resultado)) {
                return true;
            }
            return false;
        }
    }

    public hasCheck(valid: Valids) {
        if (this.holderService.cadastro) {
            if (valid.resultado &&
                (
                    !valid.nome.includes('MAC') ||
                    (valid.nome.includes('MAC') && this.holderService.cadastro.rede.planta != 'VIVO2')
                )
            ) {
                return true;
            }
            return false;
        }
    }

    public hasTimes(valid: Valids) {
        if (this.holderService.cadastro) {
            if (!valid.resultado && !valid.foiCorrigido &&
                (valid.nome != 'Associação Serial ONT' && this.holderService.cadastro.rede.planta != 'VIVO2')) {
                return true;
            }
            return false;
        }
    }


}