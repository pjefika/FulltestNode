import { Cadastro } from './../../viewmodel/cadastro/cadastro';
import { Router } from '@angular/router';
import { Util } from './../../util/util';
import { ComplementaresService } from './complementares.service';
import { Component, OnInit, Input, Injector } from '@angular/core';

@Component({
    selector: 'complementares-component',
    templateUrl: 'complementares.component.html',
    styleUrls: ['complementares.component.css']
})

export class ComplementaresComponent implements OnInit {

    cadastro: Cadastro;

    constructor(
        private util: Util,
        private router: Router,
        private injector: Injector,
        private complementaresService: ComplementaresService) {
        this.cadastro = this.injector.get('cadastro');
    }

    // Reset de porta e Associação ONT

    ngOnInit() {
        this.util.isLogado().then((result: boolean) => {
            if (!result) {
                this.router.navigate(['./entrar']);
            }
        });
    }
}