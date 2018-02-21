import { Injectable } from '@angular/core';
import { Customer } from '../../viewmodel/customer/customer';
import { SystemHolderService } from '../holder/systemHolder.service';
import { ToastyComponent } from '../../util-components/toasty/toasty.component';
import { AlertService } from '../alert/alert.service';
import { Certification } from '../../viewmodel/fulltest/certification';
import { CadastroLinha } from '../../viewmodel/linha/cadlinha';

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

    public enablebtnresumoinfo() {
        setTimeout(() => {
            // Deixar no time out pois informa exception pois muda muito rapido e a tela não entende.
            this.systemHolderService.btnResumoInfosAtivo = true;
        }, 1);
    }

    public disableresumoinfo() {
        setTimeout(() => {
            // Deixar no time out pois informa exception pois muda muito rapido e a tela não entende.
            this.systemHolderService.resumoInfosAtivo = false;
            this.systemHolderService.btnResumoInfosAtivo = false;
        }, 1);
    }

    public enabledisablesidenav(enable: boolean) {
        setTimeout(() => {
            this.systemHolderService.sideNavAtivo = enable;
        }, 1);
    }

    public validaSeLinhaEstaCriada(cadastroLinha: CadastroLinha): boolean {        
        let valid: boolean = false;
        if (cadastroLinha.status === "CREATED") {
            valid = true;
        }
        return valid;
    }

}