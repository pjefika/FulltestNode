import { InfoNC } from './../viewmodel/nortel-conections/infoNC';
import { InfoNortelConection } from './../viewmodel/nortel-conections/infos-nortel-conection';
import { NortelConectionsService } from './../util/comp_complementares/nortel-conections/nortel-conections.service';
import { ToastyComponent } from './../util/toasty/toasty.component';
import { HolderService } from './../util/holder/holder.service';
import { Component, OnInit, Input } from '@angular/core';
import { CallAlertService } from 'util/callalerts/call-alert.service';

@Component({
    selector: 'adm-component',
    templateUrl: 'adm.component.html',
    styleUrls: ['adm.component.css'],
    providers: [NortelConectionsService]
})

export class AdmComponent extends CallAlertService implements OnInit {


    constructor(
        public holderService: HolderService,
        public toastyComponent: ToastyComponent,
        private nortelConectionsService: NortelConectionsService) {
        super(toastyComponent);
    }

    public ngOnInit() {
        
    }

}