import { Component, OnInit, Input } from '@angular/core';
import { ConfiabilidadeRede } from 'viewmodel/confPorta/confiabilidadeRede';
import { CallAlertService } from 'util/callalerts/call-alert.service';
import { ToastyComponent } from 'util/toasty/toasty.component';
import { ConfiabilidadeRedeCpService } from 'util/comp_complementares/configuracoesporta/generic-table/confiab-rede/confiab-rede-cp.service';
import { HolderService } from 'util/holder/holder.service';

@Component({
    selector: 'confiab-rede',
    templateUrl: 'confiab-rede-cp.component.html',
    styleUrls: ['confiab-rede-cp.component.css'],
    providers: [ConfiabilidadeRedeCpService]
})

export class ConfiabRedeCpComponent extends CallAlertService implements OnInit {

    @Input() public confRede: ConfiabilidadeRede;

    private actionBtn: boolean = false;
    private actionBtnName: string = "Consultar Novamente";


    constructor(public toastyComponent: ToastyComponent,
        private confiabilidadeRedeCpService: ConfiabilidadeRedeCpService,
        private holderService: HolderService) {
        super(toastyComponent);
    }

    public ngOnInit() {
        
    }

    public consultar() {
        this.actionBtn = true;
        this.actionBtnName = "Aguarde...";
        this.confiabilidadeRedeCpService
            .consultar(this.holderService.cadastro)
            .then(data => {
                this.confRede = data;
                this.actionBtn = false;
                this.actionBtnName = "Consultar Novamente";
                super.callToasty("Sucesso", "Comando realizado com sucesso.", "success", 5000)
            }, error => {
                this.actionBtn = false;
                this.actionBtnName = "Consultar Novamente";
                super.callToasty("Ops, ocorreu um erro.", error.mError, "error", 5000);
            });
    }
}