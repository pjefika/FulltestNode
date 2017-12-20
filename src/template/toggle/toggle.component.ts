import { HolderService } from './../../util/holder/holder.service';
import { Util } from './../../util/util';
import { Router } from '@angular/router';
import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'toggle-component',
    templateUrl: 'toggle.component.html',
    styleUrls: ['toggle.component.css']
})

export class ToggleComponent implements OnInit {

    private modalToggle: boolean = false;
    private eachFulltest: string = "CO";
    private nameButton: string = "Voltar";
    private disableButton: boolean = false;

    constructor(
        private router: Router,
        private util: Util,
        private holderService: HolderService) { }

    public ngOnInit() {
        this.util.isLogado().then((result: boolean) => {
            if (!result) {
                this.router.navigate(['./entrar']);
            }
        });
    }

    private hitclose() {
        this.modalToggle = false;
        this.holderService.eachFulltest = this.eachFulltest;
    }

    private hitCloseDirect() {
        this.nameButton = "Aguarde...";
        this.disableButton = true;
        setTimeout(() => {
            this.modalToggle = false;
            this.holderService.eachFulltest = this.eachFulltest;
            this.nameButton = "Voltar";
            this.disableButton = false;
        }, 200);
    }
}