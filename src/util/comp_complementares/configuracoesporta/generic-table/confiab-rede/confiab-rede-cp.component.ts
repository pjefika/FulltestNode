import { Component, OnInit, Input } from '@angular/core';
import { ConfiabilidadeRede } from 'viewmodel/confPorta/confiabilidadeRede';
import { CallAlertService } from 'util/callalerts/call-alert.service';
import { ToastyComponent } from 'util/toasty/toasty.component';
import { ConfiabilidadeRedeCpService } from 'util/comp_complementares/configuracoesporta/generic-table/confiab-rede/confiab-rede-cp.service';
import { HolderService } from 'util/holder/holder.service';

@Component({
    selector: 'confiab-rede-stackblock-cp',
    templateUrl: 'confiab-rede-stackblock-cp.component.html',
    styleUrls: ['confiab-rede-cp.component.css'],
    providers: [ConfiabilidadeRedeCpService]
})

export class ConfiabRedeCpComponent extends CallAlertService implements OnInit {

    @Input() public confRede: ConfiabilidadeRede;

    private btnChangeAdminStateDisable: boolean = false;
    private btnChangeAdminStateName: string = "Executar";

    constructor(public toastyComponent: ToastyComponent,
        private confiabilidadeRedeCpService: ConfiabilidadeRedeCpService,
        private holderService: HolderService) {
        super(toastyComponent);
    }

    public ngOnInit() {
        //console.log(this.estadoPorta);
    }

    // public setAdminState() {
    //     this.btnChangeAdminStateDisable = true;
    //     this.btnChangeAdminStateName = "Aguarde...";
    //     this.confiabilidadeRedeCpService
    //         .setAdminState(this.holderService.cadastro, this.confRede.result)
    //         .then(data => {
    //             this.confRede = data;
    //             this.btnChangeAdminStateDisable = false;
    //             this.btnChangeAdminStateName = "Executar";
    //             super.callToasty("Sucesso", "Comando realizado com sucesso.", "success", 5000)
    //         }, error => {
    //             this.btnChangeAdminStateDisable = false;
    //             this.btnChangeAdminStateName = "Executar";
    //             super.callToasty("Ops, ocorreu um erro.", error.mError, "error", 5000);
    //         });
    // }
}