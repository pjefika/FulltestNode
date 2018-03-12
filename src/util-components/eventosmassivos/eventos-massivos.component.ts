import { Component, OnInit, Input } from '@angular/core';
import { SuperComponentService } from '../../util/supercomponent/supercomponent.service';
import { ToastyComponent } from '../toasty/toasty.component';
import { SystemHolderService } from '../../util/holder/systemHolder.service';
import { ListEvento } from '../../viewmodel/evento/listevento';

@Component({
    selector: 'eventos-massivos-component',
    templateUrl: 'eventos-massivos.component.html'
})

export class EventosMassivosComponent extends SuperComponentService implements OnInit {

    private btnModalEnable: boolean = false;

    @Input() public eventos: ListEvento[];

    constructor(public toastyComponent: ToastyComponent,
        public systemHolderService: SystemHolderService) {
        super(toastyComponent, systemHolderService);
    }

    public ngOnInit() { }

    // passar Data em Milisegundo
    private isVencido(dateInMs: number) {
        return new Date() > new Date(dateInMs) ? "red" : "";
    }

}