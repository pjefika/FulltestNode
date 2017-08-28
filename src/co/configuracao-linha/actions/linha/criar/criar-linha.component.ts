import { CriarLinhaService } from './criar-linha.service';
import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'criar-linha-component',
    templateUrl: 'criar-linha.component.html',
    styleUrls: ['criar-linha.component.css'],
    providers: [CriarLinhaService]
})

export class CriarLinhaComponent implements OnInit {

    @Input() ativo: boolean = false;
    private instanciaBinada: string;
    private listLens = [];
    private qualLen: string;

    constructor() { }

    ngOnInit() { }

    public getLens() {

    }

    public createInstancia() {

    }
}