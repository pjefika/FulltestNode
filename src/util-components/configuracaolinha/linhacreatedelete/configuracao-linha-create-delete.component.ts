import { Component, OnInit } from '@angular/core';
import { SuperComponentService } from '../../../util/supercomponent/supercomponent.service';
import { ToastyComponent } from '../../toasty/toasty.component';
import { SystemHolderService } from '../../../util/holder/systemHolder.service';
import { VariavelHolderService } from '../../../util/holder/variavelholder.service';
import { LinhaCreateComponent } from './create/linha-create.component';
import { LinhaDeleteComponent } from './delete/linha-delete.component';
import { DynamicRouterService } from '../../dynamicrouter/dynamic-router.service';

@Component({
    selector: 'configuracao-linha-create-delete-component',
    templateUrl: 'configuracao-linha-create-delete.component.html'
})

export class ConfiguracaoLinhaCreateDeleteComponent extends SuperComponentService implements OnInit {

    private comp: string;

    constructor(public toastyComponent: ToastyComponent,
        public systemHolderService: SystemHolderService,
        public variavelHolderService: VariavelHolderService,
        public dynamicRouterService: DynamicRouterService) {
        super(toastyComponent, systemHolderService);
    }

    public ngOnInit() {
        // this.qualComponenteEntrar();
    }

    // Ativa componente no dynamicrouter porem para fazer isto tera que adapatar a subnav para deixar ativo o menu.
    private qualComponenteEntrar() {
        switch (this.variavelHolderService.cadastroLinha.status) {
            case "NOT_CREATED":
                this.dynamicRouterService.component = LinhaCreateComponent;
                break;
            case "CREATED":
                this.dynamicRouterService.component = LinhaDeleteComponent;
                break;
        }
    }


}