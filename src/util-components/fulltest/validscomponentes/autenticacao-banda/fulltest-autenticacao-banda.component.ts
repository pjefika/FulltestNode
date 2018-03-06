import { Component, OnInit, Input } from '@angular/core';
import { SuperComponentService } from '../../../../util/supercomponent/supercomponent.service';
import { ToastyComponent } from '../../../toasty/toasty.component';
import { SystemHolderService } from '../../../../util/holder/systemHolder.service';
import { VariavelHolderService } from '../../../../util/holder/variavelholder.service';
import { FulltestAutenticacaoBandaService } from './fulltest-autenticacao-banda.service';
import { Valid } from '../../../../viewmodel/valid/valid';
import { AutenticacaoBanda } from '../../../../viewmodel/fulltest/autenticacaobanda/autenticacaobanda';

@Component({
    selector: 'fulltest-autenticacao-banda-component',
    templateUrl: 'fulltest-autenticacao-banda.component.html',
    styleUrls: ['fulltest-autenticacao-banda.component.css'],
    providers: [FulltestAutenticacaoBandaService]
})

export class FulltestAutenticacaoBandaComponent extends SuperComponentService implements OnInit {

    @Input() public autenticacao: Valid;

    private autenticacaoBanda: AutenticacaoBanda;

    private btnConsultarDisabled: boolean = false;
    private btnConsultarName: string = "Consultar Autenticação";

    constructor(public toastyComponent: ToastyComponent,
        public systemHolderService: SystemHolderService,
        public variavelHolderService: VariavelHolderService,
        private fulltestAutenticacaoBandaService: FulltestAutenticacaoBandaService) {
        super(toastyComponent, systemHolderService);
    }

    public ngOnInit() {
        this.consultarAutenticacao();
    }

    public consultarAutenticacao() {
        this.btnConsultarDisabled = true;
        this.btnConsultarName = "Consultando Autenticação...";
        this.fulltestAutenticacaoBandaService
            .consultarAutenticacao(this.autenticacao.result)
            .then(resposta => {
                this.autenticacaoBanda = resposta;
                super.callToasty("Sucesso", "Comando realizado com sucesso.", "success", 5000);
            }, erro => {
                super.callToasty("Ops, ocorreu um erro.", erro.mError, "error", 5000);
            })
            .then(() => {
                this.btnConsultarDisabled = false;
                this.btnConsultarName = "Consultar Autenticação";
            });
    }

    public matchProfile(prof1: string, prof2: string) {
        let profile1 = prof1.match(/[^a-z ]\ *([.0-9])*\d/g);
        let profile2 = prof2.match(/[^a-z ]\ *([.0-9])*\d/g);
        // console.log(profile1);
        // console.log(profile2);
        return profile1[0] == profile2[0] && profile1[1] == profile2[1];

    }

}