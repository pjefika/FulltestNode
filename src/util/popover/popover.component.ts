import { Cadastro } from './../../viewmodel/cadastro/cadastro';
import { PopoverService } from './popover.service';

import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'popover-component',
    templateUrl: 'popover.component.html',
    styleUrls: ['popover.component.css']
})

export class PopoverComponent implements OnInit {

    ativo: boolean = false;
    @Input() cadastro: Cadastro;

    constructor(
        private popoverService: PopoverService) { }

    ngOnInit() { }



}