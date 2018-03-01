import { Component, OnInit, Input } from '@angular/core';
import { Fulltest } from '../../../viewmodel/fulltest/fulltest';
import { Valid } from '../../../viewmodel/valid/valid';
import { VariavelHolderService } from '../../../util/holder/variavelholder.service';

@Component({
    selector: 'validador-manobra-fulltest-table-component',
    templateUrl: 'validador-manobra-fulltest-table.component.html'
})

export class ValidadorManobraFulltestTableComponent implements OnInit {

    @Input() public fulltest: Fulltest;

    constructor(public variavelHolderService: VariavelHolderService) { }

    public ngOnInit() { }

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
            if (valid.resultado &&
                (
                    !valid.nome.includes('MAC') ||
                    (valid.nome.includes('MAC') && this.variavelHolderService.cadastro.rede.planta != 'VIVO2')
                )
            ) {
                return true;
            }
            return false;
        }
    }

    public hasTimes(valid: Valid) {
        if (this.variavelHolderService.cadastro) {
            if (!valid.resultado && !valid.foiCorrigido &&
                (valid.nome != 'Associação Serial ONT' && this.variavelHolderService.cadastro.rede.planta != 'VIVO2')) {
                return true;
            }
            return false;
        }
    }

}