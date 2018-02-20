import { Component, OnInit, Input } from '@angular/core';
import { Customer } from '../../viewmodel/customer/customer';

@Component({
    selector: 'resumo-infos-component',
    templateUrl: 'resumo-infos.component.html'
})

export class ResumoInfosComponent implements OnInit {

    @Input() public cadastro: Customer;

    constructor() { }

    public ngOnInit() { }

}