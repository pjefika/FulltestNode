import { Component, OnInit, Input } from '@angular/core';
import { SuperComponentService } from '../../../../util/supercomponent/supercomponent.service';
import { ToastyComponent } from '../../../toasty/toasty.component';
import { FulltestConfiabilidadeRedeService } from './fulltest-confiabilidade-rede.service';
import { VariavelHolderService } from '../../../../util/holder/variavelholder.service';
import { Valid } from '../../../../viewmodel/valid/valid';
import { SystemHolderService } from '../../../../util/holder/systemholder.service';

@Component({
    selector: 'fulltest-confiabilidade-rede-component',
    templateUrl: 'fulltest-confiabilidade-rede.component.html',
    styleUrls: ['fulltest-confiabilidade-rede.component.css'],
    providers: [FulltestConfiabilidadeRedeService]
})

export class FulltestConfiabilidadeRedeComponent extends SuperComponentService implements OnInit {

    private btnCosultaDisable: boolean = false;
    private btnConsultaName: string = "Consultar";

    @Input() public confRedeValid: Valid;

    constructor(public toastyComponent: ToastyComponent,
        public systemHolderService: SystemHolderService,
        private FulltestConfiabilidadeRedeService: FulltestConfiabilidadeRedeService,
        public variavelHolderService: VariavelHolderService) {
        super(toastyComponent, systemHolderService)
    }

    public ngOnInit() { }

    private consultarConfRede() {
        this.btnCosultaDisable = true;
        this.btnConsultaName = "Aguarde..."

        this.FulltestConfiabilidadeRedeService
            .consultarConfRede(this.variavelHolderService.cadastro)
            .then(resposta => {
                this.confRedeValid = resposta;
                super.callToasty("Sucesso", "Comando realizado com sucesso.", "success", 5000);
            }, erro => {
                super.callToasty("Ops, ocorreu um erro.", erro.mError, "error", 5000);
            })
            .then(() => {
                this.btnCosultaDisable = false;
                this.btnConsultaName = "Consultar"
            });
    }


}