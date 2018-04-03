import { Component, OnInit, Input } from '@angular/core';
import { SuperComponentService } from '../../../../util/supercomponent/supercomponent.service';
import { ToastyComponent } from '../../../toasty/toasty.component';
import { Valid } from '../../../../viewmodel/valid/valid';
import { VariavelHolderService } from '../../../../util/holder/variavelholder.service';
import { SystemHolderService } from '../../../../util/holder/systemholder.service';

@Component({
    selector: 'fulltest-parametros-component',
    templateUrl: 'fulltest-parametros.component.html'
})

export class FulltestParametrosComponent extends SuperComponentService implements OnInit {

    @Input() public parametros: Valid;

    constructor(public toastyComponent: ToastyComponent,
        public systemHolderService: SystemHolderService,
        public variavelHolderService: VariavelHolderService) {
        super(toastyComponent, systemHolderService);
    }

    public ngOnInit() { }

}