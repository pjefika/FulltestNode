import { Component, OnInit } from '@angular/core';
import { CentraisNortelService } from './centrais-nortel.service';
import { SuperComponentService } from '../../../util/supercomponent/supercomponent.service';
import { ToastyComponent } from '../../toasty/toasty.component';
import { SystemHolderService } from '../../../util/holder/systemHolder.service';
import { InfoNortelConection } from '../../../viewmodel/linha/centrais-nortel/infos-nortel-conection';
import { StringFilter } from 'clarity-angular';
import { InfosNortelTela } from '../../../viewmodel/linha/centrais-nortel/infors-nortel-tela';

class CentralConnectedFilter implements StringFilter<InfoNortelConection> {
    accepts(info: InfoNortelConection, search: string): boolean {
        if (search == "sim") {
            search = "true";
        } else if (search == "não") {
            search = "false";
        }
        return "" + info.connected == search;
    }
}

class CentralOcupadoFilter implements StringFilter<InfoNortelConection> {
    accepts(info: InfoNortelConection, search: string): boolean {
        if (search == "sim") {
            search = "true";
        } else if (search == "não") {
            search = "false";
        }
        return "" + info.busy == search;
    }
}

class CentralNameFilter implements StringFilter<InfoNortelConection> {
    accepts(info: InfoNortelConection, search: string): boolean {
        if (info.central.toLowerCase().includes(search)) {
            return info.central.toLowerCase().includes(search);
        }
        return "" + info.central.toLowerCase() == search;
    }
}

class CentralIPFilter implements StringFilter<InfoNortelConection> {
    accepts(info: InfoNortelConection, search: string): boolean {
        if (info.ip.toLowerCase().includes(search)) {
            return info.ip.toLowerCase().includes(search);
        }
        return "" + info.ip.toLowerCase() == search;
    }
}

@Component({
    selector: 'centrais-nortel-component',
    templateUrl: 'centrais-nortel.component.html',
    styleUrls: ['centrais-nortel.component.css'],
    providers: [CentraisNortelService]
})

export class CentraisNortelComponent extends SuperComponentService implements OnInit {

    private isLoading: boolean = false;

    private listInfoNortelConection: InfoNortelConection[];

    private infosNortelTela: InfosNortelTela;

    private infoLoading: string;

    constructor(private centraisNortelService: CentraisNortelService,
        public toastyComponent: ToastyComponent,
        public systemHolderService: SystemHolderService) {
        super(toastyComponent, systemHolderService);
    }

    public ngOnInit() {
        this.getContextDMS();
    }

    private getContextDMS() {
        this.infoLoading = "Buscando Conexões Nortel...";
        this.isLoading = true;
        this.centraisNortelService
            .getContextDMS()
            .then(resposta => {
                this.listInfoNortelConection = resposta;
            }, erro => {
                super.callToasty("Ops, ocorreu um erro.", erro.mError, "error", 5000);
            }).then(() => {
                this.addinfos();
                this.isLoading = false;
            });
    }

    private connection(conec: string) {
        this.infoLoading = "Aguarde...";
        this.isLoading = true;
        this.centraisNortelService
            .connection(conec)
            .then(resposta => {
                this.listInfoNortelConection = resposta;
                super.callToasty("Sucesso", "Comando realizado com sucesso", "success", 5000);
            }, erro => {
                super.callToasty("Ops, ocorreu um erro.", erro.mError, "error", 5000);
            })
            .then(() => {
                this.addinfos();
                this.isLoading = false;
            });
    }

    private connectSwitch(ip: string) {
        this.infoLoading = "Ativando Conexão...";
        this.isLoading = true;
        this.centraisNortelService
            .connectSwitch(ip)
            .then(data => {
                this.getContextDMS();
                super.callToasty("Sucesso", "Comando realizado com sucesso", "success", 5000);
            }, error => {
                super.callToasty("Ops, ocorreu um erro.", error.mError, "error", 5000);
            })
            .then(() => {
                this.isLoading = false;
            })
    }

    private disconnectSwitch(ip: string) {
        this.infoLoading = "Desativando Conexão...";
        this.isLoading = false;
        this.centraisNortelService
            .disconnectSwitch(ip)
            .then(data => {
                this.getContextDMS();
                super.callToasty("Sucesso", "Comando realizado com sucesso", "success", 5000);
            }, error => {
                super.callToasty("Ops, ocorreu um erro.", error.mError, "error", 5000);
            })
            .then(() => {
                this.isLoading = false;
            });
    }

    private addinfos() {
        this.infosNortelTela = null;
        let qtdetrue = 0;
        let qtdefalse = 0;
        let cred;
        if (this.listInfoNortelConection) {
            this.listInfoNortelConection.forEach(element => {
                cred = element.credencial;
                if (element.connected) {
                    qtdetrue++;
                } else {
                    qtdefalse++;
                }
            });
            this.infosNortelTela = {
                credencial: cred,
                quantiadeTrue: qtdetrue,
                quantidadeFalse: qtdefalse
            }
        }
    }

}