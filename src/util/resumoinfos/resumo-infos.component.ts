import { Component, OnInit, Input } from '@angular/core';
import { Cadastro } from 'viewmodel/cadastro/cadastro';

@Component({
    selector: 'resumo-infos-component',
    templateUrl: 'resumo-infos.component.html',
    styleUrls: ['resumo-infos.component.css']
})

export class ResumoInfosComponent implements OnInit {

    @Input() public cadastro: Cadastro;

    constructor() { }

    public ngOnInit() { }

}