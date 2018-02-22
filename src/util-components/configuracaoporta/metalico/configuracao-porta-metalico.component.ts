import { Component, OnInit, Input } from '@angular/core';
import { SuperComponentService } from '../../../util/supercomponent/supercomponent.service';
import { ToastyComponent } from '../../toasty/toasty.component';
import { SystemHolderService } from '../../../util/holder/systemHolder.service';
import { VariavelHolderService } from '../../../util/holder/variavelholder.service';
import { ConfPorta } from '../../../viewmodel/confporta/confporta';

@Component({
    selector: 'configuracao-porta-metalico-component',
    templateUrl: 'configuracao-porta-metalico.component.html'
})

export class ConfiguracaoPortaMetalicoComponent extends SuperComponentService implements OnInit {

    @Input() public confPorta: ConfPorta;

    constructor(public toastyComponent: ToastyComponent,
        public systemHolderService: SystemHolderService,
        public variavelHolderService: VariavelHolderService) {
        super(toastyComponent, systemHolderService);
    }

    public ngOnInit() { }

}