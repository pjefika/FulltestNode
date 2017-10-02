import { HolderService } from './../../../holder/holder.service';
import { ConfPorta } from './../../../../viewmodel/confPorta/confPorta';
import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'configuracoes-porta-gpon-component',
    templateUrl: 'configuracoes-porta-gpon.component.html',
    styleUrls: ['configuracoes-porta-gpon.component.css']
})

export class ConfiguracoesPortaGponComponent implements OnInit {

    constructor(
        private holderService: HolderService) { }

    ngOnInit() { }


}