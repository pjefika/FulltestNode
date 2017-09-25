import { CoLinhaRouterService } from './services-routes/co-linha-router.service';
import { CrmRouterService } from './services-routes/crm-router.service';
import { CoRouterService } from './services-routes/co-router.service';
import { IndexRouterService } from './services-routes/index-router.service';
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
    providers: [HolderRouterService, IndexRouterService, CoRouterService, CrmRouterService, CoLinhaRouterService]
})

export class HolderRouterComponent implements OnInit, OnChanges {

    @Input() public component: any;
    @Input() public input?: InputHolderRoute;

    private componentData: any;

    constructor(
        private holderRouterService: HolderRouterService) { }

    public ngOnInit() { }

    public ngOnChanges(changes: SimpleChanges) {
        this.router();
    }

    public router() {
        this.componentData = this.holderRouterService.return(this.component, this.input);
    }

}