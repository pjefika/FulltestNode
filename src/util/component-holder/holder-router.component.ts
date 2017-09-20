import { CadastroCrmComponent } from './../../crm/cadastrofulltestcrm/cadastrocrm.component';
import { CadastroComponent } from './../../co/cadastro/cadastro.component';
import { PrincipalComponent } from './../../principal/principal.component';
import { InputHolderRoute } from './../../viewmodel/holder-router/input-holder-route';
import { HolderCompsService } from './services/holder-comps.service';
import { HolderRouterService } from './holder-router.service';
import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
    selector: 'holder-router-component',
    templateUrl: 'holder-router.component.html',
    providers: [HolderRouterService]
})

export class HolderRouterComponent implements OnInit, OnChanges {

    @Input() public component: any;
    @Input() public input?: InputHolderRoute;

    private componentData: any;

    constructor(
        private holderRouterService: HolderRouterService,
        private holderCompsService: HolderCompsService) { }

    public ngOnInit() { }

    public ngOnChanges(changes: SimpleChanges) {
        this.router();
    }

    public router() {
        this.componentData = this.holderRouterService.return(this.component, this.input);
    }

}