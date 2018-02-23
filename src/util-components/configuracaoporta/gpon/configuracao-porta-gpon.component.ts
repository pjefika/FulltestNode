import { Component, OnInit, Input } from '@angular/core';
import { SuperComponentService } from '../../../util/supercomponent/supercomponent.service';
import { ConfPorta } from '../../../viewmodel/confporta/confporta';
import { ToastyComponent } from '../../toasty/toasty.component';
import { SystemHolderService } from '../../../util/holder/systemHolder.service';
import { VariavelHolderService } from '../../../util/holder/variavelholder.service';

@Component({
    selector: 'configuracao-porta-gpon-component',
    templateUrl: 'configuracao-porta-gpon.component.html'
})

export class ConfiguracaoPortaGponComponent extends SuperComponentService implements OnInit {

    @Input() public confPorta: ConfPorta;

    constructor(public toastyComponent: ToastyComponent,
        public systemHolderService: SystemHolderService,
        public variavelHolderService: VariavelHolderService) {
        super(toastyComponent, systemHolderService);
    }

    public ngOnInit() { }

}