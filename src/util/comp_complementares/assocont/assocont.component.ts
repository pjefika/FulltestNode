import { Cadastro } from './../../../viewmodel/cadastro/cadastro';
import { AssocontService } from './assocont.service';
import { Router } from '@angular/router';
import { Util } from './../../util';
import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'assocont-component',
    templateUrl: 'assocont.component.html',
    styleUrls: ['assocont.component.css']
})

export class AssocontComponent implements OnInit {

    @Input() cadastro: Cadastro;

    constructor(private util: Util,
        private router: Router,
        private assocontService: AssocontService) { }

    ngOnInit() {
        this.util.isLogado().then((result: boolean) => {
            if (!result) {
                this.router.navigate(['./entrar']);
            }
        });
    }
}