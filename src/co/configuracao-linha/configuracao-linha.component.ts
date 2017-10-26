import { HolderService } from './../../util/holder/holder.service';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'configuracao-linha-component',
    templateUrl: 'configuracao-linha.component.html',
    styleUrls: ['configuracao-linha.component.css'],
})

export class ConfiguracaoLinhaComponent implements OnInit {

    constructor(
        public holderService: HolderService) { }

    public ngOnInit() {
        this.holderService.sidenav = true;
    }

}