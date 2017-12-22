import { Component, OnInit, Input } from '@angular/core';
import { CallAlertService } from 'util/callalerts/call-alert.service';
import { ToastyComponent } from 'util/toasty/toasty.component';
import { HolderService } from 'util/holder/holder.service';
import { GenericStackBlockService } from 'co/cadastro/generic-stack-block/generic-stack-block.service';
import { Linha } from 'viewmodel/cadastro/linha';

@Component({
    selector: 'generic-stack-block',
    templateUrl: 'generic-stack-block.component.html',
    styleUrls: ['generic-stack-block.component.css'],
    providers: [GenericStackBlockService]
})

export class GenericStackBlockComponent extends CallAlertService implements OnInit {

    @Input() public obj: any;

    private masterLabel: string;
    private masterContent: string;

    constructor(public toastyComponent: ToastyComponent,
        private genericStackBlockService: GenericStackBlockService,
        private holderService: HolderService) {
        super(toastyComponent);
    }

    public ngOnInit() {
        this.setMasterLabel();
    }

    private setMasterLabel() {
        try{
            console.log("try start")
            this.obj as Linha
            console.log(this.obj)
            this.masterLabel = "Linha Telefônica";
        }catch(Error){
            console.log(Error)
        }
    }

}