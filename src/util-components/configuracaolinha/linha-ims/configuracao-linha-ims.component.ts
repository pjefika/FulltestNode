import { Component, OnInit } from '@angular/core';
import { SuperComponentService } from '../../../util/supercomponent/supercomponent.service';
import { ToastyComponent } from '../../toasty/toasty.component';
import { SystemHolderService } from '../../../util/holder/systemHolder.service';

@Component({
    selector: 'configuracao-linha-ims-component',
    templateUrl: 'configuracao-linha-ims.component.html'
})

export class ConfiguracaoLinhaImsComponent extends SuperComponentService implements OnInit {

    constructor(public toastyComponent: ToastyComponent,
        public systemHolderService: SystemHolderService) {
        super(toastyComponent, systemHolderService);
    }

    public ngOnInit() {
        this.setMsgNotImplement();
    }

    private setMsgNotImplement() {
        super.callAlert("alert-error", "Funcionalidade ainda não implantada para este modelo.");
    }

}