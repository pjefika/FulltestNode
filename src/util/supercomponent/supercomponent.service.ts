import { Injectable } from '@angular/core';
import { Customer } from '../../viewmodel/customer/customer';
import { SystemHolderService } from '../holder/systemHolder.service';
import { ToastyComponent } from '../../util-components/toasty/toasty.component';
import { AlertService } from '../alert/alert.service';
import { Certification } from '../../viewmodel/fulltest/certification';

@Injectable()
export class SuperComponentService extends AlertService {

    constructor(public toastyComponent: ToastyComponent,
        public systemHolderService: SystemHolderService) {
        super(toastyComponent);
    }

    public ifIsCadastro(cadastro: Customer): boolean {
        let valid: boolean = false;
        if (cadastro) {
            if (cadastro.linha.dn && !cadastro.designador) {
                valid = true;
                this.systemHolderService.subNavMenus.forEach(subnav => {
                    if (subnav.nome === "Informações Técnicas" || subnav.nome === "Configuração Linha") {
                        subnav.ativo = true;
                    }
                });
                this.systemHolderService.clienteSoLinha = true;
            } else if (!cadastro.rede && (!cadastro.servicos.velDown && !cadastro.servicos.velUp)) {
                this.systemHolderService.subnavAtivo = false;
            } else {
                this.systemHolderService.subNavMenus.forEach(subnav => {
                    subnav.ativo = true;
                });
                valid = true;
                this.systemHolderService.subnavAtivo = true;
            }
        }
        return valid;
    }

    public ifIsFulltest(certification: Certification): boolean {
        let valid: boolean = false;
        if (certification) {
            return true;
        }
        return valid;
    }

}