import { Component, OnInit } from '@angular/core';
import { HolderService } from 'util/holder/holder.service';

@Component({
    selector: 'configuracao-linha-ims-component',
    templateUrl: 'configuracao-linha-ims.component.html',
    styleUrls: ['configuracao-linha-ims.component.css']
})

export class ConfiguracaoLinhaImsComponent implements OnInit {
    constructor(public holderService: HolderService) { }

    ngOnInit() {
        this.holderService.sidenav = false;
    }
}