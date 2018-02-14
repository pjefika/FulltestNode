import { InfoNC } from './../viewmodel/nortel-conections/infoNC';
import { InfoNortelConection } from './../viewmodel/nortel-conections/infos-nortel-conection';
import { ToastyComponent } from './../util/toasty/toasty.component';
import { HolderService } from './../util/holder/holder.service';
import { Component, OnInit, Input } from '@angular/core';
import { CallAlertService } from 'util/callalerts/call-alert.service';
import { AdmService } from './adm.service';

@Component({
    selector: 'adm-component',
    templateUrl: 'adm.component.html',
    styleUrls: ['adm.component.css'],
    providers: [AdmService]
})

export class AdmComponent extends CallAlertService implements OnInit {

    private isLoading: boolean = false;

    private testing: boolean = false;

    constructor(
        public holderService: HolderService,
        public toastyComponent: ToastyComponent,
        private admService: AdmService) {
        super(toastyComponent);
    }

    public ngOnInit() { }


}