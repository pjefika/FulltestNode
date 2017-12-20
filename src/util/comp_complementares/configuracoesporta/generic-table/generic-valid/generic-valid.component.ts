import { Component, OnInit, Input } from '@angular/core';
import { CallAlertService } from 'util/callalerts/call-alert.service';
import { ToastyComponent } from 'util/toasty/toasty.component';
import { HolderService } from 'util/holder/holder.service';
import { GenericValidService } from 'util/comp_complementares/configuracoesporta/generic-table/generic-valid/generic-valid.service';

@Component({
    selector: 'generic-valid',
    templateUrl: 'generic-valid.component.html',
    styleUrls: ['generic-valid.component.css'],
    providers: [GenericValidService]
})

export class GenericValidComponent extends CallAlertService implements OnInit {

    @Input() public valid: any;

    constructor(public toastyComponent: ToastyComponent,
        private genericValidService: GenericValidService,
        private holderService: HolderService) {
        super(toastyComponent);
    }

    public ngOnInit() {
        
    }
   
}