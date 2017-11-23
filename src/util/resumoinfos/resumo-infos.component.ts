import { Component, OnInit } from '@angular/core';
import { Cadastro } from 'viewmodel/cadastro/cadastro';
import { HolderService } from 'util/holder/holder.service';
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
    selector: 'resumo-infos-component',
    templateUrl: 'resumo-infos.component.html',
    styleUrls: ['resumo-infos.component.css'],
    animations: [
        trigger('flyInOut', [
            state('in', style({ transform: 'translateX(0)' })),
            transition('void => *', [
                style({ transform: 'translateX(-100%)' }),
                animate(100)
            ]),
            transition('* => void', [
                animate(100, style({ transform: 'translateX(100%)' }))
            ])
        ])
    ]
})

export class ResumoInfosComponent implements OnInit {

    constructor(public holderService: HolderService) { }

    public ngOnInit() { }

}