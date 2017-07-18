import { Router } from '@angular/router';
import { Util } from './../../util';
import { ResetService } from './reset.service';
import { Cadastro } from './../../../viewmodel/cadastro/cadastro';
import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'port-reset-component',
    templateUrl: 'reset.component.html',
    styleUrls: ['reset.component.css']
})

export class ResetComponent implements OnInit {

    @Input() cadastro: Cadastro;

    loadingbtn: boolean = false;

    constructor(
        private util: Util,
        private router: Router,
        private resetService: ResetService) { }

    ngOnInit() {
        this.util.isLogado().then((result: boolean) => {
            if (!result) {
                this.router.navigate(['./fulltest/entrar']);
            }
        });
    }

    reset() {
        console.log("resetou.... só q não!");
        //this.loadingbtn = true;
    }

}