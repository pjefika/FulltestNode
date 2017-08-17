import { Cadastro } from './../../viewmodel/cadastro/cadastro';
import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'table-cadastro-component',
    templateUrl: 'table-cadastro.component.html',
    styleUrls: ['table-cadastro.component.css']
})

export class TableCadastroComponent implements OnInit {

    @Input() cadastro: Cadastro;

    constructor() { }

    ngOnInit() { }

}