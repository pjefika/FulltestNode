import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import 'rxjs/add/operator/toPromise';

import { TestService } from './test.service';
import { Cadastro } from './../viewmodel/cadastro';
import { Valids } from './../viewmodel/validacao';

import { Util } from '../util/util';

@Component({
    templateUrl: 'test.component.html',
    styleUrls: ['test.component.css']
})

export class TestComponent implements OnInit {

    cadastro: Cadastro;

    valids: Valids[];

    constructor( private router: Router, private util: Util, private testService: TestService ) {}

    ngOnInit(): void {

    }

    getValidacao(): void {
        this.testService.getValidacao(this.cadastro).then(data => {
            this.valids = data;
            console.log(this.valids);
        },
        erro => {
            console.log("erro");
        });
    }

}