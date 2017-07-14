import { SignpostService } from './signpost.service';
import { Cadastro } from './../../viewmodel/cadastro';
import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'signpost-component',
    templateUrl: 'signpost.component.html',
    styleUrls: ['signpost.component.css']
})

export class SignpostComponent implements OnInit {

    ativo: boolean = false;
    @Input() state: boolean = false;

    @Input() cadastro: Cadastro;

    constructor(
        private signpostService: SignpostService) { }

    ngOnInit() { }


    
}