import { Component, OnInit, Input } from '@angular/core';
import { Fulltest } from '../../../viewmodel/fulltest/fulltest';
import { SuperComponentService } from '../../../util/supercomponent/supercomponent.service';
import { ToastyComponent } from '../../toasty/toasty.component';
import { Valid } from '../../../viewmodel/valid/valid';
import { VariavelHolderService } from '../../../util/holder/variavelholder.service';
import { Certification } from '../../../viewmodel/fulltest/certification';
import { SystemHolderService } from '../../../util/holder/systemholder.service';

@Component({
    selector: 'info-fulltest-table-component',
    templateUrl: 'info-fulltest-table.component.html'
})

export class InfoFulltestTableComponent extends SuperComponentService implements OnInit {

    @Input() public certification: Certification;

    constructor(public toastyComponent: ToastyComponent,
        public systemHolderService: SystemHolderService,
        public variavelHolderService: VariavelHolderService) {
        super(toastyComponent, systemHolderService);
    }

    public ngOnInit() {
        // super.callAlert(this.certification.fulltest.resultado ? 'alert-success' : 'alert-danger', this.certification.fulltest.mensagem);
    }

    public hasRowDetail(valid: Valid) {
        if (this.variavelHolderService.cadastro) {
            if ((valid.nome.includes("Porta")) ||
                (valid.mensagem.includes("Cliente sem")) ||
                (valid.nome == 'MAC do Equipamento' && (!valid.resultado || this.variavelHolderService.cadastro.rede.planta != 'VIVO2')) ||
                (valid.nome == 'Associação Serial ONT' && (valid.resultado || this.variavelHolderService.cadastro.rede.planta != 'VIVO2')) ||
                (valid.nome == 'Afetação Vizinhança')) {
                return false;
            }
            return true;
        }
    }

    public hasExclamationSign(valid: Valid) {
        if (this.variavelHolderService.cadastro) {
            if ((!valid.resultado && valid.foiCorrigido) ||
                (valid.resultado && valid.nome.includes('MAC') && this.variavelHolderService.cadastro.rede.planta == 'VIVO2') ||
                (valid.nome == 'Associação Serial ONT' && this.variavelHolderService.cadastro.rede.planta == 'VIVO2' && !valid.resultado)) {
                return true;
            }
            return false;
        }
    }

    public hasCheck(valid: Valid) {
        if (this.variavelHolderService.cadastro) {
            if (valid.resultado && (!valid.nome.includes('MAC') || (valid.nome.includes('MAC') && this.variavelHolderService.cadastro.rede.planta != 'VIVO2'))) {
                return true;
            }
            return false;
        }
    }

    public hasTimes(valid: Valid) {
        if (this.variavelHolderService.cadastro) {
            if (!valid.resultado && !valid.foiCorrigido) {
                // Retirado do if pois nao estava entrando no caso de uso do parametro.
                //&& (valid.nome != 'Associação Serial ONT' && this.variavelHolderService.cadastro.rede.planta != 'VIVO2')
                return true;
            }
            return false;
        }
    }

}