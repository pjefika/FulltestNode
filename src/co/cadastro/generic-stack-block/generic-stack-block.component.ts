import { Component, OnInit, Input } from '@angular/core';
import { CallAlertService } from 'util/callalerts/call-alert.service';
import { ToastyComponent } from 'util/toasty/toasty.component';
import { HolderService } from 'util/holder/holder.service';
import { GenericStackBlockService } from 'co/cadastro/generic-stack-block/generic-stack-block.service';
import { Linha } from 'viewmodel/cadastro/linha';
import { ObjKeysPipe } from 'util/obj-pipe/obj-pipe-service';
import { Rede } from 'viewmodel/cadastro/rede';
import { Radius } from 'viewmodel/cadastro/radius';
import { Servicos } from 'viewmodel/cadastro/servicos';

@Component({
    selector: 'generic-stack-block',
    templateUrl: 'generic-stack-block.component.html',
    styleUrls: ['generic-stack-block.component.css'],
    providers: [GenericStackBlockService],
})

export class GenericStackBlockComponent extends CallAlertService implements OnInit {

    @Input() public obj: any;

    private masterLabel: string;
    private masterContent: string;
    private genericObject: any;

    constructor(public toastyComponent: ToastyComponent,
        private genericStackBlockService: GenericStackBlockService,
        private holderService: HolderService) {
        super(toastyComponent);
    }

    public ngOnInit() {

    }


}