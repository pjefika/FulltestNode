import { Component, OnInit } from '@angular/core';
import { Cadastro } from 'viewmodel/cadastro/cadastro';
import { HolderService } from 'util/holder/holder.service';

@Component({
    selector: 'resumo-infos-component',
    templateUrl: 'resumo-infos.component.html',
    styleUrls: ['resumo-infos.component.css']
})

export class ResumoInfosComponent implements OnInit {

    constructor(public holderService: HolderService) { }

    public ngOnInit() { }

}