import { Util } from './../../util';
import { ObjectValid } from './../../../viewmodel/fulltest/objectValid';
import { Cadastro } from './../../../viewmodel/cadastro/cadastro';

import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'popover-component',
    templateUrl: 'popover.component.html',
    styleUrls: ['popover.component.css']
})

export class PopoverComponent implements OnInit {

    ativo: boolean = false;
    @Input() cadastro: Cadastro;
    @Input() objectValid: ObjectValid;

    constructor(
        public util: Util) { }

    ngOnInit() { }



}