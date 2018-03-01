import { Component, OnInit, Input } from '@angular/core';
import { Fulltest } from '../../../viewmodel/fulltest/fulltest';
import { Certification } from '../../../viewmodel/fulltest/certification';
import { SuperComponentService } from '../../../util/supercomponent/supercomponent.service';
import { ToastyComponent } from '../../toasty/toasty.component';
import { SystemHolderService } from '../../../util/holder/systemHolder.service';

@Component({
    selector: 'info-geral-fulltest-component',
    templateUrl: 'info-geral-fulltest.component.html',
    styleUrls: ['info-geral-fulltest.component.css']
})

export class InfoGeralFulltestComponent extends SuperComponentService implements OnInit {

    @Input() public certification: Certification;

    constructor(public toastyComponent: ToastyComponent,
        public systemHolderService: SystemHolderService) {
        super(toastyComponent, systemHolderService)
    }

    public ngOnInit() {
        this.switchMountAlert();
    }

    private mountAlert(whatType: string) {
        super.callAlert(whatType, this.certification.orientacao);
    }

    private switchMountAlert() {
        switch (this.certification.resultado) {
            case "OK":
                this.mountAlert("alert-success");
                break;
            case "FISICAL":
                this.mountAlert("alert-danger");
                break;
            case "FORWARDED_CO":
                this.mountAlert("alert-danger");
                break;
            case "TO_FIX":
                this.mountAlert("alert-warning");
                break;
            case "FIXED":
                this.mountAlert("alert-warning");
                break;
        }
    }



}