import { Component, OnInit, Input } from '@angular/core';
import { Fulltest } from '../../../viewmodel/fulltest/fulltest';
import { SuperComponentService } from '../../../util/supercomponent/supercomponent.service';
import { ToastyComponent } from '../../toasty/toasty.component';
import { SystemHolderService } from '../../../util/holder/systemHolder.service';

@Component({
    selector: 'validador-info-fulltest-table-component',
    templateUrl: 'validador-info-fulltest-table.component.html'
})

export class ValidadorInfoFulltestTableComponent extends SuperComponentService implements OnInit {

    @Input() public fulltest: Fulltest;

    constructor(public toastyComponent: ToastyComponent,
        public systemHolderService: SystemHolderService) {
        super(toastyComponent, systemHolderService);
    }

    public ngOnInit() {
        this.moutAlert();
    }

    private moutAlert() {
        super.callAlert(this.fulltest.resultado ? 'alert-success' : 'alert-danger', this.fulltest.mensagem);
    }

}