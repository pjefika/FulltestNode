import { ToastyComponent } from './../util/toasty/toasty.component';
import { HolderService } from './../util/holder/holder.service';
import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'adm-component',
    templateUrl: 'adm.component.html',
    styleUrls: ['adm.component.css']
})

export class AdmComponent implements OnInit {

    private listLogin: string[] = [];
    private loginAtivo: string = "LOGIN2";

    constructor(
        public holderService: HolderService,
        private toastyComponent: ToastyComponent) { }

    ngOnInit() {
        this.mocklogins();
    }

    public mocklogins() {
        this.listLogin.push("LOGIN1");
        this.listLogin.push("LOGIN2");
        this.listLogin.push("LOGIN3");
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