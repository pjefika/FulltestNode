import { InfoNC } from './../viewmodel/nortel-conections/infoNC';
import { InfoNortelConection } from './../viewmodel/nortel-conections/infos-nortel-conection';
import { NortelConectionsService } from './../util/comp_complementares/nortel-conections/nortel-conections.service';
import { ToastyComponent } from './../util/toasty/toasty.component';
import { HolderService } from './../util/holder/holder.service';
import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'adm-component',
    templateUrl: 'adm.component.html',
    styleUrls: ['adm.component.css'],
    providers: [NortelConectionsService]
})

export class AdmComponent implements OnInit {

    private listLogin: string[] = [];
    private loginAtivo: string = "LOGIN2";
    private infoNortelConection: InfoNortelConection[];
    private infosNC: InfoNC;

    private btnNameSearchInfoNortel: string = "Buscar";
    private btnDisableSearchInfoNortel: boolean = false;

    constructor(
        public holderService: HolderService,
        private toastyComponent: ToastyComponent,
        private nortelConectionsService: NortelConectionsService) { }

    ngOnInit() {
        this.mocklogins();
        this.getSingleton();
    }

    public mocklogins() {
        this.listLogin.push("UM");
        this.listLogin.push("DOIS");
        this.listLogin.push("TRES");
    }

    public getSingleton() {
        this.btnNameSearchInfoNortel = "Buscando";
        this.btnDisableSearchInfoNortel = true;
        this.nortelConectionsService.getSingleton()
            .then(data => {
                this.infoNortelConection = data;
                this.addinfos();
                this.btnNameSearchInfoNortel = "Buscar";
                this.btnDisableSearchInfoNortel = false;
            }, error => {
                console.log("Erro ao buscar Singletons");
                this.btnNameSearchInfoNortel = "Buscar";
                this.btnDisableSearchInfoNortel = false;
            })
    }

    public addinfos() {
        this.infosNC = null;
        let qtdetrue = 0;
        let qtdefalse = 0;
        let cred;
        this.infoNortelConection.forEach(element => {
            cred = element.credencial;
            if (element.connected) {
                qtdetrue++;
            } else {
                qtdefalse++;
            }
        });
        this.infosNC = {
            credencial: cred,
            quantiadeTrue: qtdetrue,
            quantidadeFalse: qtdefalse
        }
    }

    private callToasty(titulo: string, msg: string, theme: string, timeout?: number) {
        this.toastyComponent.toastyInfo = {
            titulo: titulo,
            msg: msg,
            theme: theme,
        }
        this.toastyComponent.addToasty();
    }


}