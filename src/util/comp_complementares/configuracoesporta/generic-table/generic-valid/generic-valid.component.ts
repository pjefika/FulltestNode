import { Component, OnInit, Input } from '@angular/core';
import { CallAlertService } from 'util/callalerts/call-alert.service';
import { ToastyComponent } from 'util/toasty/toasty.component';
import { HolderService } from 'util/holder/holder.service';
import { GenericValidService } from 'util/comp_complementares/configuracoesporta/generic-table/generic-valid/generic-valid.service';

@Component({
    selector: 'generic-valid',
    templateUrl: 'generic-valid.component.html',
    styleUrls: ['generic-valid.component.css'],
    providers: [GenericValidService]
})

export class GenericValidComponent extends CallAlertService implements OnInit {

    @Input() public valid: any;

    constructor(public toastyComponent: ToastyComponent,
        private genericValidService: GenericValidService,
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