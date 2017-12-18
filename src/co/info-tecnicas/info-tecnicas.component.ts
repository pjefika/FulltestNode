import { Component, OnInit } from '@angular/core';
import { InfoTecnicasService } from 'co/info-tecnicas/info-tecnicas.service';
import { CallAlertService } from 'util/callalerts/call-alert.service';
import { ToastyComponent } from 'util/toasty/toasty.component';
import { HolderService } from 'util/holder/holder.service';

@Component({
    selector: 'info-tecnicas-component',
    templateUrl: 'info-tecnicas.component.html',
    styleUrls: ['info-tecnicas.component.css'],
    providers: [InfoTecnicasService]
})

export class InfoTecnicasComponent extends CallAlertService implements OnInit {

    constructor(
        public toastyComponent: ToastyComponent,
        public holderService: HolderService) {
        super(toastyComponent);
    }

    public ngOnInit() { }

}