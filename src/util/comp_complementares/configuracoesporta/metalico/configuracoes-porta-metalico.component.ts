import { HolderService } from './../../../holder/holder.service';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'configuracoes-porta-metalico-component',
    templateUrl: 'configuracoes-porta-metalico.component.html',
    styleUrls: ['configuracoes-porta-metalico.component.css']
})

export class ConfiguracoesPortaMetalicoComponent implements OnInit {

    constructor(
        private holderService: HolderService) { }

    public ngOnInit() {
        // console.log(this.holderService.confPorta);
        
    }
}