import { Component, OnInit, Input } from '@angular/core';
import { Valid } from '../../../../viewmodel/valid/valid';
import { SuperComponentService } from '../../../../util/supercomponent/supercomponent.service';
import { ToastyComponent } from '../../../toasty/toasty.component';
import { SystemHolderService } from '../../../../util/holder/systemHolder.service';

@Component({
    selector: 'fulltest-modulacao-component',
    templateUrl: 'fulltest-modulacao.component.html'
})

export class FulltestModulacaoComponent extends SuperComponentService implements OnInit {

    @Input() public modulacao: Valid;

    constructor(public toastyComponent: ToastyComponent,
        public systemHolderService: SystemHolderService) {
        super(toastyComponent, systemHolderService);
    }

    public ngOnInit() { }

}