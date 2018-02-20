import { Component, OnInit } from '@angular/core';
import { ValidadorManobraService } from './validador-manobra.service';
import { VariavelHolderService } from '../../util/holder/variavelholder.service';
import { ToastyComponent } from '../toasty/toasty.component';
import { SuperComponentService } from '../../util/supercomponent/supercomponent.service';
import { SystemHolderService } from '../../util/holder/systemHolder.service';

@Component({
    selector: 'validador-manobra-component',
    templateUrl: 'validador-manobra.component.html',
    providers: [ValidadorManobraService]
})

export class ValidadorManobraComponent extends SuperComponentService implements OnInit {

    constructor(private validadorManobraService: ValidadorManobraService,
        public variavelHolderService: VariavelHolderService,
        public systemHolderService: SystemHolderService,
        public toastyComponent: ToastyComponent) {
        super(toastyComponent, systemHolderService);
    }

    public ngOnInit() { }
}